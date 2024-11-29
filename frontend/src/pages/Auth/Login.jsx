import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '../../features/user';

const Login = () => {
    //Initialize state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    //Login user
    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await dispatch(loginUser({ email, password })).unwrap();

            if (response.success) {
                notification.success({
                    message: 'Login Successful',
                    description: `Welcome back, ${response.user.name || 'User'}!`,
                    placement: 'topRight',
                    duration: 3,
                });
            } else {
                notification.error({
                    message: 'Login Failed',
                    description: response.message || 'Invalid credentials, please try again.',
                    placement: 'topRight',
                    duration: 3,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Login Error',
                description: error.message || 'Invalid Email or Password.',
                placement: 'top',
                duration: 3,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white w-full max-w-md space-y-8 p-10 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-gray-900 mb-6'>
                        Login
                    </h1>
                    <p className='text-gray-500 mb-6'>
                        Sign in to access your customer management dashboard
                    </p>
                </div>
                <form className='space-y-6' onSubmit={login}>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <Mail className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='pl-10 block w-full px-3 py-2 border border-sky-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900'
                            placeholder='Email address'
                        />
                    </div>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <Lock className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='pl-10 block w-full px-3 py-2 border border-sky-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900'
                            placeholder='Password'
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-700 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className='text-center mt-6'>
                    <a
                        href="#"
                        className='text-sm text-sky-700 hover:text-skye-900 hover:underline transition-colors duration-200'
                    >
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;