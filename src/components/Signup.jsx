import React, { useState } from 'react'
import "./Signup.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Signup() {
                                                     
        const [userdata, updateuserdata] = useState({
          firstname:'',                              
          lastname:'',
          email:'',
          password:'',
        });
        const history = useNavigate();
        const handleChange = (e) => {
          const { name, value } = e.target;
          updateuserdata({
            ...userdata,
            [name]: value,
          });
        };
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userdata)
        });
      
  
        if (response.ok) {
          alert('user signup successfully!');
        } else {
          alert('user Failed to signup');
        }
        history('/login');
        const result = await response.json();
        console.log('Success:', result);
      } catch (error) {
        console.error('Error:', error);
        alert('Error posting job');
      }
    };

  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
             <div className='entryproperty'>
            <label>First Name <input type="text" name="firstname" value={userdata.firstname} onChange={handleChange}/></label>
            <hr className='hr'/>
            <label>Last Name <input type="text" name="lastname" value={userdata.lastname} onChange={handleChange}/></label>
            <hr className='hr'/>
            <label>Email<input type="text" name="email" value={userdata.email} onChange={handleChange}/></label>
            <hr className='hr'/>
            <label>Password <input type="text" name="password" value={userdata.password} onChange={handleChange}/></label>
            <hr className='hr'/>
            <label>Phone no.<input type="text" name="phoneno" value={userdata.phoneno} onChange={handleChange}/></label>
            <hr className='hr'/>
            <label>Location <input type="text" name="location" value={userdata.location} onChange={handleChange}/></label>
            <hr className='hr'/>
            <label>Skills <input type="text" name="skills" value={userdata.skills} onChange={handleChange}/></label>
            <hr className='hr'/>
            </div>
            <p>Already a member? <Link to="/login">login</Link></p>
              <button>SignUp</button>
        </form>
    </div>
  )
}

export default Signup