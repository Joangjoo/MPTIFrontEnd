// App.tsx
import { useState, useEffect } from 'react';
import AboutView from "./about/AboutView";
import HomeView from "./home/HomeView";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProductView from "./produk/pages/ProductView";
import ProductDetailPage from "./produk/pages/ProductDetailPage";
import LoginView from "./login/LoginView";
import { type User } from './login/components/LoginForm'; 
import { Navbar } from './common/components/Navbar';
import Notification from './common/components/Notification';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const navigate = useNavigate(); 
  const location = useLocation(); 
  console.log("Current Path:", location.pathname);

  const showNavbar = location.pathname !== '/login';

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');

    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setCurrentUser(JSON.parse(userData) as User);
        } catch (e) {
          console.error("Gagal memparsing data user dari localStorage", e);
          localStorage.removeItem('user_data');
        }
      }
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleLoginSuccessInApp = (_token: string, user: User | null) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    showNotification(`Selamat datang kembali, ${user?.name || 'Pengguna'}!`, 'success'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setIsAuthenticated(false);
    setCurrentUser(null);
    showNotification('Anda telah berhasil keluar.', 'info');
    navigate('/login');
  };

  return (
    <>
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={hideNotification} 
        />
      )}

      {showNavbar && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}
      
      <Routes>
        <Route path="/" element={<HomeView currentUser={currentUser} />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/products" element={<ProductView isAuthenticated={isAuthenticated} />} />
        <Route path="/product/:id" element={<ProductDetailPage isAuthenticated={isAuthenticated} />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <HomeView currentUser={currentUser} /> : 
              <LoginView onLoginSuccess={handleLoginSuccessInApp} showNotification={showNotification} />
          } 
        />
      </Routes>
    </>
  );
}

export default App;
