import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import axios from 'axios'; 
import { type User } from './LoginForm'; 

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  onRegisterSuccess: (token: string | null, user: User | null) => void; 
}

interface RegisterFormData {
  name: string; 
  email: string;
  password: string;
  password_confirmation: string; 
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, showNotification, onRegisterSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState<boolean>(false); 

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

    if (formData.password !== formData.password_confirmation) {
      showNotification('Kata sandi dan konfirmasi kata sandi tidak cocok!', 'error');
      setLoading(false); 
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      }, {
        headers: { 'Accept': 'application/json' }
      });

      const data = response.data; 

      console.log('Registrasi Sukses:', data);

      if (data.user && data.user.token) {
        localStorage.setItem('access_token', data.user.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        showNotification('Registrasi berhasil! Anda telah login.', 'success');
        onRegisterSuccess(data.user.token, data.user); 
      } else {
        showNotification('Registrasi berhasil! Silakan login untuk melanjutkan.', 'success');
        onRegisterSuccess(null, null); 
        onSwitchToLogin(); 
      }
      
    } catch (error) { 
      if (axios.isAxiosError(error) && error.response) {
        let errorMessage = 'Registrasi gagal. Silakan coba lagi.';
        const responseData = error.response.data;

        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.errors) {
          errorMessage = Object.values(responseData.errors).flat().join('\n');
        }
        showNotification(errorMessage, 'error'); 
        console.error('Register Gagal (Server Response):', responseData);
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Daftar</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name" 
            placeholder="Nama Lengkap"
            value={formData.name} 
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
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
        
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="password_confirmation" 
            placeholder="Konfirmasi Kata Sandi"
            value={formData.password_confirmation} 
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-12"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showConfirmPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>
        
        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="leading-relaxed">
            Saya setuju dengan{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Syarat dan Ketentuan
            </a>{' '}
            serta{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Kebijakan Privasi
            </a>
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          disabled={loading} 
        >
          {loading ? 'Memuat...' : 'Daftar Sekarang'} 
        </button>
      </form>
      
      <div className="flex items-center justify-center space-x-4 mt-6">
        <div className="text-sm text-gray-500">Atau daftar dengan</div>
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
        Sudah punya akun?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:underline font-medium transition-colors"
        >
          Masuk sekarang
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;