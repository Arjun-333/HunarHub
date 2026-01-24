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

  if (loading) return <div className="text-center py-20 text-neutral-600">Loading services...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">Local Services</h1>
          <p className="text-neutral-600 text-lg">Connect with skilled professionals in your community.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrepreneurs.map((entrepreneur) => (
            <div key={entrepreneur._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200">
              <div className="flex items-center mb-4">
                <img
                  src={entrepreneur.user?.avatar || 'https://via.placeholder.com/150'}
                  alt={entrepreneur.businessName}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary"
                />
                <div>
                  <h2 className="text-xl font-heading font-semibold text-neutral-900">{entrepreneur.businessName}</h2>
                  <p className="text-neutral-500 text-sm">{entrepreneur.location}</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4 line-clamp-3">{entrepreneur.description}</p>
              <div className="mb-4">
                <h3 className="font-heading font-semibold text-sm text-neutral-700 mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {entrepreneur.skills.map((skill, index) => (
                    <span key={index} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/request-service/${entrepreneur._id}`}
                className="block w-full text-center bg-accent hover:bg-accent-dark text-white py-2.5 rounded-lg font-heading font-semibold transition-colors"
              >
                Request Service
              </Link>
            </div>
          ))}
        </div>
        
        {entrepreneurs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
            <p className="text-neutral-500">No service providers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceListingPage;
