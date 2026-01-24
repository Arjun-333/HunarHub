import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const EditProductPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setFormData({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            stock: data.stock,
            image: data.images[0] || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [formData.image],
      };

      await api.put(`/products/${id}`, productData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
        <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-6">Edit Product</h1>
        
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Product Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.title}
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Category</label>
            <select
              name="category"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Arts & Crafts">Arts & Crafts</option>
              <option value="Textiles">Textiles</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.image}
              onChange={handleChange}
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
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
