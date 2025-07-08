# MERN Blog 🌐

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

## 📚 Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Database   | MongoDB                    |
| API        | Node.js + Express.js       |
| Frontend   | React (with ReactQuill)    |

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

## ☁️ Deployment Instructions

### Heroku

1. Create separate Heroku apps for client and server.
2. In **server**, add a `Procfile`:
   ```
   web: node server.js
   ```
3. Set config vars:
   ```
   DATABASE=<MongoDB URI>
   JWT_SECRET=<YourJWTSecret>
   PASSWORD=<AdminPassword>
   ```
4. Push and deploy.

5. In **client**, create `.env`:
   ```
   REACT_APP_API=<server-app-url>/api
   ```
6. Add `Procfile`:
   ```
   web: npm start
   ```
7. Push and deploy.

### Render

Follow a similar config using separate services for server (Web Service) and client (Static Site).  
Set environmental variables accordingly: `DATABASE`, `JWT_SECRET`, `PASSWORD`, and `REACT_APP_API`.

---

## 🛠 Usage Guide

- Visit the site and navigate through blog posts.
- Log in as **user** using the predefined password.
- Access dashboard to **Create**, **Edit**, and **Delete** posts using the editor interface.

---

## 🙋‍♂️ Author

**Dhruv Kapadia**  
📧 dhruvvv099@gmail.com  
🔗 [LinkedIn](https://in.linkedin.com/in/dhruv-kapadia03)

---

## 📄 License

This project is released under the **MIT License**.
