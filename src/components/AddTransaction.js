import "./AddTransaction.css";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddTransaction({ setTransaction, balance }) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [insufficianteBalance, setInsufficianteBalance] = useState(false);
  function reduce(state, action) {
    switch (action.type) {
      case "titleChange":
        return {
          ...state,
          name: action.name,
        };

      case "amountChange":
        return {
          ...state,
          amount: Number(action.amount),
        };

      case "typeChange":
        return {
          ...state,
          type: action.transactionType,
        };
    }
    return state;
  }
  const [state, dispatch] = useReducer(reduce, {
    name: "",
    amount: 0,
    type: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (
      state.name.trim() === "" ||
      !state.amount ||
      Number(state.amount) === 0 ||
      state.type === ""
    ) {
      setError(true);
      return;
    }
    if (state.type === "Expense" && balance < state.amount) {
      setInsufficianteBalance(true);
      return;
    }
    setTransaction((prev) => [...prev, state]);
    navigate("/");
  }
  return (
    <form className="transaction-form">
      {insufficianteBalance && (
        <p className="form-error">
          Expense amount exceeds your available balance.
        </p>
      )}
      {error && (
        <p className="form-error">
          Please fill in all fields before adding a transaction.
        </p>
      )}
      <h1 className="form-title">Add Transaction</h1>

      <label className="form-label">Title</label>
      <input
        className="form-input"
        type="text"
        onChange={(e) => {
          dispatch({ name: e.target.value, type: "titleChange" });
          setError(false);
          setInsufficianteBalance(false);
        }}
      />

      <label className="form-label">Amount</label>
      <input
        className="form-input"
        type="number"
        onChange={(e) => {
          dispatch({ amount: e.target.value, type: "amountChange" });
          setError(false);
          setInsufficianteBalance(false);
        }}
      />

      <label className="form-label">Type</label>
      <select
        className="form-select"
        onChange={(e) => {
          dispatch({ transactionType: e.target.value, type: "typeChange" });
          setError(false);
          setInsufficianteBalance(false);
        }}
      >
        {state.type == "" ? <option>Select</option> : null}
        <option>Income</option>
        <option>Expense</option>
      </select>

      <button
        className="form-button"
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Add Transaction
      </button>
    </form>
  );
}
