import React, { useState } from 'react';
import { motion, AnimatePresence, easeOut, easeIn } from 'framer-motion';
import { IconBuilding } from '@tabler/icons-react'; 
import LoginForm, {type User} from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm'; 
import { useNavigate } from 'react-router-dom';


interface LoginViewProps {
  onLoginSuccess: (token: string, user: User | null) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, showNotification }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [activeTab, setActiveTab] = useState('login'); 
    const navigate = useNavigate(); 

    const formVariants = {
        hidden: { opacity: 0, x: isLogin ? -50 : 50, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
        exit: { opacity: 0, x: isLogin ? 50 : -50, scale: 0.95, transition: { duration: 0.4, ease: easeIn } }
    };

    const handleTabClick = (tab: string) => { 
        setActiveTab(tab);
        setIsLogin(tab === 'login'); 
    };

    const handleLoginFormSuccess = (token: string, user: User | null) => {
        onLoginSuccess(token, user); 
        showNotification(`Selamat datang kembali, ${user?.name || 'Pengguna'}!`, 'success');
        navigate('/'); 
    };

    const handleRegisterSuccess = (token: string | null, user: User | null) => {
        console.log('Registrasi berhasil di LoginView!', { token, user });
        showNotification('Akun Anda berhasil didaftarkan! Silakan login.', 'success');
        setIsLogin(true);
        setActiveTab('login');
    };

    return (
        <div
            className="relative min-h-screen flex " 
            style={{
                backgroundImage: 'url(/logo/loginBg.png)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="relative flex-shrink-0 w-[400px] h-screen z-10"
                style={{
                    backgroundImage: 'url(/logo/logokiri.png)', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'sticky',
                    top: 0,
                }}
            >
                <div className="h-full flex flex-col justify-between items-start pt-8 pb-16 px-10">
                    <div className="relative mt-56 mb-20 ml-8 w-full ">
                        <motion.div
                            className="absolute left-0 w-64 h-24 bg-white rounded-l-full ml-36 z-0" 
                            initial={{ y: 0 }}
                            animate={{
                                y: activeTab === 'login' ? 0 : 90,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.6
                            }}
                        />
                        <motion.button
                            className={`relative z-20 block w-48 py-6 px-8 text-left transition-colors duration-300 ${
                                activeTab === 'login' ? 'text-blue-600' : 'text-white'
                            }`}
                            onClick={() => handleTabClick('login')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="text-4xl font-bold ml-36">Login</div>
                        </motion.button>
                        <motion.button
                            className={`relative z-20 block w-48 py-6 px-8 text-left transition-colors duration-300 ${
                                activeTab === 'signin' ? 'text-blue-600' : 'text-white'
                            }`} 
                            onClick={() => handleTabClick('signin')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="text-4xl font-bold ml-36">Daftar</div>
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="flex-grow flex items-start justify-center p-4 z-20 pb-8"> 
                <motion.div
                    className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden my-8" 
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col justify-center items-center pb-4 overflow-hidden rounded-t-3xl ">
                        <motion.div
                            className="relative z-30 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-2 mt-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <IconBuilding size={64} className="text-blue-600 " />
                        </motion.div>
                        
                        <h2 className="relative z-30 text-white text-3xl font-bold">
                            {isLogin ? 'Login' : 'Daftar'}
                        </h2>
                        
                        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent z-20"></div>
                    </div>
                    <div className="p-8 pt-4">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    variants={formVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <LoginForm 
                                        onSwitchToRegister={() => {
                                            setIsLogin(false);
                                            setActiveTab('signin');
                                        }} 
                                        onLoginSuccess={handleLoginFormSuccess} 
                                        showNotification={showNotification} 
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    variants={formVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <RegisterForm onSwitchToLogin={() => {
                                        setIsLogin(true);
                                        setActiveTab('login');
                                    }} 
                                    onRegisterSuccess={handleRegisterSuccess} 
                                    showNotification={showNotification} 
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginView;