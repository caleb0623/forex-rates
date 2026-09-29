# Forex Rates

A simple React and Node.js application that retrieves foreign exchange rates from the Fixer API and displays the original and adjusted rates in a table.

## Features

* Retrieves the latest currency rates from the Fixer API.
* Uses Node.js and Express as the backend API.
* Keeps the Fixer API key in an environment variable.
* Displays the original currency rates.
* Creates adjusted rates by adding `10.0002` to each original rate.
* Highlights values with a red border when:

  * The value is an even integer, or
  * The currency is HKD.
* Includes loading and error states.
* Responsive table layout for smaller screens.

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express
* Axios
* dotenv
* CORS

## Project Structure

```text
forex-rates/
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd forex-rates
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```text
FIXER_API_KEY=your_api_key_here
```

### 3. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## API Flow

```text
React Frontend
      |
      | GET /api/rates
      v
Node.js / Express
      |
      | GET Fixer API
      v
Fixer API
      |
      | Currency rates
      v
Node.js
      |
      | JSON
      v
React
      |
      v
Forex Rates Table
```

## Rate Calculation

The original rate is stored unchanged.

The adjusted rate is calculated as:

```text
adjusted rate = original rate + 10.0002
```

For example:

```text
Original: 4.160246
Adjusted: 14.160446
```

## Highlighting Logic

The `isEvenNumber()` function checks whether a value is an even integer.

A table cell receives a red border when:

```text
currency === "HKD"
OR
value is an even integer
```

## Notes

The API key is stored in `.env` and excluded from Git using `.gitignore`.
