# 🩸 Blood Bank Management System

A full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) with **Tailwind CSS**, designed to manage blood donation and reception processes efficiently. This system allows admins to register, manage donors and receivers, track blood inventory, and ensure streamlined operations in a blood bank.

---

## ✨ Features

### 🔐 Admin Functionality
- Admin Sign Up / Sign In
- Authenticated dashboard access
- Role-based form control

### 📝 User Management
- Register new users (donors or receivers)
- Update user information
- Find user by email and date of birth
- Delete user records

### 💉 Blood Donation / Reception
- Add donor details and donated blood
- Add receiver request and update stock
- Track total donation and blood inventory

### 📊 Additional Features
- Form validations and confirmation messages
- Route protection using middleware
- Responsive design with Tailwind CSS

---

## 🛠️ Tech Stack

### 📌 Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

### 📌 Backend
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **bcrypt.js**
- **dotenv**
- **cookie-parser**

---

## 📁 Project Structure
/
├── backend/ # Express.js server with MongoDB
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── controllers/
│ └── server.js
│
├── frontend/ # React frontend with Tailwind UI
│ ├── src/
│ │ ├── components/
│ │ └── App.js
│ ├── public/
│ ├── tailwind.config.js
│ └── package.json
│
└── README.md


---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aryansingh2020/Blood_Bank.git
cd Blood_Bank

```

### 2️⃣ Setup Backend
```
cd backend
npm install
```

# create a .env file with:


# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
npm run dev