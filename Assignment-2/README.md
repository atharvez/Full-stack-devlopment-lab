# Assignment 2: Premium Portfolio & Backend Ecosystem

## 🌌 Overview
This is a world-class, full-stack portfolio designed with a "Space Dark" aesthetic. It integrates multiple backend systems to create a dynamic, live experience, moving beyond a simple static showcase to a "Developer Dashboard" feel.

---

## ✨ Features

### 💎 Visuals & UX
- **Cyan Hyper-Blue Theme**: A futuristic, high-contrast palette with global **Noise Textures** and animated **Auroras**.
- **Bento Grid Architecture**: A modern, modular layout that provides a structured and visual-first flow for information.
- **Glassmorphism**: High-fidelity backdrop blurs and "Shiny Card" hover effects for a premium touch.
- **Micro-interactions**: Staggered reveal animations and interactive SVG icons (Lucide).

### ⚙️ Backend & Data
- **Integrated GitHub Pulse**: A unified dashboard combining real-time **repository fetching** and a **live contribution map**.
- **MongoDB Power**: Securely manages curated project data with **Auto-Seeding** capabilities.
- **Full-Stack Contact**: A resilient message handler using **Nodemailer** for Gmail delivery and MongoDB for backup storage.

---

## 🛠️ Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB (Mongoose)
- **API Engine**: GitHub API (REST)
- **Styling**: Tailwind CSS & Framer Motion
- **Icons**: Lucide React

---

## 🚀 Setup & Installation
1. Navigate to the project folder.
2. Install dependencies: `npm install`.
3. Create a `.env.local` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio-db
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```
4. Run the development server: `npm run dev`.

---
*Built with ❤️ as part of the Full-Stack Development Lab.*
