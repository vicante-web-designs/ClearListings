# 🏡 Property Listings Manager (MVP)

A modern property listing web app built for real estate agents and companies.

This project allows agents to create, manage, and showcase property listings in a clean and professional interface. Listings can be viewed publicly, while only the agent who created a listing has permission to edit or delete it.

This is the frontend MVP version, using **React + TailwindCSS**, with global state managed through **Context API** and persistence handled via **localStorage** (acting as a temporary backend simulation).

---

## 🚀 Features

### Public Listing Experience

- View all available property listings
- Browse listing cards with key details (price, location, bedrooms, type)
- Responsive UI optimized for real estate showcase

### Agent Workflow (MVP)

- Create new listings through a dedicated form
- Listings persist across refresh using localStorage
- Ownership-based actions:
  - Only the listing owner can edit or delete

### Architecture-Ready

This MVP is structured to smoothly transition into a full-stack system later:

- Context API → will be replaced by API + Database
- localStorage → temporary persistence layer
- Ownership logic → mirrors real backend authorization rules

---

## 🧱 Tech Stack

- **React (Vite)**
- **TypeScript**
- **TailwindCSS**
- **React Router**
- **Context API** (global state)
- **localStorage** (temporary data persistence)

---

## 📂 Project Structure (Simplified)

src/
├── components/
│ ├── ListingCard
│ ├── ListingForm
│ └── Navbar
│
├── pages/
│ ├── HomePage
│ ├── AboutPage
│ ├── ContactPage
│ ├── CreateListingPage
│ ├── ListingsPage
│ └── ListingDetailsPage
│
├── context/
│ └── ListingsContext
│
└── App.tsx

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vicante-web-designs/ClearListings.git
cd ClearListings
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Your app will run locally on:

```bash
http://localhost:5173
```

## ✅ MVP Progress

 Listings creation form

 Global listings storage via Context

 Persistent storage with localStorage

 Listings displayed on homepage

 Ownership-based UI permissions

 Edit listing flow

 Delete/archive listing flow

 Backend + Database integration (Next Phase)

## 🔥 Next Phase (Full-Stack Upgrade)

This project is designed to evolve into a production-ready SaaS system:

Node.js + Express backend

PostgreSQL database

Authentication (JWT + role-based access)

Cloud image uploads (S3 / Firebase)

Admin dashboard for real estate companies

## 📌 Author

### Built by Vicante Web Designs

Focused on building modern systems for real estate and architecture businesses.

## 📄 License

This project is currently an MVP prototype and is open for learning and development.
