import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure this is imported somewhere globally

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/addtransaction">
            Add Transaction
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/report">
            Report
          </Link>
        </li>
      </ul>
    </nav>
  );
}
