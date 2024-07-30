# Employee Tracking Website

## Overview

This project provides a comprehensive solution for tracking employees, their transactions, and scheduling events. The system allows administrators to register new employees, view transactions, and schedule events, while employees can view their pending events.

## Prerequisites

- Node.js (for backend)
- npm(for package management)
- React (for frontend)
- MongoDB database

## Installation

### Frontend

1. **Navigate to the `frontend` directory:**
   ```bash
   cd frontend
   npm install
    npm run dev
   ```
### Backend

1. **Navigate to the `backend` directory:**
   ```bash
   cd backend
   npm install
    npm start
   ```
2. **Create a .env file in the `backend` directory with the following variables:**

  ```bash
      PORT=5000
      NODE_ENV=development
      DATABASE=<your-database-url>
      DATABASE_PASSWORD=<your-database-password>
      JWT_SECRET=<your-jwt-secret>
      JWT_COOKIE_EXPIRES_IN=<cookie-expiry-time>
  ```
3. **Start the node.js server

   ```bash
     nodemon server.js
   ```
## User Roles and Permissions

### Admin

- **Register New Employees**
  - Use the registration form to add new employees.

- **View Transactions**
  - Access a dashboard to view and manage financial transactions.

- **Schedule Events**
  - Create and manage events, including setting dates, times, and descriptions.

### Employee

- **View Pending Events**
  - Access a personal dashboard to view events that are scheduled for them.


