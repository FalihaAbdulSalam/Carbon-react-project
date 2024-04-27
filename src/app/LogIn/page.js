"use client"
import Link from 'next/link';
import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Email:', email);
      console.log('Password:', password);
      setEmail('');
      setPassword('');
      window.location.href = "/home";
    } else {
      setErrorMessage('Please provide both email and password.');
    }
  };

  return (
    <div className='login-page'> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
