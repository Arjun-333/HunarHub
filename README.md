# HunarHub - Digital Marketplace for Local Micro-Entrepreneurs

HunarHub is a full-stack web application designed to connect local micro-entrepreneurs (artisans, tailors, potters, etc.) with customers. It provides a platform for entrepreneurs to showcase their skills and products, and for customers to find and support local talent.

## 🚀 Features

### For Customers

- **Browse Products**: Explore unique handmade items.
- **Find Services**: Locate skilled professionals nearby.
- **Book Services**: Request services directly from entrepreneurs.
- **Order Products**: Securely purchase items (simulated payment).
- **Dashboard**: Track orders and service request status.

### For Entrepreneurs

- **Profile Management**: Showcase skills, location, and business details.
- **Product Listing**: Add and manage products with images and prices.
- **Service Management**: Receive and manage service requests.
- **Dashboard**: Overview of incoming orders and requests.

### For Admins

- **Verification**: Verify new entrepreneur profiles to ensure quality.
- **Platform Management**: Oversee users and content.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens) with Role-Based Access Control (RBAC)
- **Notifications**: React Toastify

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas connection string)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
