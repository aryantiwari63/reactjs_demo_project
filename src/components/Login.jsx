import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { email, password });

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || 'An error occurred during login.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <div className='entryproperty'>
          <label>
            Email
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <hr className='hr'/>
          <label>
            Password
            <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <hr className='hr'/>
        </div>
        <p>Not a member? <Link to="/signup">signup</Link></p>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}

export default Login;
