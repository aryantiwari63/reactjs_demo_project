import React, { useEffect, useState } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../actions/profileaction';
//import { useProfileContext } from '../Context';              context api
function Profile() {
    
    
    // const { userProfile, setUserProfile } = useProfileContext();   context api
    const { userProfile, setUserProfile } = useState();
     const dispatch = useDispatch();
     const history = useNavigate();
     useEffect(() => {
           fetchprofildata();
           }, []);
     
        const fetchprofildata = async () => {
            try {
              // Retrieve token from localStorage
              const token = localStorage.getItem('token');
        
              // Check if token exists
              if (!token) {
                throw new Error('No token found');
              }
        
              // Make the request with the Authorization header
              const response = await axios.get('http://localhost:8000/api/profile', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              setUserProfile(response.data);
              dispatch(setProfileData(response.data)); 
              console.log('this is profile data',response.data);
              
            } catch (error) {
              console.log(error);
            }
          };

          const handleLogout = async () => {
            try {
              const token = localStorage.getItem('token');
              await fetch('/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
        
              // Remove token from local storage
              localStorage.removeItem('token');
              
              // Redirect to login page
             // history.push('/login');
              history('/login');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          };
        

    return (
        <div>
        <div className="profile-img">
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSilUHTkKNo1pn6hqDZyM9g5RR-g7Ye9YARmQ&s"} alt="Profile" className="profile-picture" />
        <h1>{userProfile.firstname} {userProfile.lastname}</h1>
        <button class="logoutbtn" onClick={handleLogout}>Logout</button>
    </div>
     <div className="profile-details">
        
     <p><span class="bold">Email:</span> {userProfile.email}</p>
     <p><span class="bold">Phone:</span> {userProfile.phoneno}</p>
     <p><span class="bold">Location:</span> {userProfile.location}</p>
     <p><span class="bold">Skills:</span> {userProfile.skills}</p>
                                                                  
 </div>
 <p>{userProfile._id}</p>
 </div>
)
};

export default Profile                