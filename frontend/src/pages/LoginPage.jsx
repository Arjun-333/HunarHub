import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
        <h2 className="text-3xl font-heading font-bold text-center mb-2 text-neutral-900">Welcome Back</h2>
        <p className="text-center text-neutral-600 mb-8">Sign in to your HunarHub account</p>
        
        {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-neutral-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-dark text-white font-heading font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-neutral-600">
          New to HunarHub?{' '}
          <Link to="/register" className="text-primary font-semibold hover:text-primary-light">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
