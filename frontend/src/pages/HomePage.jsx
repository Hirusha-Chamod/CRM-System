import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, UserPlus, Users, TicketCheck, TicketPlus } from 'lucide-react';
import { logoutUser } from '../features/user';

const Homepage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    // Logout user
    const handleLogout = async () => {
        const confirmation = window.confirm('Are you sure you want to log out?');
        if (confirmation) {
            try {
                await dispatch(logoutUser()).unwrap();
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    };


    // User-specific routes
    const handleCreateTicket = () => {
        navigate('/users/createTicket');
    };

    const handleViewTickets = () => {
        navigate('/users/myTickets');
    };

    // Admin-specific routes
    const handleCreateUser = () => {
        navigate('/admin/createUser');
    };

    const handleViewUsers = () => {
        navigate('/admin/allUsers');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome, {user.user?.name}!
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-700 font-medium">
                            Role: {user.user?.role}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            {user.user?.role === 'Admin' ? 'Admin Actions' : 'Quick Actions'}
                        </h3>
                        <div className="space-y-4">
                            {user.user?.role === 'Admin' ? (
                                <>
                                    <button
                                        onClick={handleCreateUser}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center space-x-2"
                                    >
                                        <UserPlus size={20} />
                                        <span>Create New User</span>
                                    </button>
                                    <button
                                        onClick={handleViewUsers}
                                        className="w-full bg-sky-700 hover:bg-sky-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center space-x-2"
                                    >
                                        <Users size={20} />
                                        <span>View All Users</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleCreateTicket}
                                        className="w-full bg-sky-700 hover:bg-sky-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center space-x-2"
                                    >
                                        <TicketPlus size={20} />
                                        <span>Create New Ticket</span>
                                    </button>
                                    <button
                                        onClick={handleViewTickets}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center space-x-2"
                                    >
                                        <TicketCheck size={20} />
                                        <span>View All Tickets</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            {user.user?.role === 'Admin' ? 'System Overview' : 'Dashboard Overview'}
                        </h3>
                        <div className="space-y-4">
                            {user.user?.role === 'Admin' ? (
                                // Admin System Overview
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Users</span>
                                        <span className="font-bold text-blue-600">57</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Active Users</span>
                                        <span className="font-bold text-green-600">48</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">New Users (Last 30 Days)</span>
                                        <span className="font-bold text-purple-600">9</span>
                                    </div>
                                </>
                            ) : (
                                //User Ticket Overview
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Open Tickets</span>
                                        <span className="font-bold text-blue-600">12</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Resolved Tickets</span>
                                        <span className="font-bold text-green-600">45</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Average Resolution Time</span>
                                        <span className="font-bold text-purple-600">2 days</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Homepage;