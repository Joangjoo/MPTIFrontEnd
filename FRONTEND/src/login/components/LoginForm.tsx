import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: (token: string, user: User | null) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onLoginSuccess, showNotification }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  
  // const navigate = useNavigate(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', { 
        email: formData.email,
        password: formData.password
      }, {
        headers: { 'Accept': 'application/json' }
      });

      const data = response.data;

      if (data.user && data.user.token) {
        localStorage.setItem('access_token', data.user.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        onLoginSuccess(data.user.token, data.user); 
      } else {
        showNotification('Login berhasil, tetapi token tidak ditemukan. Mohon hubungi admin.', 'error');
      }

    } catch (error) { 
      if (axios.isAxiosError(error) && error.response) {
        let errorMessage = 'Login gagal. Silakan coba lagi.';
        const responseData = error.response.data;

        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.errors) {
          errorMessage = Object.values(responseData.errors).flat().join('\n');
        } else if (error.response.status === 401) {
            errorMessage = 'Email atau kata sandi salah.';
        }
        showNotification(errorMessage, 'error'); 
        console.error('Login Gagal (Server Response):', responseData);
      } else {
        showNotification('Tidak dapat terhubung ke server. Periksa koneksi Anda.', 'error'); 
        console.error('Network or Other Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Masuk</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Kata Sandi"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-12"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>
        
        <div className="text-right">
          <a href="#" className="text-blue-500 text-sm hover:underline transition-colors">
            Lupa Kata Sandi?
          </a>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          disabled={loading}
        >
          {loading ? 'Memuat...' : 'Masuk'}
        </button>
      </form>
      
      <div className="flex items-center justify-center space-x-4 mt-6">
        <div className="text-sm text-gray-500">Atau masuk dengan</div>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors">
          <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
        </button>
        <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors">
          <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">f</span>
          </div>
        </button>
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-6">
        Belum punya akun?{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline font-medium transition-colors"
        >
          Daftar sekarang
        </button>
      </p>
    </div>
  );
};

export default LoginForm;