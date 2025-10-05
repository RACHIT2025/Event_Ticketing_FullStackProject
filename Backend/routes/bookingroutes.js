const express = require("express");
const router = express.Router();

// 💡 CORRECTION 1: Renamed the imported model to the standard 'Booking' for clarity
const Booking = require("../models/Booking"); 

// --- 1. CREATE Booking (POST) ---
// Route: /api/bookings/create
router.post("/create", async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        
        // 💡 BEST PRACTICE: Use standard HTTP status codes (201 Created)
        res.status(201).json({
            message: "Booking successfully created.",
            data: newBooking,
        });
    } catch (error) {
        // Handle validation errors (400 Bad Request) or server errors (500)
        res.status(400).json({ 
            message: "Failed to create booking.", 
            error: error.message 
        });
    }
});

// --- 2. READ ALL Bookings with Pagination (GET) ---
// Route: /api/bookings?page=X
router.get("/", async (req, res) => {
    try {
        const page_size = 5;
        // Ensure 'page' query parameter is parsed as an integer, default to 0
        const page = parseInt(req.query.page || "0"); 
        
        const totalRecords = await Booking.countDocuments({});
        
        const bookings = await Booking.find()
            // 💡 OPTIMIZATION: Sort by the latest booking date
            .sort({ bookedAt: -1 }) 
            .limit(page_size)
            .skip(page_size * page);

        res.status(200).json({
            message: "All bookings successfully fetched.",
            data: bookings,
            // Calculate total pages for the frontend pagination controls
            totalPages: Math.ceil(totalRecords / page_size), 
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to fetch bookings.", 
            error: error.message 
        });
    }
});

// --- 3. READ SINGLE Booking (GET) ---
// Route: /api/bookings/:id
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json({
            message: "Booking successfully fetched.",
            data: booking,
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to fetch booking.", 
            error: error.message 
        });
    }
});


// --- 4. UPDATE Booking (PUT) ---
// Route: /api/bookings/update/:id
router.put("/update/:id", async (req, res) => {
    try {
        // Use { new: true } to return the document AFTER the update is applied
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true, runValidators: true }); // Also run validators on update
        
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found for update." });
        }

        res.status(200).json({
            message: "Booking successfully updated.",
            data: updatedBooking,
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Failed to update booking.", 
            error: error.message 
        });
    }
});

// --- 5. DELETE Booking (DELETE) ---
// Route: /api/bookings/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found for deletion." });
        }
        
        // 💡 BEST PRACTICE: Use 204 No Content for successful deletion
        res.status(204).json({
            message: "Booking successfully deleted.",
            data: null 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to delete booking.", 
            error: error.message 
        });
    }
});

module.exports = router;