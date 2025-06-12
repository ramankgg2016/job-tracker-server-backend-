# Job Application Tracker - Backend (Server)

## Overview

This directory contains the Node.js and Express.js backend API for the Job Application Tracker. It serves as the data layer, handling user authentication, CRUD operations for job applications, and providing API endpoints with support for searching, filtering, sorting, and pagination. MongoDB is used as the database.

## Features

* **RESTful API Endpoints:**
    * `/api/auth/register`: Register a new user.
    * `/api/auth/login`: Authenticate a user and return a JWT.
    * `/api/jobs`: Get all job applications for the authenticated user (supports search, filter, sort, pagination).
    * `/api/jobs/:id`: Get a specific job application by ID.
    * `/api/jobs`: Create a new job application.
    * `/api/jobs/:id`: Update an existing job application.
    * `/api/jobs/:id`: Delete a job application.
* **User Authentication & Authorization:** Implemented using JSON Web Tokens (JWT) for secure, stateless authentication.
* **Password Security:** User passwords are securely hashed using `bcryptjs` before storage in the database.
* **Data Models:** Mongoose schemas for `User` and `JobApplication` data.
* **Server-Side Validation:** Robust input validation using `express-validator` on all relevant endpoints.
* **Database Integration:** Connects to a MongoDB Atlas cluster.

## Technologies

* **Node.js**
* **Express.js**
* **MongoDB** (via Mongoose)
* **JSON Web Tokens (JWT)**
* **Bcrypt.js**
* **CORS**
* **Dotenv** (for environment variables)
* **Express-Validator**

## Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn (package manager)
* A MongoDB Atlas account (or a local MongoDB instance) for database hosting.

## Installation & Setup

1.  **Navigate to the server directory:**
    ```bash
    cd job-application-tracker/server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `server` directory (at the same level as `server.js`). This file contains sensitive information like your database connection string and JWT secret.

    ```dotenv
    # .env
    MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.yourmongodb.net/jobtracker?retryWrites=true&w=majority
    JWT_SECRET=your_super_secret_jwt_key_here # Choose a strong, unique secret
    PORT=5000
    ```
    * **`MONGO_URI`**: Obtain this from your MongoDB Atlas cluster dashboard. Ensure you replace `<your_username>` and `<your_password>` with your actual database user credentials.
    * **`JWT_SECRET`**: Generate a long, random string for this. Do NOT use easily guessable values.

4.  **Start the backend server:**
    ```bash
    npm start
    # For development with auto-restarts on file changes:
    # npm run dev
    ```
    The server will typically start on `http://localhost:5000` (or the `PORT` you specified).

## API Endpoints

Below is a brief summary of the key API endpoints. All job application endpoints require a valid JWT in the `Authorization: Bearer <token>` header.

| Endpoint           | Method | Description                                     | Request Body / Query Params |
| :----------------- | :----- | :---------------------------------------------- | :-------------------------- |
| `/api/auth/register` | `POST`   | Register a new user                             | `{ email, password }`       |
| `/api/auth/login`    | `POST`   | Login user, returns JWT                         | `{ email, password }`       |
| `/api/jobs`        | `GET`    | Get all user's jobs                             | `?page=1&limit=5&search=<text>&status=<status>&sort=<order>` |
| `/api/jobs/:id`    | `GET`    | Get single job by ID                            |                             |
| `/api/jobs`        | `POST`   | Create new job application                    | `{ company, role, dateApplied, status, notes? }` |
| `/api/jobs/:id`    | `PUT`    | Update existing job application                 | `{ company?, role?, dateApplied?, status?, notes? }` |
| `/api/jobs/:id`    | `DELETE` | Delete a job application                        |                             |

## API Validation

Server-side input validation is implemented using `express-validator`.
* **Authentication:** Ensures valid email format and minimum password length for registration; ensures email and password are provided for login.
* **Job Applications:** Validates required fields (company, role, dateApplied, status), ensures correct date format, validates status against predefined enum values, and sanitizes string inputs to prevent XSS attacks.
* Errors are returned to the client with a `400 Bad Request` status and an `errors` array in the response body (e.g., `{ "errors": [{ "msg": "...", "param": "...", "location": "body" }] }`).

## Deployment

This backend can be deployed to services like Render, Heroku, or AWS EC2.
* Ensure your `MONGO_URI` and `JWT_SECRET` are configured as environment variables in your chosen hosting provider's settings, not hardcoded.
* The `PORT` environment variable should also be configured, often set by the hosting provider itself.