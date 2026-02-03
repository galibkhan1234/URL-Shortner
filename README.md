👨‍💻 Author
Galib Khan
Full Stack Developer (MERN)
Link-Shortner-env.eba-gjretev2.ap-south-1.elasticbeanstalk.com

# URL Shortener

A **URL Shortener web application** built using **Node.js, Express.js, EJS, and MongoDB**.  
The application supports **user authentication**, **URL shortening**, and **server-side rendered views**.  
This project is designed to run on **localhost** and follows a **clean MVC architecture**.

---

## 🚀 Features

- User authentication (Signup / Login)
- JWT-based authentication
- Shorten long URLs into unique short links
- Redirect short URLs to original URLs
- Protected routes using authentication middleware
- Server-side rendering using EJS
- Modular and scalable folder structure

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **View Engine:** EJS
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Tools:** dotenv, bcrypt, nodemon

---
URL-SHORTENER/
│
├── config/
│ └── db.js # MongoDB connection
│
├── controllers/
│ ├── url-controller.js # URL shortening & redirection logic
│ └── user-controller.js # Auth (signup / login) logic
│
├── middlewares/
│ └── auth.middleware.js # JWT auth middleware
│
├── models/
│ ├── user.js # User schema
│ └── auth.user.js # Auth-related model
│
├── routes/
│ ├── staticRouter.js # Page routes (EJS views)
│ ├── url-route.js # URL APIs
│ └── user-Route.js # Auth routes
│
├── service/
│ └── auth.id.js # Auth helper services
│
├── utils/
│ └── jwt.js # JWT utility functions
│
├── views/
│ ├── partials/
│ │ ├── head.ejs
│ │ └── script.ejs
│ │
│ ├── analytics.ejs
│ ├── home.ejs
│ ├── login.ejs
│ └── signup.ejs
│
├── .env # Environment variables (ignored)
├── .gitignore
├── app.js # Application entry point
├── package.json
└── README.md

## 📂 Project Structure

