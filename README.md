<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRM System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: white;
            padding: 10px;
            text-align: center;
        }
        h1, h2 {
            color: #333;
        }
        section {
            padding: 20px;
            margin: 10px;
            background-color: white;
            border-radius: 5px;
        }
        code {
            display: block;
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            white-space: pre-wrap;
        }
        .feature-list, .tech-list {
            list-style: none;
            padding-left: 0;
        }
        .feature-list li, .tech-list li {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>CRM System</h1>
    </header>

    <section>
        <h2>Overview</h2>
        <p>
            This is a <strong>CRM (Customer Relationship Management)</strong> system designed for managing tickets, users, and user roles within a financial planning and mortgage broker context. The system includes features such as user authentication, ticket creation and management, and role-based access to different functionalities. It is built using <strong>Node.js</strong> for the backend, with <strong>MySQL</strong> for the database.
        </p>
    </section>

    <section>
        <h2>Features</h2>
        <ul class="feature-list">
            <li><strong>User Management:</strong> Create, view, update, and delete users. Users have roles such as Admin, Financial Planner, and Mortgage Broker.</li>
            <li><strong>Ticket Management:</strong> Create, update, delete, and assign tickets. Each ticket represents a customer inquiry or task with a status that can be Pending, In Progress, Resolved, or NotAssigned.</li>
            <li><strong>Role-based Access Control:</strong> Different roles (Admin, Financial Planner, Mortgage Broker) have different permissions to interact with the system.</li>
        </ul>
    </section>

    <section>
        <h2>Technologies</h2>
        <ul class="tech-list">
            <li><strong>Frontend:</strong> ReactJS with Tailwind CSS</li>
            <li><strong>Backend:</strong> Node.js, Express</li>
            <li><strong>Database:</strong> MySQL</li>
            <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
            <li><strong>ORM:</strong> Sequelize (optional based on implementation)</li>
            <li><strong>Environment:</strong> Docker (optional for containerization)</li>
        </ul>
    </section>

    <section>
        <h2>Necessary Tables</h2>

        <h3>Users Table</h3>
        <p>This table stores user details such as authentication information and their assigned role.</p>
        <code>
            CREATE TABLE users ( <br>
                id INT AUTO_INCREMENT PRIMARY KEY, <br>
                email VARCHAR(255) NOT NULL, <br>
                password VARCHAR(255) NOT NULL, <br>
                name VARCHAR(100) NOT NULL, <br>
                profile_picture VARCHAR(255), <br>
                role VARCHAR(50) NOT NULL, <br>
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP <br>
            );
        </code>

        <h3>Tickets Table</h3>
        <p>This table stores ticket information, such as customer details, assigned users, and ticket status.</p>
        <code>
            CREATE TABLE tickets ( <br>
                id INT AUTO_INCREMENT PRIMARY KEY, <br>
                serial_number VARCHAR(50) NOT NULL, <br>
                client_name VARCHAR(100) NOT NULL, <br>
                client_address TEXT NOT NULL, <br>
                client_contact_details VARCHAR(100) NOT NULL, <br>
                amount DECIMAL(10, 2) NOT NULL, <br>
                created_by INT NOT NULL, <br>
                assigned_to INT, <br>
                status ENUM('Pending', 'In Progress', 'Resolved', 'NotAssigned') NOT NULL, <br>
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, <br>
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, <br>
                FOREIGN KEY (created_by) REFERENCES users(id), <br>
                FOREIGN KEY (assigned_to) REFERENCES users(id) <br>
            );
        </code>
    </section>
</body>
</html>
