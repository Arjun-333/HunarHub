import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-16 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-white">HunarHub</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Empowering local micro-entrepreneurs by connecting them with the digital world. We believe in the power of handmade and local skills.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Marketplace</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Find Experts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-secondary">Support</h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Safety Information</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-secondary">Newsletter</h4>
            <p className="text-neutral-300 text-sm mb-4">Subscribe for updates on new artisans.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-primary-light text-white px-4 py-2 rounded-l border-none focus:ring-2 focus:ring-secondary w-full placeholder-neutral-400"
              />
              <button className="bg-secondary px-5 py-2 rounded-r hover:bg-secondary-light transition font-medium">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-light mt-12 pt-8 text-center text-neutral-400 text-sm">
          &copy; {new Date().getFullYear()} HunarHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
