import React from 'react';
import "./App.css"; 
import CreateBooking from './pages/CreateBooking';
import EditBooking from './pages/EditBooking';
import Home from './pages/Home';
import BookingList from './pages/BookingList';
import MenuBar from './components/MenuBar';
// The BrowserRouter must wrap the entire application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Wrap the entire application content in <Router>
    <Router>
      <div className='app-container'>
        
        {/* Navigation Bar */}
        <MenuBar />
        
        {/* Main content area where routes are rendered */}
        <main className='content-area'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/booking-list' element={<BookingList />} />
            <Route path='/create-booking' element={<CreateBooking />} />
            
            {/* Dynamic route for editing a specific booking */}
            <Route path='/edit-booking/:id' element={<EditBooking />} />
            
            {/* Optional: Remove the static /EditBooking route from App.jsx if you don't need it */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;