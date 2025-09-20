# Smart Crop Predictor

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An AI-powered agricultural intelligence platform designed to help farmers make smarter, data-driven decisions for crop selection and management.

![Smart Crop Predictor Screenshot](<placeholder-for-screenshot.png>)
*(Add a screenshot of the application here)*

## ✨ Features

-   **Intelligent Crop Prediction**: Get predictions on crop survival probability, expected yield, and potential market value based on your specific farming conditions.
-   **Comprehensive Data Input**: Input details like crop type, season, soil type, land area, and location (state/district) to get tailored predictions.
-   **Real-time Weather Integration**: Includes a weather widget, cloud map, and weather alerts to keep you informed about environmental conditions.
-   **Detailed Soil Analysis**: Simulates soil data (pH, nutrients, organic matter) and its impact on crop health.
-   **Actionable Recommendations**: Provides risk factors and practical recommendations to mitigate them, such as soil amendments and optimal planting seasons.
-   **Responsive and Modern UI**: Built with React and Tailwind CSS for a seamless experience on both desktop and mobile devices.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Nandukumar-koribilli/blander.git
    cd blander/crop
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the frontend development server:**
        ```bash
        npm run dev
        # or
        yarn dev
        ```

        Vite's dev server typically opens at `http://localhost:5173` (not `3000`). If you see a different port in your terminal, open that URL.

4. **Run the backend (FastAPI)** — optional, required for authentication and server-side endpoints:

        - Create a virtual environment and install dependencies (recommended):
            ```bash
            python -m venv .venv
            source .venv/bin/activate
            pip install fastapi uvicorn pymongo passlib[bcrypt] python-multipart email-validator
            ```

        - Set the MongoDB connection string in an environment variable (example):
            ```bash
            export MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"
            ```

        - Run the backend FastAPI server from the `crop/` folder:
            ```bash
            uvicorn backend:app --reload --port 8000
            ```

        - The backend will be available at `http://localhost:8000` and the OpenAPI docs at `http://localhost:8000/docs`.

## 📂 Project Structure

The project follows a standard React application structure:

```
crop-main/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── CloudMap.tsx
│   │   ├── CropPredictionResult.tsx
│   │   ├── CropSelector.tsx
│   │   ├── FarmingForm.tsx
│   │   ├── SoilAnalysis.tsx
│   │   ├── WeatherAlerts.tsx
│   │   └── WeatherWidget.tsx
│   ├── data/               # Static data (e.g., crop database)
│   │   └── crops.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles for Tailwind
│   └── index.tsx           # Application entry point
├── .gitignore
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the app, please feel free to fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source. It is recommended to add a `LICENSE` file to define the terms under which it is licensed (e.g., MIT License).


 ```bash
     npm install react-router-dom

    
     pip install --upgrade bcrypt

    ```