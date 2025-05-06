import React, { useState } from "react";
import "./App.css";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

const TransactionPage = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(""); // Description input
  const [category, setCategory] = useState("income"); // 'income' or 'expense'
  const [records, setRecords] = useState(() => {
    // Load records from localStorage or start with an empty array
    const storedRecords = JSON.parse(localStorage.getItem("transactionRecords"));
    return storedRecords || [];
  });
  const navigate = useNavigate(); // Navigation hook

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
//function to add record
  const handleAddRecord = () => {
    if (amount > 0 && description.trim() !== "") {
      const newRecord = { category, amount: parseFloat(amount), description };
      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      localStorage.setItem("transactionRecords", JSON.stringify(updatedRecords)); // Save to localStorage
      setAmount(0);
      setDescription(""); // Reset description field after adding
    } else {
      alert("Please enter a valid amount and description.");
    }
  };

  // Calculate totals for income and expenses
  const totalIncome = records.filter(record => record.category === "income").reduce((acc, record) => acc + record.amount, 0);
  const totalExpense = records.filter(record => record.category === "expense").reduce((acc, record) => acc + record.amount, 0);

  // Pie chart data
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["green", "red"],
        hoverOffset: 4,
      },
    ],
  };

  // Pie chart options with reduced size
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    aspectRatio: 1, // Ensures the chart is a square
  };

  const handleViewTransactions = () => {
    navigate("/Viewtransaction"); // Navigate to Viewtransaction page
  };

  return (
    <div className="border">
    <div className="transactionbody">
      <div >
        <center><h1>Financial Tracker</h1></center>

        
          <h3>Enter your data</h3>
          
            <label>Amount: </label><br></br>
            <input type="number" value={amount} onChange={handleAmountChange} />
          
          <br></br><br></br>

          
            <label>Description: </label><br></br>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter description (e.g., Salary, Groceries)"
            />
          
          <br></br><br></br>

          
            <label>Category: </label><br></br>
            <select value={category} onChange={handleCategoryChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          <br></br><br></br>

          <button onClick={handleAddRecord}>ADD RECORD</button><br></br><br></br>
          <button onClick={handleViewTransactions}>VIEW TRANSACTIONS</button><br></br><br></br>
          <button onClick={() => navigate(-1)}> BACK TO HOME</button> {/* Go back to previous page */}
        </div>

        <div>
          <h3>Graphical Representation</h3>
          <div style={{ position: 'relative', height: '300px', width: '300px' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div><br></br>

      
    </div>
    </div>
  );
};

export default TransactionPage;
