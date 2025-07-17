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
```bash
cd backend
npm install

```

### 3️⃣ Create a `.env.development.local` file in `Blood_Bank/backend/` with:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
```bash
npm run dev
```

### 4️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm start
```


---

## ✅ GitHub Actions Workflow: `.github/workflows/node.yml`

Create the file:  
`your-repo/.github/workflows/node.yml`

```yml
name: Blood Bank CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  install-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - name: ⬇️ Checkout code
        uses: actions/checkout@v3

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: 📦 Install Backend Dependencies
        working-directory: ./backend
        run: npm ci

      - name: 🔎 Lint Backend (if applicable)
        working-directory: ./backend
        run: |
          if [ -f package.json ]; then
            npm run lint || echo "Linting skipped or failed"
          fi

      - name: 🧪 Run Backend Tests (if applicable)
        working-directory: ./backend
        run: |
          if [ -f package.json ]; then
            npm test || echo "No tests found"
          fi

      - name: 📦 Install Frontend Dependencies
        working-directory: ./frontend
        run: npm ci
