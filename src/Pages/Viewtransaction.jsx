import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Viewtransaction = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const navigate = useNavigate();

  // Load records from localStorage
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("transactionRecords")) || [];
    setFilteredRecords(storedRecords);
  }, []);

  // Filter records based on the selected filter and search query
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("transactionRecords")) || [];
    const newFilteredRecords = storedRecords.filter((record) => {
      if (filter === "all") return true;
      if (filter === "income" && record.category === "income") return true;
      if (filter === "expense" && record.category === "expense") return true;
      if (filter === "description" && record.description.toLowerCase().includes(search.toLowerCase())) return true;
      if (filter === "amount" && record.amount.toString().includes(search)) return true;
      return false;
    });
    setFilteredRecords(newFilteredRecords);
  }, [filter, search]); // Re-run when filter or search changes

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1>Transaction Records</h1>

        <div>
          <label>Filter by: </label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="description">Description</option>
            <option value="amount">Amount</option>
          </select>
        </div><br></br>

        {filter === "description" || filter === "amount" ? (
          <div>
            <label>Search: </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={filter === "description" ? "Enter description to search" : "Enter amount to search"}
            />
          </div>
        ) : null}
        <br></br>

        {/* Table of filtered records */}
        <table border="1" cellPadding={"5"} cellSpacing={"3"} className="viewtable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="3">No records found</td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.category === "income" ? "Income" : "Expense"}</td>
                  <td>${record.amount}</td>
                  <td>{record.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
<br></br><br></br>
        <center><button onClick={() => navigate(-1)}>Go Back</button> {/* Go back to previous page */}</center>
      </div>
    </div>
  );
};

export default Viewtransaction;
