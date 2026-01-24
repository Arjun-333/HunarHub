import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (window.confirm(`Are you sure you want to buy ${quantity} x ${product.title} for ₹${product.price * quantity}?`)) {
        try {
            const orderItems = [{
                product: product._id,
                name: product.title,
                qty: quantity,
                price: product.price,
                image: product.images[0] || 'https://via.placeholder.com/150'
            }];
            
            const totalAmount = product.price * quantity;

            const { data } = await api.post('/orders', {
                orderItems,
                totalAmount
            });

            toast.success('Order placed successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Order failed');
        }
    }
  };

  if (loading) return <div className="text-center py-20 text-neutral-600">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-20 text-neutral-600">Product not found</div>;

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 flex flex-col md:flex-row">
          <div className="md:w-1/2 h-96 md:h-auto bg-neutral-100 relative">
            <img
              src={product.images[0] || 'https://via.placeholder.com/500'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="text-sm text-accent font-bold uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl font-heading font-bold mb-4 text-neutral-900">{product.title}</h1>
              <p className="text-neutral-600 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="flex items-center mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-100 justify-between">
                 <div className="flex items-center">
                    <span className="text-neutral-500 text-sm mr-2">Sold by:</span>
                    <span className="font-semibold text-primary">{product.entrepreneur?.businessName || 'Artisan'}</span>
                 </div>
                 {user && product.entrepreneur?.user && user._id === product.entrepreneur.user && (
                     <button
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                        className="text-white text-sm bg-neutral-600 hover:bg-neutral-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                     >
                       Edit Product
                     </button>
                 )}
              </div>
            </div>
            
            <div className="border-t border-neutral-100 pt-6">
              <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-heading font-bold text-primary">₹{product.price}</span>
                  <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                      <button 
                          className="px-4 py-2 hover:bg-neutral-100 text-neutral-600 transition"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >-</button>
                      <span className="px-4 py-2 font-medium text-neutral-900 border-x border-neutral-300">{quantity}</span>
                      <button 
                          className="px-4 py-2 hover:bg-neutral-100 text-neutral-600 transition"
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      >+</button>
                  </div>
              </div>
              
              <button
                onClick={handleBuyNow}
                className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-lg font-heading font-bold text-lg transition-all shadow-md disabled:bg-neutral-300 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
