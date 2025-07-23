# 🌐 MERN Blog 

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include with a rich text editor for creating, updating, and deleting blog posts.

---

## 🛠 Features

- Home page displays all published posts with author info and timestamps
- Exclusive dashboard for:
  - Creating posts
  - Editing content using a rich text editor (supports images, videos, links)
  - Deleting posts
- CRUD operations tested via Postman

---

### 🔹 Blog App
[![Blog App Demo](https://img.icons8.com/clouds/100/000000/video-playlist.png)](https://res.cloudinary.com/drm14e8mg/video/upload/Blog_App_f4hvr8.mp4)

---

## 📚 Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Database   | MongoDB                    |
| Backend    | Node.js + Express.js       |
| Frontend   | React (CRA & ReactQuill)   |

---

## 🧩 Setup & Installation

### Clone & install dependencies
```bash
git clone https://github.com/dhruv-kapadia03/mernblog.git
cd mernblog
```

### Backend (server)
```bash
cd server
npm install
npm start
```

### Frontend (client)
```bash
cd client
npm install
npm start
```

Frontend runs at `http://localhost:3000/`; frontend will call backend’s API at `http://localhost:4000/api`

---

## 📝 Project Structure

```
mernblog/
├── backend/
│   ├── models/
│   │   ├── Post.js       
│   │   └── User.js
│   ├── upload_new/
│   ├── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── Editor.js
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── Post.js
│   │   ├── UserContext.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── logo.svg
│   ├── .gitignore     
│   ├── README.md
│   ├── package-lock.json
│   └── package.json
└── README.md  
```

---

## 🛠 Usage Guide 

- Open the site in local machine after making and navigate through blog posts.
- Log in as **user** using the predefined password.
- Access dashboard to **Create**, **Edit**, and **Delete** posts using the editor interface.
