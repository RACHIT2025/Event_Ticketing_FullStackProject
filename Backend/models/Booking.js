const mongoose = require('mongoose');

// Destructure Schema from mongoose for cleaner code
const { Schema } = mongoose;

const bookingSchema = new Schema({
    // User's Name (Renamed for clarity: userName)
    userName: {
        type: String,
        required: [true, "User name is required"], // Added custom error message
        trim: true // Removes leading/trailing whitespace
    },
    
    // Event Name (Renamed for clarity: eventName)
    eventName: {
        type: String,
        required: [true, "Event name is required for the booking"],
        trim: true
    },
    
    // Date of the Event (Changed to Date type for proper database indexing and queries)
    eventDate: {
        type: Date,
        required: [true, "Event date is required"]
    },
    
    // Number of Seats Booked (Renamed for clarity: ticketsQuantity)
    ticketsQuantity: {
        type: Number,
        required: [true, "Number of seats/tickets is required"],
        min: [1, "Must book at least 1 ticket"]
    },
    
    // Price per Booking
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Price cannot be negative"]
    },
    
    // Added for tracking when the booking was created
    bookedAt: {
        type: Date,
        default: Date.now 
    }
}, {
    // Adding timestamps automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: false 
    // I set this to false because we already added 'bookedAt', but feel free to change to 'true' 
    // if you prefer Mongoose's default timestamp names.
});

module.exports = mongoose.model('Booking', bookingSchema);