import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Managetransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("transactionRecords")) || [];
    setTransactions(stored);
  }, []);

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
    localStorage.setItem("transactionRecords", JSON.stringify(updated));
  };

 const filteredTransactions = transactions.filter((t) => {
  const matchesType =
    filter === "all" || t.type?.toLowerCase() === filter;

  const matchesSearch = t.description
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchesType && matchesSearch;
});

const totalIncome = transactions
  .filter((t) => t.type?.toLowerCase() === "income")
  .reduce((sum, t) => sum + Number(t.amount || 0), 0);

const totalExpense = transactions
  .filter((t) => t.type?.toLowerCase() === "expense")
  .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return (
    <div className="container">
      <div className="content-wrapper">
       <center><h1 >Manage Transactions</h1></center> 

        {/* Summary Cards */}
        <div className="summary">
          <div className="card income">
            <h3>Total Income</h3>
            <p>₹ {totalIncome}</p>
          </div>
          <div className="card expense">
            <h3>Total Expense</h3>
            <p>₹ {totalExpense}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Table */}
        <table className="viewtable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t, index) => (
                <tr key={index}>
                  <td
                    style={{
                      color: t.category === "income" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {t.type.toUpperCase()}
                  </td>
                  <td>₹ {t.amount}</td>
                  <td>{t.description}</td>
                  <td>
                    <button
                      className="deletebutton"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <br />
        <button className="backbtn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Managetransaction;
