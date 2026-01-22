import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(name, email, password, role);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded border border-neutral-200 mt-16 shadow-sm">
      <h2 className="text-2xl font-serif font-bold text-center mb-8 text-primary-dark">Join the Community</h2>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded border border-red-100 mb-6 text-sm">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="role">
            I want to:
          </label>
          <select
            id="role"
            className="w-full px-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Buy Products & Services</option>
            <option value="entrepreneur">Sell Products & Services</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-primary-light transition shadow-sm"
        >
          Create Account
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{' '}
        <Link to="/login" className="text-secondary font-semibold hover:text-secondary-dark">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
