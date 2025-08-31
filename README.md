# Expense Tracker Application

A full-stack MERN application for tracking personal income and expenses, built with a modern, responsive user interface.

## Features

-   **User Authentication**: Secure user login and registration.
-   **Transaction Management**: Add, view, and delete income and expense transactions.
-   **Interactive Dashboard**: View total balance and categorized income/expense summaries.
-   **Data Persistence**: Transactions are saved to a MongoDB database and also cached in local storage for a faster experience.
-   **Responsive Design**: A clean layout that works on desktop and mobile devices.
-   **Light/Dark Mode**: A theme toggle for user preference.

## Tech Stack

-   **Frontend**: React.js, Context API
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Deployment**: The frontend is deployed on Netlify and the backend on Render.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/your_username/expense-tracker.git](https://github.com/your_username/expense-tracker.git)
    ```
2.  Install backend dependencies
    ```sh
    cd backend
    npm install
    ```
3.  Install frontend dependencies
    ```sh
    cd ../client
    npm install
    ```
4.  Create a `config.env` file in the `backend/config` folder and add your `MONGO_URI`.

## Usage

1.  Start the backend server (from the `backend` folder)
    ```sh
    npm run dev
    ```
2.  Start the frontend client (from the `client` folder)
    ```sh
    npm start
    ```