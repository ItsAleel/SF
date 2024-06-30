import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hours, setHours] = useState(0);
  const [payRate, setPayRate] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);

  const [bills, setBills] = useState([]);
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState(0);
  const [billFrequency, setBillFrequency] = useState('Monthly');

  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [yearlyExpenses, setYearlyExpenses] = useState(0);
  const [oneTimeExpenses, setOneTimeExpenses] = useState(0);

  const calculateIncome = () => {
    const weekly = hours * payRate;
    const monthly = weekly * 4.33;
    const yearly = weekly * 52;
    setWeeklyIncome(weekly);
    setMonthlyIncome(monthly);
    setYearlyIncome(yearly);
  };

  const addBill = () => {
    if (billName && billAmount > 0) {
      setBills([...bills, { name: billName, amount: billAmount, frequency: billFrequency }]);
      setBillName('');
      setBillAmount(0);
    }
  };

  const calculateExpenses = () => {
    const monthlyTotal = bills.reduce(
      (total, bill) => total + (bill.frequency === 'Monthly' ? bill.amount : 0),
      0
    );
    const yearlyTotal = bills.reduce(
      (total, bill) => total + (bill.frequency === 'Yearly' ? bill.amount : 0),
      0
    );
    const oneTimeTotal = bills.reduce(
      (total, bill) => total + (bill.frequency === 'One-time' ? bill.amount : 0),
      0
    );

    setMonthlyExpenses(monthlyTotal);
    setYearlyExpenses(yearlyTotal);
    setOneTimeExpenses(oneTimeTotal);
  };

  useEffect(() => {
    calculateIncome();
    calculateExpenses();
  }, [hours, payRate, bills]);

  return (
    <div className="App">
      <h1>Finance Tracker</h1>
      <div className="tab-container">
        <div className="tab">
          <h2>Income</h2>
          <div className="input-group">
            <label>Hours per week:</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              min="0"
              max="168"
            />
          </div>
          <div className="input-group">
            <label>Hourly pay rate:</label>
            <input
              type="number"
              value={payRate}
              onChange={(e) => setPayRate(Number(e.target.value))}
              min="0"
              max="1000"
              step="0.01"
            />
          </div>
          <div className="output-group">
            <p>Weekly Income: ${weeklyIncome.toFixed(2)}</p>
            <p>Monthly Income: ${monthlyIncome.toFixed(2)}</p>
            <p>Yearly Income: ${yearlyIncome.toFixed(2)}</p>
          </div>
        </div>

        <div className="tab">
          <h2>Bills</h2>
          <div className="input-group">
            <label>Bill Name:</label>
            <input
              type="text"
              value={billName}
              onChange={(e) => setBillName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Amount:</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              min="0"
              max="10000"
              step="0.01"
            />
          </div>
          <div className="input-group">
            <label>Frequency:</label>
            <select
              value={billFrequency}
              onChange={(e) => setBillFrequency(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="One-time">One-time</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <button onClick={addBill}>Add Bill</button>

          <ul className="bill-list">
            {bills.map((bill, index) => (
              <li key={index}>
                {bill.name}: ${bill.amount.toFixed(2)} ({bill.frequency})
              </li>
            ))}
          </ul>

          <div className="output-group">
            <p>Monthly Expenses: ${monthlyExpenses.toFixed(2)}</p>
            <p>Yearly Expenses: ${yearlyExpenses.toFixed(2)}</p>
            <p>One-time Expenses: ${oneTimeExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
