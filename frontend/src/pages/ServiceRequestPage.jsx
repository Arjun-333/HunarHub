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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!entrepreneur) return <div className="text-center py-10">Entrepreneur not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Request Service from {entrepreneur.businessName}</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <p className="font-semibold">Skills:</p>
        <div className="flex flex-wrap gap-2 mt-2">
            {entrepreneur.skills.map((skill, idx) => (
                <span key={idx} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{skill}</span>
            ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
            Service Type
          </label>
          <input
            type="text"
            id="serviceType"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="E.g., Plumbing Repair, Custom Tailoring"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            placeholder="Describe what you need..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestPage;
