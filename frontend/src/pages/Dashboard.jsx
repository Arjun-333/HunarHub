import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sales, setSales] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        if (user.role === 'customer') {
          const ordersRes = await api.get('/orders/myorders');
          setOrders(ordersRes.data);
          const requestsRes = await api.get('/service-requests/my');
          setRequests(requestsRes.data);
        } else if (user.role === 'entrepreneur') {
          const requestsRes = await api.get('/service-requests/my');
          setRequests(requestsRes.data);
          const salesRes = await api.get('/orders/entrepreneur');
          setSales(salesRes.data);
          const productsRes = await api.get('/products/myproducts');
          setMyProducts(productsRes.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) return null;
  if (loading) return <div className="text-center py-20 text-neutral-600">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold mb-2 text-neutral-900">Welcome, {user.name}!</h1>
        <div className="flex justify-between items-end mb-8">
            <p className="text-neutral-600 text-lg">Your Role: <span className="text-primary font-semibold">{user.role}</span></p>
            {user.role === 'entrepreneur' && (
                <button onClick={() => navigate('/edit-profile')} className="text-primary hover:text-primary-dark font-medium underline">Edit Business Profile</button>
            )}
        </div>
        
        {user.role === 'customer' && (
          <div>
            <div className="flex justify-between items-end mb-6">
                <p className="text-neutral-600">Here you can view your orders and service requests.</p>
                <button onClick={() => navigate('/edit-user-profile')} className="text-primary hover:text-primary-dark font-medium underline">Edit Profile</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                  <h3 className="font-heading font-semibold text-xl mb-4 text-neutral-900">My Orders ({orders.length})</h3>
                  {orders.length === 0 ? <p className="text-neutral-500">No orders yet.</p> : (
                    <ul className="space-y-3">
                        {orders.map(order => (
                            <li key={order._id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                                <span className="font-semibold text-neutral-900">Order #{order._id.substring(0, 8)}</span>
                                <span className="block text-sm text-neutral-600 mt-1">Total: ₹{order.totalAmount}</span>
                                <span className="block text-xs text-neutral-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                  )}
               </div>
               <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                  <h3 className="font-heading font-semibold text-xl mb-4 text-neutral-900">My Service Requests ({requests.length})</h3>
                  {requests.length === 0 ? <p className="text-neutral-500">No requests yet.</p> : (
                    <ul className="space-y-3">
                        {requests.map(req => (
                            <li key={req._id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                                <span className="font-semibold text-neutral-900">{req.serviceType}</span>
                                <span className={`block text-xs font-bold mt-1 ${req.status === 'pending' ? 'text-accent' : 'text-primary'}`}>
                                    Status: {req.status}
                                </span>
                                <span className="block text-sm text-neutral-600 mt-1">{req.description}</span>
                            </li>
                        ))}
                    </ul>
                  )}
               </div>
            </div>
          </div>
        )}

        {user.role === 'entrepreneur' && (
          <div>
            <p className="mb-6 text-neutral-600">Manage your products, services, and incoming requests.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                   <h3 className="font-heading font-semibold text-xl mb-4 text-neutral-900">My Products</h3>
                   <div className="flex justify-between items-center mb-4">
                        <span className="text-neutral-500 text-sm">Manage your inventory</span>
                        <button onClick={() => navigate('/add-product')} className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium transition-colors">Add Product</button>
                   </div>
                   
                   {myProducts.length === 0 ? <p className="text-neutral-500 italic">You haven't added any products yet.</p> : (
                     <ul className="space-y-3">
                        {myProducts.map(product => (
                            <li key={product._id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 flex justify-between items-center">
                                <div>
                                    <span className="font-semibold text-neutral-900 block">{product.title}</span>
                                    <span className="text-sm text-neutral-600">₹{product.price} | Stock: {product.stock}</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/edit-product/${product._id}`)}
                                    className="text-white text-sm bg-neutral-600 hover:bg-neutral-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                     </ul>
                   )}
                </div>

                <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                   <h3 className="font-heading font-semibold text-xl mb-4 text-neutral-900">Recent Sales ({sales.length})</h3>
                   {sales.length === 0 ? <p className="text-neutral-500">No sales yet.</p> : (
                     <ul className="space-y-3">
                        {sales.map(sale => (
                            <li key={sale._id} className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-semibold text-neutral-900">Order #{sale._id.substring(0, 8)}</span>
                                        <span className="block text-sm text-neutral-600 mt-1">To: {sale.customer?.name || 'Customer'}</span>
                                    </div>
                                    <span className="font-bold text-primary">₹{sale.totalAmount}</span>
                                </div>
                                <div className="mt-2 text-sm text-neutral-500">
                                    Items: {sale.orderItems.map(i => i.name).join(', ')}
                                </div>
                                <button
                                    onClick={() => navigate(`/order/${sale._id}`)}
                                    className="mt-3 text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-lg transition-colors font-medium w-full"
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                     </ul>
                   )}
                </div>
               <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                  <h3 className="font-heading font-semibold text-xl mb-4 text-neutral-900">Incoming Requests ({requests.length})</h3>
                  {requests.length === 0 ? <p className="text-neutral-500">No new requests.</p> : (
                    <ul className="space-y-3">
                        {requests.map(req => (
                            <li key={req._id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                                <span className="font-semibold text-neutral-900">{req.serviceType}</span>
                                <span className="block text-sm text-neutral-600 mt-1">From: {req.customer?.name || 'Customer'}</span>
                                <span className="block text-xs text-neutral-500 mt-1">{req.description}</span>
                                <div className="mt-3 flex gap-2">
                                    <button className="bg-primary hover:bg-primary-light text-white text-sm px-3 py-1.5 rounded-lg transition-colors">Accept</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">Reject</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                  )}
               </div>
            </div>
          </div>
        )}

        {user.role === 'admin' && (
          <div>
            <p className="mb-6 text-neutral-600">Manage platform verifications and users.</p>
            <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
               <h3 className="font-heading font-semibold text-xl mb-2 text-neutral-900">Pending Verifications</h3>
               <p className="text-neutral-500">No pending verifications.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
