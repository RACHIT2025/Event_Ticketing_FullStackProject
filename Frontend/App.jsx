import React from 'react';
import "./App.css"; // Keep the global CSS import
import CreateBooking from './pages/CreateBooking';
import EditBooking from './pages/EditBooking';
import Home from './pages/Home';
import BookingList from './pages/BookingList';
import MenuBar from './components/MenuBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Wrap the entire application content in <Router>
    <Router>
      <div className='app-container'>
        
        {/* The developer details section has been REMOVED */}
        
        <MenuBar />
        
        {/* Main content routes */}
        <div className='content-area'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/booking-list' element={<BookingList />} />
            <Route path='/create-booking' element={<CreateBooking />} />
            
            {/* Keeping both edit paths for flexibility, but using the dynamic one is best */}
            <Route path='/EditBooking' element={<EditBooking />} /> 
            <Route path='/edit-booking/:id' element={<EditBooking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;