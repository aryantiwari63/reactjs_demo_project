import React, { useState, useEffect, } from 'react';
import "./Applypage.css";
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { useProfileContext } from '../Context';    context api

function Applypage(props) {
  //const { userProfile } = useProfileContext();     context api
const navigate = useNavigate();
const { id } = useParams();
const [singlejob, updatesinglejob] = useState(" ");

const [formData, setFormData] = useState({
  fullname: '',
  email: '',
//  resume: null
});

const fetchJob = async () => {
  try {
    console.log(`Fetching job with id: ${id}`);
    const response = await axios.get(`http://localhost:8000/api/Applypage/${id}`);
    console.log("Fetched job:", response.data);
    updatesinglejob(response.data);
  } catch (error) {
    console.error('Error fetching job on applypage:', error);
  }
};


const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'resume') {
    setFormData({ ...formData, file: files[0] });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

const HandleSubmit = async (e) => {
  e.preventDefault();

  /*const data = new FormData();
  data.append('fullname', formData.fullname);
  data.append('email', formData.email);
  //data.append('resume', formData.file);*/

  try {
    const response = await fetch(`http://localhost:8000/api/Applypage/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(formData)
    });
    const result = await response.json();
    console.log("apply user", result);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

useEffect(()=>{
  fetchJob();
}, [id]);

  return (
    <div>
    
      <h1 className='applyhere'>Apply Here For</h1>
      <h1 className='jobtitle'>{singlejob.jobtitle}</h1>
      <div className='applycontent'>
      <p className='applyheading'>Job Description</p>
      <p className='contentdetail'>{singlejob.jobdescription}</p>
      </div>
      <div  className='applycontent'>
        <p className='applyheading'>Job Responsiblities</p>
        <p className='contentdetail'>Develop high-quality software design and architecture
          Identify, prioritize, and execute tasks in the software development life cycle
          Develop tools and applications by producing clean, efficient code
          Automate tasks through appropriate tools and scripting
          Review and debug code
          Perform validation and verification testing
          Collaborate with internal teams and stakeholders to fix and improve products
          Document development phases and monitor systems
          Ensure software is up-to-date with the latest technologies</p>
      </div>
      <div  className='applycontent'>
        <p className='applyheading'>job requirements</p>
        <p className='contentdetail'>{singlejob.requiredSkills}</p>
      </div>

      <form className='form' onSubmit={HandleSubmit}>
    
      <label>Full-Name</label>
      <input type="text" name="fullname" value={formData.fullname} onChange={handleChange}/>
      <label>Email</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange}/>
      <div className='uploadresume'>
     {/* <label for="resume">Upload Resume</label>
      <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange}/>*/}
      <button className='applybutton'>submit</button>
     
    </div>
    </form>
    <p>{props.profiledata._id}</p>
    {/*<p>{userProfile.email}</p>*/}
       </div>
       
  );
}

export default Applypage;