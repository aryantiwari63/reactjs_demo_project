import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Homesection.css";
import { useNavigate } from 'react-router-dom';
import Applypage from './Applypage';

function Homesections({ jobs }) {
  const [locationFilter, setLocationFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('any');
  const [experienceFilter, setExperienceFilter] = useState('any');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('any');
  const { id } = useParams();
  const [job, setJob] = useState(null);
   
  const navigate = useNavigate();
  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    switch (filterType) {
      case 'location':
        setLocationFilter(value);
        break;
      case 'salary':
        setSalaryFilter(value);
        break;
      case 'experience':
        setExperienceFilter(value);
        break;
      case 'employmentType':
        setEmploymentTypeFilter(value);
        break;
      default:
        break;
    }
  };
 


  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Calculate the indices of the jobs to display for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate the total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Function to handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };





  const filteredJobs = jobs.filter(job => {
    const jobLocation = job.joblocation ? job.joblocation.toLowerCase() : '';
    const jobSalary = job.salarytype ? job.salarytype.toLowerCase() : '';
    const jobExperience = job.jobdescription ? job.jobdescription.toLowerCase() : '';
    const jobEmploymentType = job.jobtitle ? job.jobtitle.toLowerCase() : '';

    const locationMatch = locationFilter === 'all' || jobLocation.includes(locationFilter.toLowerCase());
    const salaryMatch = salaryFilter === 'any' || jobSalary.includes(salaryFilter.toLowerCase());
    const experienceMatch = experienceFilter === 'any' || jobExperience.includes(experienceFilter.toLowerCase());
    const employmentTypeMatch = employmentTypeFilter === 'any' || jobEmploymentType.includes(employmentTypeFilter.toLowerCase());

    return locationMatch && salaryMatch && experienceMatch && employmentTypeMatch;
  });
   
  return (
    <div>
      <h1 className='h1'>Filters</h1>
      <div className='mainsection'>
        <div className="firstsection">
          <div className="inerpart">
            <label className='label'>Location</label>
            <div className="i">
              <label>
                <input type="radio" name="one" value="all" checked={locationFilter === 'all'} onChange={(e) => handleFilterChange(e, 'location')} />
                All
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="one" value="india" checked={locationFilter === 'india'} onChange={(e) => handleFilterChange(e, 'location')} />
                India
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="one" value="london" checked={locationFilter === 'london'} onChange={(e) => handleFilterChange(e, 'location')} />
                London
              </label>
            </div>
          </div>
          <br />
          <div className="inerpart">
            <label className='label'>Salary</label>
            <div className="i">
              <label>
                <input type="radio" name="two" value="any" checked={salaryFilter === 'any'} onChange={(e) => handleFilterChange(e, 'salary')} />
                Any
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="two" value="30k" checked={salaryFilter === '30k'} onChange={(e) => handleFilterChange(e, 'salary')} />
                30k
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="two" value="50k" checked={salaryFilter === '50k'} onChange={( e) => handleFilterChange(e, 'salary')} />
                50k
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="two" value="80k" checked={salaryFilter === '80k'} onChange={(e) => handleFilterChange(e, 'salary')} />
                80k
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="two" value="100000k" checked={salaryFilter === '100000k'} onChange={(e) => handleFilterChange(e, 'salary')} />
                100000k
              </label>
            </div>
          </div>
          <br />
          <div className="inerpart">
            <label className='label'>Work Experience</label>
            <div className="i">
              <label>
                <input type="radio" name="three" value="any" checked={experienceFilter === 'any'} onChange={(e) => handleFilterChange(e, 'experience')} />
                Any experience
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="three" value="internship" checked={experienceFilter === 'internship'} onChange={(e) => handleFilterChange(e, 'experience')} />
                Internship
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="three" value="remote" checked={experienceFilter === 'remote'} onChange={(e) => handleFilterChange(e, 'experience')} />
                Work remotely
              </label>
            </div>
          </div>
          <br />
          <div className="inerpart">
            <label className='label'>Type of Employment</label>
            <div className="i">
              <label>
                <input type="radio" name="four" value="any" checked={employmentTypeFilter === 'any'} onChange={(e) => handleFilterChange(e, 'employmentType')} />
                Any
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="four" value="full-time" checked={employmentTypeFilter === 'full-time'} onChange={(e) => handleFilterChange(e, 'employmentType')} />
                Full time
              </label>
            </div>
            <div className="i">
              <label>
                <input type="radio" name="four" value="part-time" checked={employmentTypeFilter === 'part-time'} onChange={(e) => handleFilterChange(e, 'employmentType')} />
                Part time
              </label>
            </div>
          </div>
        </div>
<div className='secondsection'>
{currentJobs.map((job, index) => (
  <div key={index} className='card'>
    <div className='img'>
      <img src={"data:image/png;base64,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"} alt="Company Logo" />
    </div>
    <div className='carddetail'>
      <p>{job.companyname}</p>
      <div className="inercardpart">
      <p>{job.jobtitle}</p>
      <p>{job.salary}</p> 
      </div>
      <div className="inercardpart">
       <p>{job.joblocation}</p>
     
        <p>{job.experiencelevel}</p>
      </div>
      <br/>
      <p  className='jobdescription'>{job.jobdescription}</p>
    </div>

<a href={`/Applypage/${job._id}`}>
    <button className='applybutton'>Apply</button>
</a>
   
  </div>
))}
<div>
<button class="pagecontrol" onClick={handlePrevPage}>{currentPage}</button>
<button class="pagecontrol" onClick={handleNextPage}>{currentPage + 1}</button>
</div>
</div>
</div>
    </div>
  );
}

export default Homesections; 
  
  
  
  
  
  