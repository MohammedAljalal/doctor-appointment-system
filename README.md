# Doctor Appointment System 🏥

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing doctor appointments with comprehensive features including user authentication, appointment booking, and separate dashboards for patients, doctors, and administrators.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access control (Patient, Doctor, Admin)

### Patient Features
- Browse available doctors
- Book appointments
- View appointment history
- Cancel appointments
- Manage profile
- Payment integration with Razorpay

### Doctor Features
- View appointments schedule
- Accept/reject appointments
- Manage availability
- View patient details
- Track earnings

### Admin Features
- Manage users (patients and doctors)
- Approve/reject doctor registrations
- View system statistics
- Monitor appointments
- Manage system settings

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Payment Gateway**: Razorpay
- **Image Upload**: Cloudinary
- **File Handling**: Multer
- **Validation**: Validator.js
- **CORS**: CORS middleware
- **Environment**: dotenv

### Frontend
- **Library**: React 19.2.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1.18
- **HTTP Client**: Axios
- **Routing**: React Router DOM 7.13.0
- **Notifications**: React Toastify
- **Package Manager**: npm/yarn

### Admin Dashboard
- **Library**: React 19.2.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.2.0
- **HTTP Client**: Axios
- **Routing**: React Router DOM 7.13.0
- **Notifications**: React Toastify

## 📁 Project Structure

```
doctor-appointment-system/
├── Backend/                    # Node.js Express backend server
│   ├── models/                # Mongoose data models
│   ├── routes/                # API route handlers
│   ├── controllers/           # Business logic
│   ├── middleware/            # Custom middleware
│   ├── config/                # Configuration files
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server file
│
├── frontend/                  # Patient React application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service calls
│   │   ├── context/           # Context API for state management
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind CSS configuration
│
├── Admin/                     # Admin dashboard React application
│   ├── src/
│   │   ├── components/        # Admin components
│   │   ├── pages/             # Admin pages
│   │   ├── services/          # API service calls
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Admin dependencies
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind CSS configuration
│
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation

```

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (local or cloud instance - MongoDB Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MohammedAljalal/doctor-appointment-system.git
cd doctor-appointment-system
```

### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create a .env file in the Backend directory
touch .env

# Add your environment variables (see Environment Variables section)
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory (if needed)
touch .env
```

### 4. Admin Dashboard Setup

```bash
cd ../Admin

# Install dependencies
npm install

# Create a .env file in the Admin directory (if needed)
touch .env
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/doctor-appointment
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doctor-appointment

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

# Razorpay Configuration (for payments)
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Email Configuration (if using email notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Admin (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Terminal 1 - Backend Server

```bash
cd Backend
npm start
# or for development with auto-reload
npm run server
```

The backend will start on `http://localhost:5000`

### Terminal 2 - Frontend Application

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Terminal 3 - Admin Dashboard

```bash
cd Admin
npm run dev
```

The admin dashboard will start on `http://localhost:5174`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor details
- `PUT /api/doctors/:id` - Update doctor profile

### Users
- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

*Note: Complete API documentation will be updated in detailed docs folder*

## 📸 Screenshots

*Screenshots section to be added*

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Mohammed Aljalal**

- GitHub: [@MohammedAljalal](https://github.com/MohammedAljalal)

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Happy Coding! 🎉**

If you found this project helpful, please consider giving it a star ⭐
