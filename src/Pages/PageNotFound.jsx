import React from 'react';
import { Link } from 'react-router-dom'; // Link to redirect users back to the homepage

const PageNotFound = () => {
  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
   
      <div style={styles.content}>
        <h1 style={styles.emoji}>🚫</h1> {/* Barrier emoji above the title */}
        <h1 style={styles.title}>Oops! Something went wrong.</h1>
        <p style={styles.message}>We apologize for the inconvenience. Please try refreshing the page.</p>
        <div style={styles.buttons}>
          <button style={styles.refreshButton} onClick={handleRefresh}>
            Refresh Page
          </button>
          <p style={styles.message}>
            Or, go back to the <Link to="/" style={styles.link}>home page</Link>.
          </p>
        </div>
      </div>
  
  );
};

// Modern, clean styles for the error page
const styles = {

  content: {
    textAlign: 'center',
    backgroundColor: '#fff', // White background for the content box
    padding: '40px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '450px',
    width: '100%',
  },
  emoji: {
    fontSize: '4rem', // Larger size for the barrier emoji
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.7rem', // Slightly larger title for emphasis
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.6', // Better spacing between lines for readability
  },
  buttons: {
    marginTop: '30px',
  },
  refreshButton: {
    padding: '12px 30px',
    fontSize: '1.1rem', // Slightly larger button text
    backgroundColor: '#007BFF', // Blue color for button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginBottom: '15px',
  },
  refreshButtonHover: {
    backgroundColor: '#0056b3', // Darker blue for hover
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default PageNotFound;
