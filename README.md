# Crop Prediction and Agricultural Advisory App

This is a full-stack web application designed to provide farmers with crop predictions and other agricultural advice. It features a React-based frontend and a Python FastAPI backend.

## Quick Start

This guide will get you up and running in a few steps. You will need two terminals or command prompts open.

**Prerequisites:**
*   [Node.js](https://nodejs.org/)
*   [Python](https://www.python.org/)
*   A [MongoDB](https://www.mongodb.com/cloud/atlas) account.

--- 

### Terminal 1: Backend Setup

**On Windows:**

```bash
python -m venv venv && .\venv\Scripts\activate && pip install -r requirements.txt && uvicorn backend:app --reload
```

**On macOS/Linux:**

```bash
source venv/bin/activate && pip install -r requirements.txt && uvicorn backend:app --reload
```

--- 

### Terminal 2: Frontend Setup

```bash
npm install && npm run dev
```

--- 

### What the Commands Do

*   **Backend:**
    1.  `python -m venv venv`: Creates a new virtual environment for Python.
    2.  `.\venv\Scripts\activate` or `source venv/bin/activate`: Activates the virtual environment.
    3.  `pip install -r requirements.txt`: Installs all the necessary Python packages.
    4.  `uvicorn backend:app --reload`: Starts the backend server.

*   **Frontend:**
    1.  `npm install`: Installs all the necessary JavaScript packages.
    2.  `npm run dev`: Starts the frontend development server.

Once both servers are running, you can access the application at `http://localhost:5173`.

## Important Note on MongoDB

The backend requires a connection to a MongoDB database. The connection URL is currently hardcoded in `backend.py`.

**It is strongly recommended to use environment variables for sensitive data like database credentials.** You should modify the code to fetch the MongoDB URL from an environment variable.

## Tech Stack

*   **Frontend**:
    *   React
    *   TypeScript
    *   Vite
    *   Tailwind CSS
    *   React Router
*   **Backend**:
    *   Python
    *   FastAPI
    *   MongoDB (with `pymongo`)
    *   Uvicorn