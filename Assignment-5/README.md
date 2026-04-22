# Student Feedback System (Nexus Feedback)

A modern, full-stack student feedback system built for Assignment 5. This application allows students to submit ratings and comments for their courses and provides an admin dashboard for analyzing feedback.

## 🚀 Features

- **Student Feedback Form**: Interactive rating system with star icons and real-time validation.
- **Admin Dashboard**: Overview of total submissions, average ratings, and a list of individual feedback entries.
- **Modern UI**: Sleek, dark-themed interface built with Tailwind CSS.
- **Responsive Design**: Works seamlessly on mobile and desktop.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Axios, React Icons, React Router.
- **Backend**: Node.js, Express, Mongoose, TypeScript.
- **Database**: MongoDB (Local).

## 📂 Project Structure

```text
Assignment-5/
├── backend/          # Express.js server & Database logic
│   ├── models/       # Mongoose schemas
│   ├── db.ts         # Database connection
│   └── server.ts     # API routes and server setup
└── frontend/         # React.js application
    ├── src/
    │   ├── components/ # Feedback form & Admin dashboard
    │   ├── App.tsx     # Routing setup
    │   └── main.tsx    # Entry point
    └── tailwind.config.js
```

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port `27017`.

### 1. Setup Backend

Navigate to the backend directory and start the server:

```bash
cd backend
npm install
npx ts-node server.ts
```

The server will run at `http://localhost:5000`.

### 2. Setup Frontend

Open a new terminal, navigate to the frontend directory, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## 📊 Database Configuration

By default, the application connects to a local MongoDB instance:
- **URI**: `mongodb://127.0.0.1:27017/student-feedback`
- **Collection**: `feedbacks`

To use a custom connection string, create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
```

## 📜 License

This project is part of the Full-stack Development Lab.
