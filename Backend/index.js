// Backend/index.js

// 1. Module Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path'); // Required for reliable path creation

// 2. Load Environment Variables
// FIX: Explicitly tell dotenv to look one directory up (..) for the .env file
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }); 

const app = express();

// 3. Import Routes (Assuming 'bookingroutes.js' is the correct file name)
const bookingRoute = require("./routes/bookingroutes"); 

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log(`✅ Connected to MongoDB Atlas!`);
})
.catch((err) => {
    // This will now show the actual MongoDB error if connection fails (e.g., wrong password)
    console.error("❌ Error connecting to MongoDB Atlas:", err); 
});

// --- Middleware ---

// Enable CORS for frontend communication
app.use(cors());

// Use built-in Express parser for JSON and URL-encoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- Routes ---
// Mount the routes under the /api/bookings prefix
app.use("/api/bookings", bookingRoute); 

// --- PORT Listener ---
const port = process.env.PORT || 5000; 

// Simple test route
app.get('/', (req, res) => {
    res.send('Event Ticketing API is running successfully.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// --- Error Handling ---
// Catch 404
app.use((req, res, next) => {
    res.status(404).send({ message: 'Route Not Found' });
});

// General error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({ message: err.message });
});