CRM-System
This is a CRM (Customer Relationship Management) system designed for managing tickets, users, and user roles within a financial planning and mortgage broker context. The system includes features such as user authentication, ticket creation and management, and role-based access to different functionalities. It is built using Node.js for the backend, with MySQL for the database.

Features
User Management: Create, view, update, and delete users. Users have roles such as Admin, Financial Planner, and Mortgage Broker.
Ticket Management: Create, update, delete, and assign tickets. Each ticket represents a customer inquiry or task with a status that can be Pending, In Progress, Resolved, or NotAssigned.
Role-based Access Control: Different roles (Admin, Financial Planner, Mortgage Broker) have different permissions to interact with the system.

Technologies
Frontend:ReactJS with Tailwind CSS
Backend: Node.js, Express
Database: MySQL
Authentication: JWT (JSON Web Tokens)
ORM: Sequelize (optional based on implementation)
Environment: Docker (optional for containerization)
Necessary Tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(50) NOT NULL,
    client_name VARCHAR(100) NOT NULL,
    client_address TEXT NOT NULL,
    client_contact_details VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_by INT NOT NULL,
    assigned_to INT,
    status ENUM('Pending', 'In Progress', 'Resolved', 'NotAssigned') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);
