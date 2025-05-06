import "./App.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation

export default function Login() {
  const navigate = useNavigate(); // navigate for redirection

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();//prevents occurance of default action

    // Reset error message before validation
    setErrorMessage('');

    // Validate input fields (check if username or password is empty)
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Debugging: log the stored users and entered values
    console.log("Stored Users:", storedUsers);
    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    // Check if entered data matches any stored credentials
    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setErrorMessage(''); // Clear error message
      navigate('/MainPage'); // If successful, navigate to the main page
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="App">
      <center>
        <form className="loginform" onSubmit={handleSubmit}>
          <br />
          <h3>LOGIN FORM</h3>
          <h4>Welcome back, Please login with your Personal Info</h4>

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
          <button type="submit" id="loginbutton">Login</button>

          {/* Link to SignIn page */}
          <h5>
            Don't have an Account ? <Link to="/">SIGN IN</Link>
          </h5>

          {/* Display error message if any */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </center>
    </div>
  );
}
