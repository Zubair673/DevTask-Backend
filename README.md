# 🚀 DevTask Backend

Backend API for **DevTask**, a full-stack task management application built for Software Engineering students. It provides secure authentication, task management, profile management, image uploads, and RESTful APIs.

---

## 🌐 Live API

https://your-render-url.onrender.com

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 🔑 Password Reset
- 📝 Create, Update & Delete Tasks
- 📋 Get All Tasks
- 👨‍💻 User Profile Management
- 🖼 Profile Image Upload
- ☁️ Cloudinary Image Storage
- 🔒 Protected Routes
- 🌍 RESTful API
- ⚡ Express.js Server
- 🍃 MongoDB Database

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Multer
- Cloudinary
- CORS
- Dotenv

---

## 📂 Project Structure

```
server
│
├── config
│   ├── db.js
│   └── cloudinary.js
│
├── controllers
│
├── middleware
│
├── models
│
├── routes
│
├── uploads
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Installation

### Clone Repository

```bash
https://github.com/Zubair673/DevTask-Backend
```

### Go to Server Folder

```bash
cd server
```

### Install Dependencies

```bash
npm install
```

### Create .env File

```env
PORT=5000
```

### Start Development Server

```bash
npm run dev
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/reset-password |
| PUT | /api/auth/profile |

---

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/tasks |
| POST | /api/tasks |
| PUT | /api/tasks/:id |
| DELETE | /api/tasks/:id |

---

## 📸 Image Upload

Profile images are uploaded using **Cloudinary**.

Supported formats:

- JPG
- JPEG
- PNG
- WEBP

Maximum Size:

```
5 MB
```

---


## 🚀 Deployment

Backend deployed on **Render**

Frontend deployed on **Vercel**

---

## 👨‍💻 Developer

**Muhammad Zubair Rauf**

Software Engineering Student

International Islamic University Islamabad (IIUI)

GitHub

https://github.com/Zubair673

LinkedIn

https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab

---

## ⭐ Support

If you like this project, don't forget to ⭐ the repository.
