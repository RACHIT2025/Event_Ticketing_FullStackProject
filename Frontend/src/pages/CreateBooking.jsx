// Frontend/src/pages/CreateBooking.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
// 💡 CRITICAL FIX: Changing the import name to match the file on disk (Creating.css)
import './Creating.css'; 

const API_BASE_URL = process.env.REACT_APP_API_URL;

function CreateBooking() {
    const navigate = useNavigate();
    
    const [bookingForm, setBookingForm] = useState({
        userName: "",         
        eventName: "",         
        eventDate: "",         
        ticketsQuantity: "",   
        totalPrice: "",        
        userEmail: "",        
    });

    const [message, setMessage] = useState('');

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setBookingForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setMessage('Processing booking...');

        const apiUrl = `${API_BASE_URL}/create`;
        
        const dataToSend = {
            ...bookingForm,
            ticketsQuantity: Number(bookingForm.ticketsQuantity),
            totalPrice: Number(bookingForm.totalPrice),
            eventDate: new Date(bookingForm.eventDate).toISOString(),
        };

        axios.post(apiUrl, dataToSend)
            .then((res) => {
                setMessage('Booking successful! Redirecting...');
                setBookingForm({
                    userName: "", eventName: "", eventDate: "", ticketsQuantity: "", totalPrice: "", userEmail: ""
                });
                navigate('/booking-list'); 
            })
            .catch((error) => {
                setMessage(`Error: ${error.response ? error.response.data.message : 'Could not connect to server.'}`);
            });
    };

    return (
        <div className="create-booking-page">
            <div className='form-card card'>
                <h2>Book a Ticket</h2>
                <p className="message-feedback">{message}</p>
                
                <form onSubmit={onSubmit}>
                    {/* Form fields remain the same */}
                    <div className='form-group'>
                        <label htmlFor='userName'>Customer Name</label>
                        <input type="text" name="userName" id="userName" required
                            value={bookingForm.userName} onChange={inputsHandler} 
                            placeholder="Enter your full name" />
                    </div>
                    {/* ... other form groups ... */}
                    <div className='form-group'>
                        <label htmlFor='totalPrice'>Total Price (₹)</label>
                        <input type="number" name="totalPrice" id="totalPrice" required min="1" step="0.01"
                            value={bookingForm.totalPrice} onChange={inputsHandler} 
                            placeholder="e.g., 999.00" />
                    </div>

                    <div className='form-submit'>
                        <button type="submit" className='btn-primary'>CONFIRM BOOKING</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBooking;