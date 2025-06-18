import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Kata sandi tidak cocok!');
      return;
    }
    
    // Handle registration logic here
    console.log('Register data:', formData);
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
            name="fullName"
            placeholder="Nama Lengkap"
            value={formData.fullName}
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
            name="confirmPassword"
            placeholder="Konfirmasi Kata Sandi"
            value={formData.confirmPassword}
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
        >
          Daftar Sekarang
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