// Frontend/src/pages/BookingList.jsx

import React, { useState, useEffect } from "react";
// 💡 CORRECTION 1: Use Link from react-router-dom correctly
import { Link } from "react-router-dom"; 
import axios from "axios";
import './BookingList.css'; // Import dedicated styles

const API_BASE_URL = process.env.REACT_APP_API_URL;

function BookingList() {
    // Renamed state variables for clarity
    const [bookings, setBookings] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pages = Array.from(Array(totalPages).keys());

    // --- Data Fetching Logic ---
    const fetchBookings = () => {
        // 💡 CORRECTION 2: Use environment variable and standard path
        axios.get(`${API_BASE_URL}?page=${pageNumber}`)
            .then((res) => {
                // API response structure: { data: [...bookings], totalPages: N, ... }
                setBookings(res.data.data);
                setTotalPages(res.data.totalPages); // Use 'totalPages' from the backend response
            })
            .catch((error) => {
                console.error("Error fetching booking list:", error);
            });
    };

    // 💡 CRITICAL FIX 3: Correct Dependency Array
    // Run fetchBookings only when pageNumber changes. 
    // This prevents an infinite loop that occurred with [userForm/bookings] dependency.
    useEffect(() => {
        fetchBookings();
    }, [pageNumber]); 

    // --- Deletion Logic ---
    const deleteBooking = (_id) => {
        // API path for delete is /api/bookings/:id
        axios.delete(`${API_BASE_URL}/${_id}`)
            .then(() => {
                console.log(`Booking ${_id} successfully deleted!`);
                
                // OPTION 1: Update state locally (faster UX)
                setBookings(bookings.filter(booking => booking._id !== _id));
                
                // OPTION 2: Re-fetch the data to ensure list consistency (more reliable)
                // fetchBookings();
            })
            .catch((error) => {
                console.error("Error deleting booking:", error);
            });
    };

    return (
        <div className="booking-list-page"> 
            <h1>My Event Bookings</h1>
            <p className="total-pages-info">Showing page {pageNumber + 1} of {totalPages}</p>
            
            <div className="table-responsive">
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Tickets</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Booked At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((user, index) => (
                                <tr key={user._id || index}>
                                    {/* 💡 CORRECTION 4: Using corrected schema names */}
                                    <td>{user.userName}</td>
                                    <td>{user.eventName}</td>
                                    {/* Formatting the date for better display */}
                                    <td>{new Date(user.eventDate).toLocaleDateString()}</td>
                                    <td>{user.ticketsQuantity}</td>
                                    <td>₹{user.totalPrice ? user.totalPrice.toFixed(2) : 'N/A'}</td>
                                    <td>{new Date(user.bookedAt).toLocaleDateString()}</td>
                                    <td>
                                        {/* Use Link component for routing */}
                                        <Link to={`/edit-booking/${user._id}`} className="btn-secondary btn-edit">Edit</Link>
                                        <button className="btn-danger btn-delete" onClick={() => deleteBooking(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-bookings">No bookings found. <Link to="/create-booking">Book your first event!</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls">
                    {pages.map((pageIndex) => (
                        <button
                            key={pageIndex}
                            className={`page-btn ${pageIndex === pageNumber ? 'active' : ''}`}
                            onClick={() => setPageNumber(pageIndex)}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
export default BookingList;