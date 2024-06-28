import React from 'react'
import "./postajob.css";
import { useState } from 'react';
function Postajob() {

    const [formData, setFormData] = useState({
      jobTitle: '',
      companyName: '',
      vacancies:'',
      Salary: '',
      salaryType: 'hourly',
      jobLocation: '',
      jobPostDate: '',
      experienceLevel: 'fresher',
      companyLogo: null,
      employeeType: 'full-time',
      requiredSkills: '',
      jobDescription: '',
      jobRequirement:'',
      jobPostedBy: '',
    });
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
      if (type === 'file') {
        setFormData({ ...formData, [name]: e.target.files[0] });
      } else if (type === 'select-multiple') {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value });
      }
          if (name === 'vacancies' || name === 'Salary') {
        // Remove commas and convert to number
        const salaryValue = parseFloat(value.replace(/,/g, ''));
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: isNaN(salaryValue) ? '' : salaryValue,
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      console.log('Form data:', data);
      
      try {
        const response = await fetch('http://localhost:5000/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      
  
        if (response.ok) {
          alert('Job posted successfully!');
        } else {
          alert('Failed to post job');
        }
        const result = await response.json();
        console.log('Success:', result);
      } catch (error) {
        console.error('Error:', error);
        alert('Error posting job');
      }
    };


  return ( 
    <div className="form-container">
    <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Job Title</label>
                <input type="text" name="jobTitle" className="b" value={formData.jobTitle} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className='postlabel'>Company Name</label>
                <input type="text" name="companyName" className="b" value={formData.companyName} onChange={handleChange} />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Number of vacancies</label>
                <input type="text" name="vacancies" className="b" value={formData.vacancies} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className='postlabel'>Salary</label>
                <input type="text" name="Salary" className="b" value={formData.Salary} onChange={handleChange} />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Salary Type</label>
                <select name="salaryType" className="b" value={formData.salaryType} onChange={handleChange}>
                    <option value="hourly">Hourly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div className="form-group">
                <label className='postlabel'>Job Location</label>
                <input type="text" name="jobLocation" className="b" value={formData.jobLocation} onChange={handleChange} placeholder="Enter job location" />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Job Post</label>
                <input type="date" name="jobPostDate" className="b" value={formData.jobPostDate} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className='postlabel'>Experience Level</label>
                <select name="experienceLevel" className="b" value={formData.experienceLevel} onChange={handleChange}>
                    <option>fresher</option>
                    <option>junior level</option>
                    <option>Mid level</option>
                    <option>Senior level</option>
                </select>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Company Logo</label>
                <input type="file" accept="image/*" className="b" name="companyLogo" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className='postlabel'>Employee Type</label>
                <select name="employeeType" className="b" value={formData.employeeType} onChange={handleChange}>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                </select>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Job Description</label>
                <textarea name="jobDescription" className="b" value={formData.jobDescription} onChange={handleChange} rows="6" placeholder="Enter job description"></textarea>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Job Requirement</label>
                <textarea name="jobRequirement" className="b" value={formData.jobRequirement} onChange={handleChange} rows="6" placeholder="Enter job Requirement"></textarea>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Required Skill Sets</label>
                <textarea name="requiredSkills" className="b" value={formData. requiredSkills} onChange={handleChange} rows="6" placeholder="what are requiredSkills"></textarea>
               
            </div>
        </div>

      

        <div className="form-row">
            <div className="form-group">
                <label className='postlabel'>Job Posted By</label>
                <input type="email" name="jobPostedBy" className="b" value={formData.jobPostedBy} onChange={handleChange} />
            </div>
        </div>

        <div className="form-row">
            <button className="submitbutton">Submit</button>
        </div>
    </form>
</div>   )
}


export default Postajob