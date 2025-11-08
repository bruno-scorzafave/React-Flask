# React-Flask Project

A full-stack web application boilerplate using React for the frontend and a Flask REST API for the backend. This starter kit is designed to get you up and running quickly with a modern web application architecture.

## Table of Contents

- [React-Flask Project](#react-flask-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Backend Setup (Flask)](#backend-setup-flask)
    - [Frontend Setup (React)](#frontend-setup-react)
    - [Running the Application](#running-the-application)
  - [Environment Variables](#environment-variables)
  - [API Endpoints](#api-endpoints)

## Features

-   **React Frontend**: A modern, component-based UI library.
-   **Flask Backend**: A lightweight and powerful Python web framework for building the REST API.
-   **RESTful API**: A well-structured API to handle data communication between the client and server.
-   **Development Proxy**: The React development server is configured to proxy API requests to the Flask backend to avoid CORS issues during development.

## Tech Stack

-   **Backend**: Python, Flask
-   **Frontend**: React.js, JavaScript (ES6+)
-   **Package Manager**: npm

## Project Structure

```
/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
├── server/  (or root directory)
│   ├── app.py (or main application file)
│   ├── requirements.txt
│   └── ...
└── README.md
```

-   `client/`: Contains the entire React frontend application.
-   `server/`: Contains the Flask backend API. (Note: Your Flask files might be in the root directory instead).

## Getting Started

Follow these instructions to get the project set up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
-   **Node.js** (v14 or newer) and **npm**
-   **Python** (v3.8 or newer) and **pip**

### Backend Setup (Flask)

1.  **Navigate to the backend directory:**
    ```sh
    # If your Flask app is in a 'server' directory
    cd server
    # If it's in the root, just stay in the project root
    ```

2.  **Create and activate a Python virtual environment:**
    ```sh
    # Create the virtual environment
    py -m pipenv shell
    ```

3.  **Install Python dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

### Frontend Setup (React)

1.  **Navigate to the client directory** in a new terminal window:
    ```sh
    cd client
    ```

2.  **Install npm dependencies:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the Flask Backend Server:**
    In the terminal where you set up the backend, run:
    ```sh
    py -m pipenv shell
    py run.py
    ```
    The backend API should now be running on `http://127.0.0.1:5000`.

2.  **Start the React Frontend Server:**
    In the terminal where you set up the frontend (`client` directory), run:
    ```sh
    npm start
    ```
    The React development server will open your application in your default browser at `http://localhost:3000`.

You're all set! The React app will proxy API requests to your Flask backend.

## Environment Variables

This project uses `dotenv` to manage environment variables. Create a `.env` file in the root of your `server` directory for backend variables and in the `client` directory for frontend variables.

**Backend (`/server/.env`):**
```
FLASK_APP=app.py
SECRET_KEY=your-secret-key
# Add other variables like DATABASE_URL, FLASK_ENV, etc.
```

## API Endpoints

Here are some example API endpoints you might define in your Flask application:

-   `GET /recipes/recipes/`: Get all recipes data.
-   `POST /recipes/recipes/`: Creates a new recipe.
-   `PUT /recipes/recipes/id`: Updates an existing recipe.
-   `DELETE /recipes/recipes/id`: Deletes a recipe.
-   `GET /recipes/recipes/id`: Get a specific recipe by ID.
-   `POST /auth/signup`: User signup.
-   `POST /auth/login`: User login.
-   `POST /auth/refresh`: Token refresh.