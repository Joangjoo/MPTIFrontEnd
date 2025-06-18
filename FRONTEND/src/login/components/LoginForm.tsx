import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
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
            type="text"
            name="username"
            placeholder="Nama Pengguna"
            value={formData.username}
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
        >
          Masuk
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