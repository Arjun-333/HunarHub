import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-neutral-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              HunarHub
            </h3>
            <p className="text-neutral-200 text-sm">
              Connecting artisans with customers. Discover authentic handmade treasures and expert services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-200 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-200 hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-200 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">
              For Sellers
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-neutral-200 hover:text-accent transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-neutral-200 hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-neutral-200 text-sm">
              <li>Email: support@hunarhub.com</li>
              <li>Phone: +91 1234567890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center">
          <p className="text-neutral-200 text-sm">
            &copy; {new Date().getFullYear()} HunarHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
