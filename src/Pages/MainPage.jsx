import "./App.css";
import React from 'react';
import { Link } from 'react-router-dom';

function MainPage()
 {
 
  return (
    <div style={containerStyle}>
      <h1>Welcome to Financial Tracker</h1>
      <p>Track your expenses and manage your finances easily!</p>

      <div style={buttonContainerStyle}>
        <Link to="/TransactionPage" style={buttonStyle}>
          Add New Transaction
        </Link>
        <Link to="/Viewtransaction" style={buttonStyle}>
          View All Transactions
        </Link>
        <br></br>
        <Link to="/Managetransaction" style={buttonStyle}>
          Manage All Transactions
        </Link>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0px',
  padding: '40px',
  backgroundColor: 'lightblue',
  borderRadius: '8px',
  boxShadow: '0 8px 12px rgba(54, 49, 49, 0.1)',
  textAlign: 'center',
 
};

const buttonContainerStyle = {
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const buttonStyle = {
  textDecoration: 'none',//underline else
  backgroundColor: 'green',
  color: 'white',
  padding: '15px 30px',
  borderRadius: '5px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',

};

export default MainPage;

