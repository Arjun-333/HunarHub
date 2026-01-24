import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const EditUserProfilePage = () => {
  const { user, login } = useContext(AuthContext); // Re-use login to update context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            address: user.address || '',
            city: user.city || '',
            postalCode: user.postalCode || '',
            phone: user.phone || '',
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.put('/auth/profile', formData);
      // Update local storage and context
      login(data); // This might be a bit hacky if login expects full login logic, but usually it sets user
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
        <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-6">Edit Profile</h1>
        
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="border-t border-neutral-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Shipping Info</h3>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Address</label>
                <textarea
                  name="address"
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address, Apartment, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
             <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfilePage;
