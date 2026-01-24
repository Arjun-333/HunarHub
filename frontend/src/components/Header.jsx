import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-white">
              HunarHub
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-neutral-100 hover:text-accent transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-neutral-100 hover:text-accent transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              to="/services"
              className="text-neutral-100 hover:text-accent transition-colors font-medium"
            >
              Services
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-neutral-100 hover:text-accent transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-neutral-100 font-medium hidden sm:block">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-neutral-100 hover:text-accent transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
