import React, { useEffect, useState } from 'react';
import './App.css';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ViewTransc from './components/Home/ViewTransc';
import AddTransc from './components/Home/AddTransc';
import ViewGraph from './components/Home/ViewGraph';
import Header from "./components/Header/Header";
import CurrencyConverter from './components/Home/CurrencyConverter';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/transactions"); 
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions(); 
  }, []);

  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />}>
            <Route
              path="addTrans"
              element={<AddTransc setToggle={() => {}} AddTransactions={addTransaction} />}
            />
            <Route
              path="viewTrans"
              element={<ViewTransc transactions={transactions} />}
            />
            <Route
              path="currencyconverter"
              element={<CurrencyConverter/>}
            />
            <Route
              path="viewGraph"
              element={<ViewGraph transactions={transactions} />}
            />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
