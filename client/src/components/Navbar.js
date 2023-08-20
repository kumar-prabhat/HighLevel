import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">HighLevel</Link>
      </h1>
      <div>
        <span className="mr-2">
          <Link to="/wallet">Wallet</Link>
        </span>
        <span>
          <Link to="/transactions">Transactions</Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
