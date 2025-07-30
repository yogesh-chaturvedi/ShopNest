# 🛒 ShopNest

**ShopNest – Full-Stack E-Commerce Platform with Generative AI Chatbot** is a comprehensive web application built using the MERN (MongoDB, Express, React, Node.js) stack. It offers seamless user authentication, dynamic product browsing, advanced search and filtering, Pagination, cart and order management, secure payment integration, and an AI-powered chatbot that provides intelligent, real-time support based on the product a user is viewing.


## 🌐 Live Demo

👉 [Visit ShopNest Live](https://shop-nest-livid.vercel.app/)

---

## ✨ Features

- 🔐 User Authentication (JWT-based)
- 🛍️ Product Listing with Categories and Sizes
- 🔎 Pagination, Search, Sorting, and Filtering
- 💬 AI-powered Chatbot for Product-Related Queries
- 🛒 Shopping Cart with Quantity Control
- 📦 Order History and Status Tracking
- 💳 Payments via Stripe and Cash on Delivery
- 🧑‍💼 Admin Panel (Product and Order Management)
- 📱 Fully Responsive UI (Tailwind CSS)

---

### 🤖 AI-Powered Customer Support Chatbot
- Integrated an AI chatbot using Google Gemini API.
- Smartly answers product-related queries based on the product page the user is currently viewing.
- Helps users make informed purchase decisions without leaving the page.

---
## 📁 Project Structure
```
/frontend
├── src
│ ├── Components
| ├── context
│ ├── pages
│   └── Dashboard
│ └── App.jsx

/backend
├── Controllers
├── Middlewares
├── Models
├── Routes
└── main.js
.env
```

---
## 🚀 Tech Stack

**Frontend**  
- React.js
- Tailwind CSS
- Axios
- React Router
- Stripe SDK

**Backend**  
- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- dotenv for config
- JWT for Authentication
- bcrypt for Password Hashing
- cors for API Security
- joi for Input Validation

**AI Integration**  
- Google Generative AI (Gemini API)
---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ShopNest.git

cd ShopNest
```

### 2. Setup backend 
```bash
cd backend
npm install

#Create a .env file in the backend directory
PORT=3000
MONGO_URL=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
GEMINI_API_KEY=your_gemini_api_key

npm run dev
```
### 3. Setup Frontend
```bash
cd frontend
npm install

#Create a .env file in the frontend directory
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_API_URL=http://localhost:3000

npm run dev
```
---
## 👤 Author
- Name: Yogesh Chaturvedi
- GitHub: [@yogesh-chaturvedi](https://github.com/yogesh-chaturvedi)