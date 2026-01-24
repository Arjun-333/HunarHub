import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 text-neutral-600">Loading marketplace...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">Curated Marketplace</h1>
          <p className="text-neutral-600 text-lg">Handpicked items from local artisans.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-neutral-200">
              <div className="h-56 overflow-hidden bg-neutral-100 relative">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/300'}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">
                  {product.category || 'Handmade'}
                </div>
                <h2 className="text-lg font-heading font-semibold mb-2 text-neutral-900 group-hover:text-primary transition">
                  {product.title}
                </h2>
                <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                  <span className="text-primary font-bold text-xl">₹{product.price}</span>
                  <Link
                    to={`/products/${product._id}`}
                    className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    View Details
                  </Link>
                </div>
                <p className="text-xs text-neutral-400 mt-3">By: {product.entrepreneur?.businessName || 'Unknown Artisan'}</p>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
            <p className="text-neutral-500">No products found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
