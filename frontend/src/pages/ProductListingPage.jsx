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
    <div className="py-12 container mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
           <h1 className="text-3xl font-serif font-bold text-primary-dark">Curated Marketplace</h1>
           <p className="text-neutral-600 mt-2">Handpicked items from local artisans.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white border border-neutral-200 rounded hover:shadow-lg transition duration-300 group">
            <div className="h-56 overflow-hidden bg-neutral-100 relative">
                <img
                src={product.images[0] || 'https://via.placeholder.com/300'}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
            </div>
            <div className="p-5">
              <div className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">
                {product.category || 'Handmade'}
              </div>
              <h2 className="text-lg font-bold mb-2 text-neutral-900 group-hover:text-primary transition">{product.title}</h2>
              <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <span className="text-primary-dark font-bold text-xl">₹{product.price}</span>
                <Link
                  to={`/products/${product._id}`}
                  className="text-sm font-medium text-primary hover:text-secondary transition"
                >
                  View Details →
                </Link>
              </div>
              <p className="text-xs text-neutral-400 mt-3">By: {product.entrepreneur?.businessName || 'Unknown Artisan'}</p>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded border border-neutral-200">
            <p className="text-neutral-500">No products found at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
