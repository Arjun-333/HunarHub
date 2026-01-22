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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="py-10">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.images[0] || 'https://via.placeholder.com/500'}
            alt={product.title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center mb-4">
                <span className="text-gray-700 font-semibold mr-2">Category:</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">{product.category}</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Sold by: {product.entrepreneur?.businessName}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-indigo-600">₹{product.price}</span>
                <div className="flex items-center border rounded">
                    <button 
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >-</button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >+</button>
                </div>
            </div>
            
            <button
              onClick={handleBuyNow}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
