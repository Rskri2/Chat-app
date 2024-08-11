# Chat App

## Overview

Chat App is a real-time messaging application built with Node.js, Socket.io, React, and MongoDB. It allows users to communicate instantly through one-on-one and group chats, featuring real-time message updates, user presence indicators, and more.

## Features

- Real-time messaging with Socket.io
- User authentication and management
- One-on-one and group chat functionality
- User presence indicators
- Message notifications
- Persistent message history
- Responsive design

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Real-Time Communication:** Socket.io
- **Database:** MongoDB
- **Authentication:** Custom authentication (or integrate with an auth provider if needed)

## Setup

### Prerequisites

- Node.js and npm (or yarn)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the Repository:**
   ```bash
   cd chat-app
2. **Install Backend Dependencies:**
   ```bash
  cd backend
  npm install
  ```
3. **Install Frontend Dependencies:**
   ```bash
  cd ../frontend
  npm install
  ```
4. **Configure Environment Variables:**
  Create a .env file in the backend directory with the following content:
  ```bash
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```
5. **Start the Backend Server:**
   ```bash
  cd backend
  npm start
  ```
6. **Start the Frontend Development Server:**
   ```bash
  cd ../frontend
  npm start
  ```
7. **Start the Frontend Development Server:**
  Navigate to http://localhost:5173 to view the app.


### Usage
  ### Sign Up / Login: Users can register or log in using their credentials.
  ### Start a Chat: Users can initiate one-on-one or group chats.
  ### Send Messages: Messages are delivered in real-time.
 ### View History: Users can view past messages.

