import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Managetransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // Load transactions from localStorage
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactionRecords")) || [];
    setTransactions(storedTransactions);
  }, []);

  // Function to handle deleting a transaction
  const handleDelete = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1); // Remove the record at the given index
    setTransactions(updatedTransactions); // Update the state

    // Update localStorage
    localStorage.setItem("transactionRecords", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1>Manage Transactions</h1>

        {/* Table of transactions with delete functionality */}
        <table className="viewtable"  border="1" cellPadding={"5"} cellSpacing={"3"}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4">No transactions available</td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.category === "income" ? "Income" : "Expense"}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>
                    {/* Show delete button for every transaction */}
                    <center><button className="deletebutton" onClick={() => handleDelete(index)} style={{ backgroundColor: "red", color: "white" }}>
                      Delete
                    </button></center>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
<br></br><br></br>
        <button onClick={() => navigate(-1)}>Go Back</button> {/* Go back to the Main page */}
      </div>
    </div>
  );
};

export default Managetransaction;
