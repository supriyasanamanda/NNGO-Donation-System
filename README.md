# NGO Registration and Donation Management System

This project is a secure web application developed for the NSS Open Project 2026. It manages NGO registrations and donations, ensuring that user data is preserved regardless of the payment outcome to maintain transparency and data integrity.

## 🚀 Features
* [cite_start]**Authentication:** Unified Login and Registration for Users and Admins with role-based dashboard redirection[cite: 21].
* [cite_start]**Data Integrity:** User registration data is stored independently of the donation flow.
* [cite_start]**Mock Payment Gateway:** A sandbox simulation that tracks donation attempts with statuses: SUCCESS, PENDING, or FAILED[cite: 27, 65].
* [cite_start]**User Dashboard:** Users can initiate donations and view their personal registration details and donation history[cite: 29, 30].
* [cite_start]**Admin Panel:** Administrators can view total registrations, total donations, and track individual transaction timestamps[cite: 49, 50, 57].

## 🛠️ Tech Stack
* **Frontend:** React.js, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)

## ⚙️ Setup and Installation
1.  **Prerequisites:** Ensure Node.js and MongoDB are installed on your system.
2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    npm start
    ```
    *Note: The server runs on `http://localhost:5000`.*
3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm start
    ```
    *Note: The application opens at `http://localhost:3000`.*

## 📂 Project Structure
* `/backend`: Contains the API logic, role management, and database schemas.
* `/frontend`: Contains the React application with conditional rendering for User and Admin views.
