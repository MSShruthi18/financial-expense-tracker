import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.some((user) => user.username === username)) {
      alert('Username already exists!');
      return;
    }

    // Add the new user to the array
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/Login'); // Redirect to the login page after sign-up
  };

  return (
    <div className="App">
      <center>
        <form className="loginform" onSubmit={(e) => e.preventDefault()}>
          <br />
          <h3>SIGN UP FORM</h3>
          <h4>Welcome! Create a new account</h4>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="textbox"
            aria-label="Username"
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="textbox"
            aria-label="Password"
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Handle confirm password change
            id="textbox"
            aria-label="Confirm Password"
          />
          <br />
          <br />
          <button type="button" onClick={handleSignUp} id="signinButton">Sign Up</button><br /><br />
          {/* Link to Login page */}
          <h5>
            Already have an Account? <Link to="/Login">LOGIN</Link>
          </h5>
        </form>
      </center>
    </div>
  );
}
