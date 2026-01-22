import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
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
          // For entrepreneur, we might want to fetch products and incoming requests
          // For now reusing the same endpoint if it returns relevant data, or just requests
          const requestsRes = await api.get('/service-requests/my');
          setRequests(requestsRes.data);
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
  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Role: {user.role}</h2>
        
        {user.role === 'customer' && (
          <div>
            <p className="mb-4">Here you can view your orders and service requests.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="border p-4 rounded bg-blue-50">
                  <h3 className="font-bold mb-2">My Orders ({orders.length})</h3>
                  {orders.length === 0 ? <p>No orders yet.</p> : (
                    <ul className="space-y-2">
                        {orders.map(order => (
                            <li key={order._id} className="bg-white p-2 rounded shadow-sm">
                                <span className="font-semibold">Order #{order._id.substring(0, 8)}</span>
                                <span className="block text-sm">Total: ₹{order.totalAmount}</span>
                                <span className="block text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                  )}
               </div>
               <div className="border p-4 rounded bg-green-50">
                  <h3 className="font-bold mb-2">My Service Requests ({requests.length})</h3>
                  {requests.length === 0 ? <p>No requests yet.</p> : (
                    <ul className="space-y-2">
                        {requests.map(req => (
                            <li key={req._id} className="bg-white p-2 rounded shadow-sm">
                                <span className="font-semibold">{req.serviceType}</span>
                                <span className={`block text-xs font-bold ${req.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                                    Status: {req.status}
                                </span>
                                <span className="block text-sm text-gray-600">{req.description}</span>
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
            <p className="mb-4">Manage your products, services, and incoming requests.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="border p-4 rounded bg-purple-50">
                  <h3 className="font-bold mb-2">My Products</h3>
                  <button className="bg-indigo-600 text-white px-3 py-1 rounded mt-2 text-sm hover:bg-indigo-700">Add Product</button>
                  {/* Product list fetching would go here */}
               </div>
               <div className="border p-4 rounded bg-yellow-50">
                  <h3 className="font-bold mb-2">Incoming Requests ({requests.length})</h3>
                  {requests.length === 0 ? <p>No new requests.</p> : (
                    <ul className="space-y-2">
                        {requests.map(req => (
                            <li key={req._id} className="bg-white p-2 rounded shadow-sm">
                                <span className="font-semibold">{req.serviceType}</span>
                                <span className="block text-sm">From: {req.customer?.name || 'Customer'}</span>
                                <span className="block text-xs text-gray-500">{req.description}</span>
                                <div className="mt-2">
                                    <button className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">Accept</button>
                                    <button className="bg-red-500 text-white text-xs px-2 py-1 rounded">Reject</button>
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
            <p className="mb-4">Manage platform verifications and users.</p>
            <div className="border p-4 rounded bg-red-50">
               <h3 className="font-bold">Pending Verifications</h3>
               <p>No pending verifications.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
