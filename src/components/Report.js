import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import "./ReportTab.css";
export default function Report({
  totalIncome,
  totalExpense,
  highestIncome,
  highestExpense,
  totalTransactions,
  averageAmount,
  transaction,
  incomeTransactions,
  expenseTransactions,
}) {
  const [filterValue, setFilterValue] = useState("");
  const incomePercentage = (
    (totalIncome / (totalIncome + totalExpense)) *
    100
  ).toFixed(2);
  const expensePercentage = (
    (totalExpense / (totalIncome + totalExpense)) *
    100
  ).toFixed(2);

  const transactionData = [
    { name: "Income", value: parseFloat(incomePercentage) },
    { name: "Expense", value: parseFloat(expensePercentage) },
  ];

  const COLORS = ["#00C49F", "#FF8042"];
  const filteredData =
    filterValue === "Income"
      ? incomeTransactions
      : filterValue === "Expense"
      ? expenseTransactions
      : [];

  return (
    <div className="report-container">
      <h1 className="report-title">Report</h1>
      {transaction.length > 0 ? (
        <div className="chart-section">
          <h2 className="chart-title">Income vs Expense</h2>
          <PieChart
            width={400}
            height={400}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <Pie
              data={transactionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              label
            >
              {transactionData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      ) : null}
      <div className="report-stats-grid">
        <div className="stat-box">
          <h4>Total Transactions</h4>
          <p>{totalTransactions}</p>
        </div>
        <div className="stat-box">
          <h4>Highest Income</h4>
          <p>₹ {highestIncome}</p>
        </div>
        <div className="stat-box">
          <h4>Highest Expense</h4>
          <p>₹ {highestExpense}</p>
        </div>
        <div className="stat-box">
          <h4>Average Transaction Amount</h4>
          <p>₹ {averageAmount}</p>
        </div>
      </div>
      <div>
        <label>Filter by Type : </label>
        <select onChange={(e) => setFilterValue(e.target.value)}>
          {filterValue === "" ? <option>Select</option> : []}
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      {filterValue && (
        <div className="income-breakdown-card">
          <h2 className="chart-title">{filterValue} Breakdown</h2>
          {filteredData.length > 0 ? (
            <div className="bar-chart-wrapper">
              <ResponsiveContainer
                width={
                  filteredData.length < 4 ? filteredData.length * 150 : "100%"
                }
                height={300}
              >
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="no-data-message">
              No data found for {filterValue.toLowerCase()} transactions.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
