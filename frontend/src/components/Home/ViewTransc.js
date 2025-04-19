import React, { useState, useEffect, useMemo } from "react";
import axios from "axios"; 
import "./ViewTransc.css";

function ViewTransc() {
  const [transactions, setTransactions] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [monthSelection, setMonthSelection] = useState("current"); 

  const currentMonth = new Date().getMonth(); 
  const currentYear = new Date().getFullYear(); 

  const lastMonthEnd = new Date(currentYear, currentMonth, 0); 
  const lastMonthStart = new Date(currentYear, currentMonth - 1, 1);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/transactions");
        setTransactions(response.data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); 

  const filterTransactionsByMonth = (transactions) => {
    switch (monthSelection) {
      case "current":
        return transactions.filter((trans) => {
          const transactionDate = new Date(trans.date);
          return (
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
          );
        });
      case "last":
        return transactions.filter((trans) => {
          const transactionDate = new Date(trans.date);
          return transactionDate >= lastMonthStart && transactionDate <= lastMonthEnd;
        });
      case "all":
        return transactions; 
      default:
        return transactions;
    }
  };

  const filteredTransactions = filterTransactionsByMonth(transactions);

  const incomeTransactions = filteredTransactions.filter(
    (trans) => trans.transType === "income"
  );
  const expenseTransactions = filteredTransactions.filter(
    (trans) => trans.transType === "expense"
  );

  const currentMonthIncome = useMemo(
    () => incomeTransactions.reduce((sum, trans) => sum + trans.amount, 0),
    [incomeTransactions]
  );

  const currentMonthExpense = useMemo(
    () => expenseTransactions.reduce((sum, trans) => sum + trans.amount, 0),
    [expenseTransactions]
  );

  const totalIncome = useMemo(
    () => transactions.filter((trans) => trans.transType === "income")
      .reduce((sum, trans) => sum + trans.amount, 0),
    [transactions]
  );
  const totalExpense = useMemo(
    () => transactions.filter((trans) => trans.transType === "expense")
      .reduce((sum, trans) => sum + trans.amount, 0),
    [transactions]
  );
  const balance = useMemo(() => totalIncome - totalExpense, [totalIncome, totalExpense]);

  const lastMonthIncome = useMemo(
    () => transactions.filter((trans) => {
      const transactionDate = new Date(trans.date);
      return transactionDate >= lastMonthStart && transactionDate <= lastMonthEnd && trans.transType === "income";
    })
    .reduce((sum, trans) => sum + trans.amount, 0),
    [transactions]
  );

  const lastMonthExpense = useMemo(
    () => transactions.filter((trans) => {
      const transactionDate = new Date(trans.date);
      return transactionDate >= lastMonthStart && transactionDate <= lastMonthEnd && trans.transType === "expense";
    })
    .reduce((sum, trans) => sum + trans.amount, 0),
    [transactions]
  );

  const lastMonthBalance = useMemo(
    () => lastMonthIncome - lastMonthExpense,
    [lastMonthIncome, lastMonthExpense]
  );

  const categories = [
    ...new Set(expenseTransactions.map((trans) => trans.category)),
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const filteredExpenses = expenseTransactions.filter(
    (trans) =>
      selectedCategories.length === 0 || selectedCategories.includes(trans.category)
  );

  return (
    <div className="view-transc-container">
      <h2>Transaction Summary</h2>

      <div className="balance">
        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="balance-section">
            <div>
              <h3>Current Month Balance:</h3>
              <p><strong>Balance:</strong> ₹{balance}</p>
            </div>
            <div>
              <h3>Last Month's Data:</h3>
              <p><strong>Income:</strong> ₹{lastMonthIncome}</p>
              <p><strong>Expenses:</strong> ₹{lastMonthExpense}</p>
              <p><strong>Balance:</strong> ₹{lastMonthBalance}</p>
            </div>
          </div>
        )}
      </div>

      <div className="month-selection-dropdown">
        <label htmlFor="month-selection"></label>
        <select
          id="month-selection"
          value={monthSelection}
          onChange={(e) => setMonthSelection(e.target.value)}
        >
          <option value="current">Current Month</option>
          <option value="last">Last Month</option>
          <option value="all">All Transactions</option>
        </select>
      </div>

      <div className="transaction-sections">
        {/* Income Section */}
        <div className="income-section">
          <h3>Income Transactions</h3>
          {incomeTransactions.length > 0 ? (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Amount (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {incomeTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.details}</td>
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No income transactions available for this month.</p>
          )}
        </div>

        {/* Expense Section */}
        <div className="expense-section">
          <h3>Filter Expenses by Category</h3>
          <div className="category-filters">
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          <h3>Expense Transactions</h3>
          {filteredExpenses.length > 0 ? (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Amount (₹)</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.details}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.category}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No expense transactions available for the selected categories this month.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTransc;
