import "./App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate(); // ✅ correctly defined

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1 className="title">💰 Financial Expense Tracker</h1>

      <p className="subtitle">
        Track expenses, analyze spending, and stay financially smart.
      </p>

      <div className="card-container">
        <Link to="/TransactionPage" className="card add">
          ➕
          <h3>Add Transaction</h3>
          <p>Record your daily expenses</p>
        </Link>

        <Link to="/Viewtransaction" className="card view">
          📊
          <h3>View Transactions</h3>
          <p>See all your expense history</p>
        </Link>

        <Link to="/Managetransaction" className="card manage">
          🛠️
          <h3>Manage Transactions</h3>
          <p>Edit or delete records</p>
        </Link>
      </div>
<br></br><br></br>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
