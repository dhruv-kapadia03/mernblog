A blog website which has frontend in react (old), backend in express and node, also used mongodb for database.
MERN Blog Application
This is a full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a robust platform for users to create, read, update, and delete blog posts, offering a seamless and interactive blogging experience.

Features
User Authentication: Secure user registration, login, and logout functionalities.

Create, Read, Update, Delete (CRUD) Blog Posts: Users can create new blog posts, view existing ones, edit their own posts, and delete them.

Rich Text Editor: (Optional/Common) Integration with a rich text editor for formatted blog content.

Category/Tag Management: Organize blog posts using categories and tags for better navigation and searchability.

Responsive Design: A user-friendly interface that adapts to various screen sizes.

API Endpoints: RESTful API endpoints for seamless communication between the frontend and backend.

Database Integration: MongoDB for efficient and flexible data storage.

Technologies Used
MongoDB: A NoSQL, document-oriented database used for storing blog posts, user information, and other application data.

Express.js: A fast, unopinionated, minimalist web framework for Node.js, used for building the backend API.

React.js: A JavaScript library for building user interfaces, used for developing the interactive frontend of the application.

Node.js: A JavaScript runtime environment that executes JavaScript code outside a web browser, used for the backend server.

Mongoose: (Common) An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying database interactions.

Axios: (Common) A promise-based HTTP client for making API requests from the frontend.

bcryptjs: (Common) For hashing passwords securely.

jsonwebtoken (JWT): (Common) For secure user authentication.

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (LTS version recommended)

npm (comes with Node.js) or Yarn

MongoDB (Community Server) or a MongoDB Atlas account for a cloud-hosted database.

Git

Installation
Follow these steps to set up the project locally:

Clone the repository:

Bash

git clone https://github.com/Dhruv-Kapri/mern-blog.git
cd mern-blog
Backend Setup:

Navigate into the api (or server) directory, install dependencies, and create a .env file.

Bash

cd api # or server, depending on the project structure
npm install
Create a .env file in the api (or server) directory and add your MongoDB connection string and a JWT secret:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000 # or any other preferred port
Replace your_mongodb_connection_string with your MongoDB connection URI (e.g., from MongoDB Atlas or your local MongoDB instance).
Replace your_jwt_secret_key with a strong, random string for JWT token generation.

Frontend Setup:

Navigate into the client directory and install dependencies.

Bash

cd ../client
npm install
(Optional) If your backend is running on a different port than the frontend, you might need to configure a proxy in client/package.json:

JSON

"proxy": "http://localhost:5000"
Replace 5000 with your backend port if different.

Running the Application
Start the Backend Server:

In the api (or server) directory, run:

Bash

npm start # or node server.js/index.js depending on the entry file
You should see a message indicating the server is running (e.g., "Server running on port 5000").

Start the Frontend Development Server:

In the client directory, run:

Bash

npm start
This will open the application in your browser at http://localhost:3000 (or another port if 3000 is occupied).

Usage
Open your web browser and navigate to http://localhost:3000.

Register a new user account or log in if you already have one.

Once logged in, you can start creating new blog posts, view all posts, and manage your own content.

Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Inspired by various MERN stack tutorials and best practices.

Thanks to the open-source community for providing amazing tools and libraries.