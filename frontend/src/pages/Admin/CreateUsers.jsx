import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../features/user';
import { notification } from 'antd';


const CreateUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.user);

    // Initialize form data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    //Error states
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);


     // Effect to reset submit error when it changes
    useEffect(() => {
        if (submitError) {
            setSubmitError(null);
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.role) {
            newErrors.role = 'Please select a user role';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Create a user
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (validateForm()) {
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };

            try {
                const result = await dispatch(signupUser(userData)).unwrap();

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: ''
                });
                notification.success({
                    message: 'Success',
                    description: 'User Created successfully.',
                    duration: 3,
                });
                navigate('/admin');
            } catch (err) {
                const errorMessage = err || 'An unexpected error occurred';
                setSubmitError(errorMessage);
                console.error('User creation error:', errorMessage);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <UserPlus className="mr-3" /> Create New User
                </h2>

                {(loading || submitError) && (
                    <div className={`mb-4 p-3 rounded ${loading
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {loading ? 'Processing...' : submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Enter full name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Create a strong password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            User Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.role ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                        >
                            <option value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Financial Planner">Financial Planner</option>
                            <option value="Mortgage Broker">Mortgage Broker</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white py-2 rounded-md transition duration-300 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-sky-700 hover:bg-sky-900'
                                }`}
                        >
                            {loading ? 'Creating User...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUsers;