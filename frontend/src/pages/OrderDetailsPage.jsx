import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // We need an endpoint to get a single order. 
                // Currently backend doesn't seem to have a specific "get order by id" for general use, 
                // but usually it's /api/orders/:id. 
                // Let's assume we need to add it or it exists.
                // Checking orderRoutes.js... it does NOT exist yet.
                // I will add the endpoint in the backend in a moment.
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load order details');
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!order) return <div className="text-center py-20">Order not found</div>;

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-neutral-900">Order #{order._id}</h1>
                    <span className="text-sm text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-2 border-b pb-2">Customer Details</h3>
                        <p><span className="font-medium">Name:</span> {order.customer?.name}</p>
                        <p><span className="font-medium">Email:</span> {order.customer?.email}</p>
                        <p><span className="font-medium">Phone:</span> {order.customer?.phone || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2 border-b pb-2">Shipping Address</h3>
                        <p>{order.customer?.address || 'No address provided'}</p>
                        <p>{order.customer?.city ? `${order.customer.city}, ${order.customer.postalCode}` : ''}</p>
                    </div>
                </div>

                <div className="mb-8">
                     <h3 className="font-semibold text-lg mb-4 border-b pb-2">Order Items</h3>
                     <ul className="space-y-4">
                        {order.orderItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-center bg-neutral-50 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                     {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />}
                                     <div>
                                         <p className="font-medium text-neutral-900">{item.name}</p>
                                         <p className="text-sm text-neutral-600">Qty: {item.qty}</p>
                                     </div>
                                </div>
                                <p className="font-bold">₹{item.price * item.qty}</p>
                            </li>
                        ))}
                     </ul>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                    <button onClick={() => navigate(-1)} className="text-neutral-600 hover:text-neutral-900">
                        &larr; Back
                    </button>
                    <div className="text-xl font-bold text-primary">
                        Total: ₹{order.totalAmount}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
