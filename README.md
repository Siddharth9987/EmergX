# EmergX 🚀

EmergX is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for reviewing and rating companies. It provides a seamless experience for users to discover companies, read authentic reviews, and share their own ratings.

## ✨ Features

- **Company Discovery**: Browse through a curated list of companies.
- **Detailed Profiles**: View in-depth information about each company.
- **Rating System**: Interactive star-rating components for user feedback.
- **Review Management**: Users can read and post detailed reviews.
- **Search & Filter**: Quickly find companies by name or category.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM** (Navigation)
- **Axios** (API Calls)
- **React Icons**
- **Vanilla CSS** (Custom Styling)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **CORS** & **Dotenv**

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local instance or Atlas URI)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Siddharth9987/EmergX.git
   cd EmergX
   ```

2. **Install dependencies for both Client and Server:**
   ```bash
   npm run install:all
   ```

3. **Environment Setup:**
   Create a `.env` file in the `server/` directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the application:**
   From the root directory, run:
   ```bash
   npm run dev
   ```
   This will concurrently start the backend server (on port 5000) and the frontend client (on port 5173).

## 📂 Project Structure

```text
EmergX/
├── client/             # React/Vite Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main page views
│   │   └── services/   # API configuration
├── server/             # Node/Express Backend
│   ├── src/
│   │   ├── controllers/# Route logic
│   │   ├── models/     # Database schemas
│   │   ├── routes/     # API endpoints
│   │   └── server.js   # Entry point
├── package.json        # Root scripts
└── .gitignore          # Ignored files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
