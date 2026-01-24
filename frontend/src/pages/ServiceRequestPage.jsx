import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const ServiceRequestPage = () => {
  const { entrepreneurId } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntrepreneur = async () => {
      try {
        const { data } = await api.get(`/entrepreneurs/${entrepreneurId}`);
        setEntrepreneur(data);
      } catch (err) {
        setError('Failed to load entrepreneur details');
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneur();
  }, [entrepreneurId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        navigate('/login');
        return;
    }

    try {
      await api.post('/service-requests', {
        entrepreneurId,
        serviceType,
        description,
      });
      toast.success('Service request sent successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send request');
    }
  };

  if (loading) return <div className="text-center py-20 text-neutral-600">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!entrepreneur) return <div className="text-center py-20 text-neutral-600">Entrepreneur not found</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
        <h2 className="text-3xl font-heading font-bold mb-2 text-neutral-900">Request Service</h2>
        <p className="text-neutral-600 mb-8">Send a request to <span className="font-semibold text-primary">{entrepreneur.businessName}</span></p>
        
        <div className="mb-8 p-5 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="font-heading font-semibold text-neutral-800 mb-3">Specialties & Skills:</p>
          <div className="flex flex-wrap gap-2">
              {entrepreneur.skills.map((skill, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium">{skill}</span>
              ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="serviceType">
              Service Type
            </label>
            <input
              type="text"
              id="serviceType"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              placeholder="E.g., Plumbing Repair, Custom Tailoring"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary h-32 transition"
              placeholder="Describe what you need in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-dark text-white font-heading font-bold py-3.5 px-4 rounded-lg transition-colors shadow-md"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
