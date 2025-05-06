import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'; // Import your Login component
import SignInpage from './Pages/SignInpage'; // Import your SignInpage component
import MainPage from './Pages/MainPage'; // Import your Dashboard component (for redirection after login)
import TransactionPage from './Pages/TransactionPage';
import Viewtransaction from './Pages/Viewtransaction';
import Managetransaction from './Pages/Managetransaction';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define main routes */}
        <Route path="/" element={<SignInpage />} /> {/* Landing page / Sign-in */}
        <Route path="/login" element={<Login />} /> {/* Main login page */}
        <Route path="/MainPage" element={<MainPage />} /> {/* After login redirect */}
        <Route path="/TransactionPage" element={<TransactionPage />} /> {/* Transaction Page */}
        <Route path="/Viewtransaction" element={<Viewtransaction />} /> {/* View Transaction */}
        <Route path="/Managetransaction" element={<Managetransaction />} /> {/* Manage Transaction */}
        
        {/* 404 Page Not Found Route */}
        <Route path="*" element={<PageNotFound />} /> {/* Wildcard for unmatched routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
