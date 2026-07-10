 # Snapflick | Quick-Commerce Fashion Rental

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**Snapflick** is a modern, high-performance full-stack e-commerce solution designed to provide users with a seamless online shopping experience. Built using the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS, the platform delivers a fast, responsive, and intuitive interface on both mobile and desktop screens. It handles everything from secure product browsing and dynamic shopping cart manipulations to secure user authentication and reliable checkouts.

---

## ✨ Key Features

### 👤 User Authentication & Security
* **Secure Signup & Login:** Managed via JSON Web Tokens (JWT) with HTTP-only cookies and bcrypt password hashing.
* **Protected Routes:** Restricted profile navigation, checkout operations, and administration panels based on authorization scopes.

### 🛒 Dynamic Shopping Experience
* **Advanced Filtering & Search:** Instantly browse items by categories, price boundaries, rankings, or keywords.
* **Persistent Shopping Cart:** Seamlessly append, update, or remove items with state synchronized across browser refreshes.
* **Detailed Product Views:** View extensive documentation, clear pricing, and image carousels for individual items.

### 💳 Checkout & Order Processing
* **Payment Gateway Integration:** Secure payment pipelines processing sandbox test credits safely.
* **Order Summaries & History:** Access individual dashboards detailing modern transaction proofs and order histories.

### 📊 Administrative Control Center (Admin Panel)
* **Inventory Tracking:** Direct CRUD management utilities enabling swift product addition, updates, or removals.
* **User & Analytics Monitoring:** Review active user profiles and general platform metrics efficiently.
---

## Tech Stack

**Client:**
* React.js (Vite)
* Tailwind CSS (Styling & Responsive Design)
* Lucide React (Icons)
* Axios (HTTP Client)

**Server:**
* Node.js & Express.js
* MongoDB & Mongoose (Database & ODM)
* JWT (Authentication)
* dotenv (Environment Management)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Atlas or Local instance)

### Installation

** Clone the repository**
```bash
git clone [https://github.com/ShivamSingh20-rg/MERN-E_COMMERCE.git](https://github.com/your-username/snapflick.git)
cd snapflick.
**project structure**
snapflick/
├── Backend/                 # Express.js Server
│   ├── controllers/         # Route logic
│   ├── models/              # Mongoose schemas (User, Product, Cart)
│   ├── routes/              # API endpoints
│   └── server.js            # Entry point
└── Frontend/                # React.js Client
    └── src/
        ├── components/      # Reusable UI (Navbar, Footer, ProductCards)
        ├── Context/         # Global state (AuthContext, CartContext)
        ├── pages/           # Route views (Home, Shop, Checkout)
        └── App.jsx          # Main application routing
