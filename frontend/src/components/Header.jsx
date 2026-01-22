import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          HunarHub
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/products" className="text-gray-600 hover:text-indigo-600">
                Products
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-600 hover:text-indigo-600">
                Services
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Join Now
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
