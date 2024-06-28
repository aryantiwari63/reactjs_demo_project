import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import Homesections from './Homesections';
import axios from 'axios';

function Home() {
  
  const [jobprofileFilter, setjobprofileFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchJobs();
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/jobs');
      console.log('Fetched jobs:', response.data); 
      setJobs(response.data);
      setFilteredJobs(response.data); 
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
 
  const handleSearch = () => {
    const updatedFilteredJobs = jobs.filter(job => {
      const matchesSearchTerm = jobprofileFilter
        ? job.jobtitle && job.jobtitle.toLowerCase().includes(jobprofileFilter.toLowerCase())
        : true;

      return matchesSearchTerm;
    });

    console.log('Filtered jobs:', updatedFilteredJobs); // Debugging line
    setFilteredJobs(updatedFilteredJobs); 
  };

  return (
    <div>
      <div className='homemain flex flex-col gap-6 ml-14 mt-16 h-40'>
        <div className='heading'>
          <h1 className='text-xl'>Find your <span>new job</span> today</h1><br />
          <p className='headingtext'>Thousands of jobs in the computer science & engineering sector are waiting for you</p>
        </div>
     <div className='flex'>
          <div className='searchpart'>
            <span>🔍</span>
            <input
              type="text"
              placeholder="What profile are you looking for?"
              value={jobprofileFilter}
              onChange={(e) => setjobprofileFilter(e.target.value)}
            />
          </div>
          <div className='searchpart'>
            <span className="c"><FontAwesomeIcon icon={faLocation} /></span>
            <input
              type="text"
              placeholder="Location"
              // value={locationFilter}
              // onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <button className='text-white bg-blue-700' onClick={handleSearch}>Search</button>
        </div>
      </div>
      <Homesections jobs={filteredJobs} />
    </div>
  );
}

export default Home;
