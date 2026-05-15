import { Link } from 'react-router-dom';
import { FiSearch, FiStar } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <FiStar fill="#fff" size={18} />
          </div>
          <span className="logo-text">
            Review&amp;<span>RATE</span>
          </span>
        </Link>

        <div className="navbar-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." readOnly />
        </div>

        <div className="navbar-auth">
          <button className="btn-auth">SignUp</button>
          <button className="btn-auth">Login</button>
        </div>
      </div>
    </nav>
  );
}
