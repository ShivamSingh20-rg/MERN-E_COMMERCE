 # Snapflick | Quick-Commerce Fashion Rental

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**Snapflick** is a full-stack, quick-commerce fashion rental platform designed to deliver premium clothing to users in under 30 minutes. Built with a modern mobile-first approach, it features seamless navigation, advanced product filtering, and a fully functional shopping cart and checkout pipeline.

---

## Key Features

* **Quick-Commerce Rental Model:** Specifically architected to handle time-sensitive fashion rentals with real-time inventory tracking.
* **Mobile-First Responsive UI:** Fully responsive design utilizing Tailwind CSS, featuring custom mobile accordions and adaptive grids.
* **Secure Authentication:** User login and registration powered by JSON Web Tokens (JWT) and bcrypt password hashing.
* **Dynamic Cart & Checkout:** State-managed shopping bag with address management and dynamic total calculations.
* **Advanced Routing:** Seamless client-side routing via `react-router-dom` with interactive mega-menus and search parameters.
* **RESTful API:** Robust Express.js backend handling user data, product catalogs, and order processing.

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
