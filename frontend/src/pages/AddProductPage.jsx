import { useState, useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const AddProductPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert price and stock to numbers
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [formData.image], // Backend expects an array of strings
      };

      await api.post('/products', productData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.post('/upload', formData, config);
      setFormData((prev) => ({ ...prev, image: data })); // Backend returns path
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      setError('Image upload failed');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
        <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-6">Add New Product</h1>
        
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
              placeholder="e.g., Handcrafted Clay Pot"
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
              placeholder="Describe your product..."
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
              <option value="">Select a Category</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
              <option value="Textiles">Textiles</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Product Image</label>
            <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary-light/10' : 'border-neutral-300 hover:border-primary'}`}
            >
                <input {...getInputProps()} />
                {
                    uploading ? <p>Uploading...</p> : 
                    formData.image ? (
                        <div>
                            <p className="text-green-600 font-medium mb-2">Image Uploaded Successfully!</p>
                            <p className="text-xs text-neutral-500 break-all">{formData.image}</p>
                            <p className="text-xs text-neutral-400 mt-2">Drag 'n' drop to replace</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-neutral-600 font-medium">Drag & drop an image here, or click to select one</p>
                            <p className="text-xs text-neutral-400 mt-1">Supports JPG, PNG</p>
                        </div>
                    )
                }
            </div>
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
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
