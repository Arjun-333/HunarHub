import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ServiceListingPage = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        const { data } = await api.get('/entrepreneurs');
        setEntrepreneurs(data);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading services...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Local Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map((entrepreneur) => (
          <div key={entrepreneur._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <img
                src={entrepreneur.user?.avatar || 'https://via.placeholder.com/150'}
                alt={entrepreneur.businessName}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{entrepreneur.businessName}</h2>
                <p className="text-gray-500 text-sm">{entrepreneur.location}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{entrepreneur.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-gray-700 mb-2">Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {entrepreneur.skills.map((skill, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={`/request-service/${entrepreneur._id}`}
              className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Request Service
            </Link>
          </div>
        ))}
      </div>
      {entrepreneurs.length === 0 && (
        <p className="text-center text-gray-500">No service providers found.</p>
      )}
    </div>
  );
};

export default ServiceListingPage;
