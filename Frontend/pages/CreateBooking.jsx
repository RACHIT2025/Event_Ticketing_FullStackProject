import React, { useState } from "react";
import axios from "axios"
function CreateBooking() {
  const [userForm,setUserForm]=useState({
    name: "",
    ename: "",
    dates:"",
    seatno: "",
    price: "",

  });

  const inputsHandler=(e)=>{
    setUserForm((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:4000/bookings/create-booking",userForm)
    .then((res)=>{
      console.log(res.data);
      setUserForm({
        name: "",
        ename: "",
        dates:"",
        seatno: "",
        price: "",
      })
    })
  }
  return(
    <div>
      <div className='form-wrapper' style={{padding:"30px",backgroundColor:'	#404040',color:'white',width:'1227px',height:'500px'}}>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Customer Name</label>
            <input type="text" name="name" id="name" className='form-control' value={userForm.name} onChange={inputsHandler} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Event Name</label>
            <input type="text" name="ename" id="ename" className='form-control' value={userForm.text} onChange={inputsHandler} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Booking Date</label>
            <input type="date" name="dates" id="dates" className='form-control' value={userForm.dates} onChange={inputsHandler} />
          </div>

          <div className='mb-3'>
            
            <label className='form-label'>Seat Number</label>
            <input type="text" name="seatno" id="seatno" className='form-control' value={userForm.seatno} onChange={inputsHandler} />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Ticket Price</label>
            <input type="number" name="price" id="price" className='form-control' value={userForm.price} onChange={inputsHandler} />
          </div>

          <div className='mb-3'>
            <button type="submit" className='btn btn-primary'>ADD BOOKING</button>
          </div>
          </form>
      </div>
    </div>
  )
}
export default CreateBooking