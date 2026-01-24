import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ServiceListingPage from './pages/ServiceListingPage';
import ServiceRequestPage from './pages/ServiceRequestPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import EditProfilePage from './pages/EditProfilePage';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/services" element={<ServiceListingPage />} />
              <Route path="/request-service/:entrepreneurId" element={<ServiceRequestPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product/:id" element={<EditProductPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
}

export default App;
