import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
import j from '../images/j1.jpg'
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div>
          <nav className='flex items-center justify-between'>
            <div className='ml-14'><img className="logo" src={j}/>JOB PORTAL</div>
            <div>
              <ul className='flex'>
                <li className='mr-10'><Link to="/">Home</Link></li>
                <li className='mr-10'><Link to="/Myjob">My Jobs</Link></li>
                <li className='mr-10'><Link to="postajob">Post a Job</Link></li>
                <li><Link to="signup">Signup</Link></li>
              </ul>
            </div>
            <div className='mr-2'>
               <FontAwesomeIcon icon={faUser} />
               <p><Link to="/profile">profile</Link></p>
            </div>
          </nav>
    </div>
  )
}

export default Navbar
