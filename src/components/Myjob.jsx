import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './Myjob.css';
import axios from 'axios';
function Nojobs() {
   
  /*const navigate = useNavigate();
  const { id } = useParams();
  const [applyjob, updateapplyjob] = useState(" ");
  
  const fetchJob = async () => {
    try {
      console.log(`Fetching job with id: ${id}`);
      const response = await axios.get(`http://localhost:8000/api/myjob/${id}`);
      console.log("Fetched job:", response.data);
      updateapplyjob(response.data);
    } catch (error) {
      console.error('Error fetching  myjob:', error);
    }
  };
  useEffect(()=>{
    fetchJob();
  }, [id]);
*/
  return (

    <div>
      <h1 className='h1class'>COMING SOON</h1>
      
    </div>
  )
}

export default Nojobs