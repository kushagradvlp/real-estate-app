# 🏠 RealEstateAI

RealEstateAI is a full-stack web application that uses AI-powered search to help users discover their dream properties. Users can interact with a smart chatbot to find homes using natural language like:

> "Find me a 2-bedroom apartment with a big living room in Toronto."

---

## 🚀 Features

### ✅ Frontend (React + Vite + Tailwind CSS)
- Modern and responsive UI
- Property listing page
- AI chatbot interface for real estate queries
- Login/Signup authentication with form validation

### ✅ Backend (Flask + SQLite)
- User authentication (signup & login) with hashed passwords (bcrypt)
- JWT token generation for secure sessions
- Local database using SQLite for easy setup and prototyping

---

## 📂 Project Structure
```
real-estate-app/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── settings.json
│   ├── venv/                     # Virtual environment (optional)
│   └── src/
│       ├── auth_backend.py       # Flask backend for user auth
│       ├── chatbot.py            # Flask API for chatbot endpoint
│       └── instance/
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── vite.config.mjs
│   ├── tailwind.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── logo.svg
│       ├── components/
│       │   ├── Chatbot.jsx
│       │   ├── Navbar.jsx
│       │   └── Auth.jsx
│       └── assets/
├── docker-compose.yml
└── README.md
```

---

## 🧑‍💻 How to Run

### 🐳 Docker Setup (Recommended)
Run everything with a single command:
```bash
docker-compose up --build
```

### 🔧 Manual Backend Setup (Optional)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python src/auth_backend.py
```

### 💻 Manual Frontend Setup (Optional)
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Example Chat Prompts
- "2 bedroom condo with balcony in Montreal"
- "House near downtown with parking"
- "Apartment with gym access and pet-friendly"

---

## 📌 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Flask, Flask-CORS, Flask-Bcrypt, SQLite
- **Auth**: JWT, bcrypt

---

## 📬 Contact
For suggestions or contributions, please feel free to create an issue or pull request.

> Built with ❤️ to simplify home search with AI.
