import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Viewtransaction() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("transactionRecords")) || [];

    // sort by date (old → new) for running balance
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    // calculate running balance
    let balance = 0;
    const withBalance = data.map((t) => {
      balance =
        t.type === "income"
          ? balance + t.amount
          : balance - t.amount;
      return { ...t, balance };
    });

    setTransactions(withBalance.reverse()); // latest on top
  }, []);

  return (
    <div className="statement-page">
      <h1>Account Statement</h1>

      {/* HEADER SUMMARY */}
      <div className="statement-header">
        <div>
          <span>Total Balance</span>
          <h2>
            ₹
            {transactions.length > 0
              ? transactions[0].balance
              : 0}
          </h2>
        </div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      {/* TABLE HEADER */}
      <div className="statement-table header">
        <div>Date</div>
      
        <div>Type</div>
        <div></div>
        <div>Amount</div>
        <div>Balance</div>
      </div>

      {/* TRANSACTIONS */}
      {transactions.length === 0 ? (
        <p className="empty">No transactions found</p>
      ) : (
        transactions.map((t, index) => (
          <div key={index} className="statement-table row">
            <div>{t.date}</div>
        <div></div>
            <div>
              <span
                className={
                  t.type === "income"
                    ? "badge credit"
                    : "badge debit"
                }
              >
                {t.type === "income" ? "CREDIT" : "DEBIT"}
              </span>
            </div>
            <div
              className={
                t.type === "income"
                  ? "amount credit"
                  : "amount debit"
              }
            >
              {t.type === "income" ? "+" : "-"}₹{t.amount}
            </div>
            <div className="balance">₹{t.balance}</div>
          </div>
        ))
      )}
    </div>
  );
}
