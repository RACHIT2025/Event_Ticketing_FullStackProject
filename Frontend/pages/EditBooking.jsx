// Frontend/src/pages/EditBooking.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './CreateBooking.css'; // Reusing form styles from CreateBooking

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Helper function to format date objects into yyyy-mm-dd string for input type="date"
const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function EditBooking() {
    const [bookingForm, setBookingForm] = useState({
        userName: "",           // Corresponds to 'name' in your initial state
        eventName: "",          // Corresponds to 'ename'
        eventDate: "",          // Corresponds to 'dates'
        ticketsQuantity: "",    // Corresponds to 'seatno'
        totalPrice: "",         // Corresponds to 'price'
    });
    const [message, setMessage] = useState('');
    
    let params = useParams();
    let navigate = useNavigate();

    // --- 1. Fetch Existing Data ---
    useEffect(() => {
        setMessage('Loading booking details...');
        // 💡 CORRECTION 1: Use environment variable and correct GET path
        axios.get(`${API_BASE_URL}/${params.id}`)
            .then((res) => {
                const data = res.data.data;

                // 💡 CRITICAL FIX 2: Aligning data with corrected schema names and formatting date
                setBookingForm({
                    userName: data.userName || '',
                    eventName: data.eventName || '',
                    eventDate: formatDateForInput(data.eventDate), // Format date for input field
                    ticketsQuantity: data.ticketsQuantity || '',
                    totalPrice: data.totalPrice || '',
                });
                setMessage('');
            })
            .catch((error) => {
                console.error("Error fetching data for edit:", error);
                setMessage('Error loading data.');
            });
    }, [params.id]);


    // --- 2. Input Handler ---
    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setBookingForm((prevNext) => ({
            ...prevNext,
            [name]: value,
        }));
    };

    // --- 3. Update Submission ---
    const onUpdate = (e) => {
        e.preventDefault();
        setMessage('Updating booking...');

        // 💡 CORRECTION 3: Use environment variable and correct PUT path
        const apiUrl = `${API_BASE_URL}/update/${params.id}`;
        
        // 💡 CRITICAL FIX 4: Send data with corrected schema names and ensure number types
        const dataToSend = {
            ...bookingForm,
            ticketsQuantity: Number(bookingForm.ticketsQuantity),
            totalPrice: Number(bookingForm.totalPrice),
            eventDate: new Date(bookingForm.eventDate).toISOString(), // Send back as ISO string
        };

        axios.put(apiUrl, dataToSend)
            .then((res) => {
                console.log("Update successful:", res.data);
                setMessage('Update successful! Redirecting...');
                navigate("/booking-list");
            })
            .catch((error) => {
                console.error("Update error:", error.response ? error.response.data : error.message);
                setMessage(`Error updating: ${error.response ? error.response.data.message : 'Could not connect to server.'}`);
            });
    };

    return (
        <div className="create-booking-page"> {/* Reusing the layout class */}
            <div className='form-card card'>
                <h2>Edit Booking</h2>
                <p className="message-feedback">{message}</p>

                <form onSubmit={onUpdate}>
                    {/* Customer Name */}
                    <div className='form-group'>
                        <label htmlFor="userName">Customer Name</label>
                        <input type="text" name="userName" id="userName" required
                            className="form-control" value={bookingForm.userName} 
                            onChange={inputsHandler} />
                    </div>

                    {/* Event Name */}
                    <div className='form-group'>
                        <label htmlFor="eventName">Event Name</label>
                        <input type="text" name="eventName" id="eventName" required
                            className="form-control" value={bookingForm.eventName} 
                            onChange={inputsHandler} />
                    </div>

                    {/* Event Date */}
                    <div className='form-group'>
                        <label htmlFor="eventDate">Event Date</label>
                        <input type="date" name="eventDate" id="eventDate" required
                            className="form-control" value={bookingForm.eventDate} 
                            onChange={inputsHandler} />
                    </div>

                    {/* Tickets Quantity */}
                    <div className='form-group'>
                        <label htmlFor="ticketsQuantity">Number of Tickets</label>
                        <input type="number" name="ticketsQuantity" id="ticketsQuantity" required
                            className="form-control" value={bookingForm.ticketsQuantity} 
                            onChange={inputsHandler} />
                    </div>

                    {/* Total Price */}
                    <div className='form-group'>
                        <label htmlFor="totalPrice">Total Price (₹)</label>
                        <input type="number" name="totalPrice" id="totalPrice" required min="1" step="0.01"
                            className="form-control" value={bookingForm.totalPrice} 
                            onChange={inputsHandler} />
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="btn-primary">UPDATE BOOKING</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditBooking;