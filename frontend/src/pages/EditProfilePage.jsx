import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const EditProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    location: '',
    skills: '', // Comma separated string for input
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // We need a route to get the CURRENT entrepreneur profile securely
        // Assuming we can search by user ID or backend has a 'me' endpoint for entrepreneurs
        // For now, let's assume we can fetch all and filter, OR better, let's trust the backend to handle "get my profile"
        // Actually, looking at controller, `getEntrepreneurById` takes ID.
        // But we don't have the entrepreneur ID handy in the user object usually (unless we updated auth).
        // Let's rely on a new endpoint or the fact that we might need to fetch by user.
        // Wait, the backend controller `getEntrepreneurById` is public.
        // A better approach for "My Profile" would be to fetch based on the logged-in user.
        // Let's try to fetch the entrepreneur profile associated with this user.
        // Since we don't have a direct "get my entrepreneur profile" endpoint, we might need to rely on `getEntrepreneurs` and find ours,
        // OR simply update the backend to have a "get my profile" endpoint.
        // However, `updateEntrepreneurProfile` uses `req.user._id` to find the profile, which is perfect.
        // We just need to GET it.
        // Let's fetch all entrepreneurs and find ours for now to populate the form, 
        // as proper endpoint refactoring might take longer.
        
        const { data } = await api.get('/entrepreneurs'); 
        const myProfile = data.find(e => e.user?._id === user?._id || e.user === user?._id);

        if (myProfile) {
            setFormData({
                businessName: myProfile.businessName,
                description: myProfile.description,
                location: myProfile.location,
                skills: myProfile.skills.join(', '),
            });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile details');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const profileData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      };

      await api.put('/entrepreneurs/profile', profileData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
        <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-6">Edit Business Profile</h1>
        
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your business..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Mumbai, Maharashtra"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Skills / Services (Comma separated)</label>
            <input
              type="text"
              name="skills"
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Potassium, Pottery, Weaving, Painting"
            />
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
              disabled={updating}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg disabled:opacity-50"
            >
              {updating ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
