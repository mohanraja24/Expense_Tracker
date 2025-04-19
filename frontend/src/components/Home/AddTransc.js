import React, { useState } from "react";
import "./AddTransc.css"; 

const AddTransc = ({ setToggle, AddTransactions }) => {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [transType, setTransType] = useState("expense");
  const [category, setCategory] = useState("Grocery");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); 

  const AddTransactionData = () => {
    alert("Transaction added");
    console.log("Button clicked, function called");
    if (!details || amount <= 0) return;
  
    const transactionData = {
      amount: Number(amount),
      details,
      transType,
      category: transType === "expense" ? category : null,
      date,
      userId: "userId", 
    };
  
    fetch("http://localhost:5000/addTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "Transaction added successfully") {
          AddTransactions(transactionData);
          setToggle();
          setAmount("");
          setDetails("");
          setTransType("expense");
          setCategory("Grocery");
          setDate(new Date().toISOString().split("T")[0]); 
        } else {
          console.error("Failed to add transaction");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <input
        className="input"
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <select
        className="select"
        value={transType}
        onChange={(e) => setTransType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      
      {transType === "expense" && (
        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Grocery">Grocery</option>
          <option value="Medical">Medical</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
      )}

      <input
        className="input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      
      <button className="submit-btn" onClick={AddTransactionData}>
        Add transaction
      </button>
    </div>
  );
};

export default AddTransc;
