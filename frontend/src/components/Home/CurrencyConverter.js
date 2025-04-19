import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurencyConverter.css';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch(error => {
        console.error("Error fetching currency data:", error);
      });
  }, []);

  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        setResult(amount * rate);
      })
      .catch(error => {
        console.error("Error converting currency:", error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span> to </span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button onClick={convertCurrency}>Convert</button>
      </div>
      {result !== null && (
        <h3>Converted Amount: {result.toFixed(2)} {toCurrency}</h3>
      )}
    </div>
  );
};

export default CurrencyConverter;
