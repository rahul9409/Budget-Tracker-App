import "./styles.css";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";
import Report from "./components/Report";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const [transaction, setTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [highestIncome, setHighestIncome] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);
  const [averageAmount, setAverageAmount] = useState(0);
  const [allIncomeTransactions, setAllIncomeTransactions] = useState([]);
  const [allExpenseTransactions, setAllExpenseTransactions] = useState([]);

  useEffect(() => {
    const incomeTransactions = transaction.filter((t) => t.type === "Income");
    const income = incomeTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    const expenseTransactions = transaction.filter((t) => t.type === "Expense");
    const expense = expenseTransactions.reduce(
      (acc, curr) => curr.amount + acc,
      0
    );
    const maxIncome =
      incomeTransactions.length > 0
        ? Math.max(...incomeTransactions.map((t) => t.amount))
        : 0;
    const maxExpense =
      expenseTransactions.length > 0
        ? Math.max(...expenseTransactions.map((t) => t.amount))
        : 0;
    const totalAmount = transaction.reduce((sum, t) => sum + t.amount, 0);
    const numberOfTransactions = transaction.length;

    const averageTransactionAmount = (
      numberOfTransactions > 0 ? totalAmount / numberOfTransactions : 0
    ).toFixed(2);

    setTotalIncome(income);
    setTotalExpense(expense);
    setHighestIncome(maxIncome);
    setHighestExpense(maxExpense);
    setAverageAmount(averageTransactionAmount);
    setAllIncomeTransactions(incomeTransactions);
    setAllExpenseTransactions(expenseTransactions);
  }, [transaction]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                transaction={transaction}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />
            }
          />
          <Route
            path="/addtransaction"
            element={
              <AddTransaction
                setTransaction={setTransaction}
                balance={totalIncome - totalExpense}
              />
            }
          />
          <Route
            path="/report"
            element={
              <Report
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalTransactions={transaction.length}
                highestIncome={highestIncome}
                highestExpense={highestExpense}
                averageAmount={averageAmount}
                transaction={transaction}
                incomeTransactions={allIncomeTransactions}
                expenseTransactions={allExpenseTransactions}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
