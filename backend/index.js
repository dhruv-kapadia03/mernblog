const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User')
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')

const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
})

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

app.use(cors({credentials:true, origin: process.env.CORS_ORIGIN}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host} \n`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit the process with failure
    }
}
connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!", err);
});

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userdoc = await User.create({
            username, 
            password : bcrypt.hashSync(password,salt)
        })
        res.json(userdoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) { 
        return res.status(400).json('User not found.');
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username
            });
        })
    } else {
        res.status(400).json('wrong credentials.')
    };
})

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json('No token provided');
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json('Invalid token');
        }
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json('No token provided');
    }
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json('Invalid token');
        }

        let newPath = null;
        if (req.file) {
            const {originalname,path} = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path+'.'+ext;
            fs.renameSync(path, newPath);
        }

        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title, 
            summary, 
            content,
            cover:newPath, 
            author:info.id
        })
        res.json({postDoc});
    });
});


app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json('No token provided');
    }
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json('Invalid token');
        }
        const {id,title,summary,content} = req.body;
        const postDoc = await Post.findById(id);
        if (!postDoc) { 
            return res.status(404).json('Post not found.');
        }
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(403).json('You are not the author of this post'); 
        }
        await postDoc.updateOne({
            title, 
            summary, 
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        res.json(postDoc);
    });
});


app.delete('/post/:id', async (req, res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json('No token provided');
    }
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json('Invalid token');
        }
        try {
            const postDoc = await Post.findById(id);
            if (!postDoc) {
                return res.status(404).json('Post not found.');
            }
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(403).json('You are not the author of this post');
            }
            // Delete the cover image file 
            if (postDoc.cover && fs.existsSync(postDoc.cover)) {
                fs.unlinkSync(postDoc.cover);
                console.log(`Deleted cover image: ${postDoc.cover}`);
            }
            await Post.deleteOne({_id: id});
            res.json('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json('Error deleting post');
        }
    });
});


app.get('/post', async (req, res) => {
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(50)
    );
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    if (!postDoc) { 
        return res.status(404).json('Post not found.');
    }
    res.json(postDoc);
})

app.use(function(err, req, res, next) {
    console.error(err.stack); 
    res.status(500); 
    res.send('An error occurred, please try again later'); 
});