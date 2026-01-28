# 🏆 EMPREZA - ITUM Official Website

![Project Status](https://img.shields.io/badge/Status-Active-success)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

The official web platform for **EMPREZA**, the annual leadership and sports event organized by the Institute of Technology, University of Moratuwa (ITUM). This full-stack application manages event news, live scores, galleries, and provides a secure administrative dashboard for organizers.

---

---

## 🚀 Features

### 🌐 Public Interface
* **Hero Section:** Dynamic slider showcasing event highlights.
* **Live Countdown:** Real-time countdown timer to the event launch.
* **News Feed:** Latest announcements and updates for participants.
* **Games & Sports:** Showcase of all sporting events with descriptions.
* **Hall of Fame:** Interactive scoreboard and history timeline of past winners.
* **Creative Gallery:** Responsive "Accordion-style" image gallery with zoom effects.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

### 🛡️ Admin Dashboard (CMS)
* **Secure Authentication:** JWT-based login system for administrators.
* **Dashboard Overview:** Sidebar navigation with a quick-access grid.
* **Content Management:**
    * **Slider:** Add/Edit/Delete homepage hero images.
    * **News:** Post updates and announcements.
    * **Games:** Manage the list of sports activities.
    * **Stats:** Update live scores, team counts, and leading teams.
    * **Timer:** Start/Stop the event countdown and set custom end messages.
    * **Gallery:** Upload event photos with captions.

---

## 🛠️ Tech Stack

### Frontend
* **React.js (Vite):** Fast, component-based UI library.
* **CSS3 (Custom):** Advanced styling using Glassmorphism, CSS Grid, and Flexbox.
* **Axios:** For HTTP requests to the backend.
* **React Router:** For seamless single-page navigation.

### Backend
* **Node.js & Express.js:** RESTful API architecture.
* **MongoDB & Mongoose:** NoSQL database for flexible data storage.
* **JWT (JSON Web Tokens):** Secure authentication middleware.
* **Multer:** Handling local image uploads and storage.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/vihara-senindu/Empreza-tum.git
cd Empreza-tum
````

### 2. Backend Setup

Navigate to the root directory (where index.js is located).

Install dependencies:

````bash
npm install

````

Create a .env file in the root directory:

````bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here

````

Start the backend server:


````bash
npm start
# or
node index.js

````

ℹ️ The server will automatically create an uploads/ folder for images.


### 3. Frontend Setup

Open a new terminal and navigate to the client folder.


````bash
cd client
npm install
npm run dev
````

### 4. Access the Application

Public Website: http://localhost:5173

Admin Panel: http://localhost:5173/login

Backend API: http://localhost:5000

📂 Project Structure

````bash

Empreza-tum/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/      # Admin dashboard components
│   │   │   ├── layout/     # Navbar, Footer
│   │   │   └── sections/   # Hero, News, Gallery
│   │   ├── Admin.css       # Admin-specific styles
│   │   └── App.jsx         # Routing
│   └── vite.config.js
│
├── config/                 # Database configuration
├── middleware/             # Auth & upload middleware
├── models/                 # Mongoose schemas
├── routes/                 # API routes
├── uploads/                # Uploaded images (auto-generated)
├── index.js                # Server entry point
└── package.json


````
