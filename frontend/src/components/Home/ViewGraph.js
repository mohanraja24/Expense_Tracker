import React, { useState, useMemo, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ViewGraph.css'; 


ChartJS.register(ArcElement, Tooltip, Legend);



const ViewGraph = ({ transactions }) => {
  const [monthSelection, setMonthSelection] = useState("current"); 
  const currentMonth = new Date().getMonth(); 
  const currentYear = new Date().getFullYear(); 

  const lastMonthEnd = new Date(currentYear, currentMonth, 0); 
  const lastMonthStart = new Date(currentYear, currentMonth - 1, 1); 

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

  const expenseData = {};

  filteredTransactions.forEach((trans) => {
    if (trans.transType === 'expense') {
      if (expenseData[trans.category]) {
        expenseData[trans.category] += trans.amount;
      } else {
        expenseData[trans.category] = trans.amount;
      }
    }
  });

  const chartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: 'Expenses by Category',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        data: Object.values(expenseData),
      },
    ],
  };

  if (filteredTransactions.length === 0 || Object.keys(expenseData).length === 0) {
    return <div>No transactions available to display.</div>;
  }

  return (
    <div className="view-graph-container">
      <h2>Expense Distribution by Category</h2>

      <div className="month-selection-dropdown">
        <label htmlFor="month-selection">Select Month:</label>
        <select id="month-selection" value={monthSelection}
          onChange={(e) => setMonthSelection(e.target.value)} >
          <option value="current">Current Month</option>
          <option value="last">Last Month</option>
          <option value="all">All Transactions</option>
        </select>
      </div>

      <Pie 
        data={chartData} 
        options={{ 
          responsive: true, 
          maintainAspectRatio: true, 
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }} 
        className="pie-chart" 
      />
    </div>
  );
};

export default ViewGraph;
