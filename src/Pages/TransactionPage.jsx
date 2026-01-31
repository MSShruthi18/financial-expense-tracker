import React, { useState } from "react";
import "./App.css";
import { Pie, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const TransactionPage = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
 
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [records, setRecords] = useState(() =>
    JSON.parse(localStorage.getItem("transactionRecords")) || []
  );

  // TOTALS
const totalIncome = records
  .filter(r => r.type === "income")
  .reduce((s, r) => s + Number(r.amount), 0);

const totalExpense = records
  .filter(r => r.type === "expense")
  .reduce((s, r) => s + Number(r.amount), 0);


    if (type === "expense" && totalIncome === 0) {
  setMessage("⚠️ Warning: No income added yet");
}

  // ADD RECORD
  const handleAdd = () => {
    if (!amount || amount <= 0) {
      setMessage("❌ Amount must be positive");
      return;
    }
    if (!description.trim()) {
      setMessage("❌ Description required");
      return;
    }
    if (!date) {
      setMessage("❌ Please select date");
      return;
    }
    if (type === "expense" && amount > totalIncome) {
      setMessage("❌ Expense cannot exceed income");
      return;
    }


 const newRecord = {
  amount: Number(amount),   // 🔥 important
  description,
  type,
  date
};


    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem("transactionRecords", JSON.stringify(updated));

    setAmount("");
    setDescription("");
    setDate("");
    setMessage("✅ Transaction Added");
  };

  // PIE CHART
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  // BAR CHART (monthly)
  const months = {};
  records.forEach(r => {
    const m = new Date(r.date).toLocaleString("default", { month: "short" });
    months[m] = (months[m] || 0) + r.amount * (r.type === "expense" ? -1 : 1);
  });

  const barData = {
    labels: Object.keys(months),
    datasets: [
      {
        label: "Net Balance",
        data: Object.values(months),
        backgroundColor: "#6366f1",
      },
    ],
  };

const exportCSV = () => {
  const csv =
    "Amount,Description,Type\n" +
    records.map(r =>
      `${r.amount},${r.description},${r.type}`
    ).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
};


  return (
    <div className="transaction-page">
      <h1>💳 Financial Tracker</h1>

      <div className="transaction-container">
        {/* FORM */}
        <div className="transaction-card">
          <h3>Add Transaction</h3>

          <input type="number" placeholder="Amount" value={amount}
            onChange={e => setAmount(e.target.value)} />

          <input type="text" placeholder="Description" value={description}
            onChange={e => setDescription(e.target.value)} />


          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
         

          <input type="date" value={date} onChange={e => setDate(e.target.value)} />

          {message && <p className="message">{message}</p>}

          <button onClick={handleAdd}>➕ Add</button>
          <button onClick={exportCSV}>📤 Export CSV</button>
          <button className="secondary" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>

        {/* CHARTS */}
        <div className="chart-card">
          <h3>Overview</h3>
          <Pie data={pieData} />
          <p className="income">Income ₹{totalIncome}</p>
          <p className="expense">Expense ₹{totalExpense}</p>
        </div>

        <div className="chart-card">
          <h3>Monthly Balance</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
