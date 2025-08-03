import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home({ transaction, totalIncome, totalExpense }) {
  return (
    <div className="home">
      <h1 className="title">Budget Tracker</h1>

      <div className="summary">
        <h2 className="income">Total Income: {totalIncome}</h2>
        <h2 className="expense">Total Expense: {totalExpense}</h2>
        <h2 className="balance">Balance: {totalIncome - totalExpense}</h2>
      </div>

      <h1 className="transactions-heading">Transactions</h1>
      {transaction.length == 0 ? (
        <p>No Transactions found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transaction
              .slice(-5)
              .reverse()
              .map((tr, index) => (
                <tr
                  key={index}
                  className={
                    tr.type === "Income" ? "income-row" : "expense-row"
                  }
                >
                  <td>{tr.name}</td>
                  <td>{tr.amount}</td>
                  <td>{tr.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {transaction.length > 5 ? (
        <p className="view-all">
          <Link to="/report">View All →</Link>
        </p>
      ) : null}
    </div>
  );
}
