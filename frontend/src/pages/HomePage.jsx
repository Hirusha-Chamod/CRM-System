import React from 'react';
import { useSelector } from 'react-redux';

const Homepage = () => {
    const user = useSelector((state) => state.user);

    return (
        <main className="flex-1 p-10 bg-gray-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Welcome, {user.user.name}!</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                                Create Ticket
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-300">
                                View Tickets
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-300">
                                Generate Report
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-medium">New Ticket Created</h4>
                                <p className="text-gray-500 text-sm">By Jane Doe - 2 hours ago</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium">Ticket Resolved</h4>
                                <p className="text-gray-500 text-sm">By John Smith - 1 day ago</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium">Customer Follow-up</h4>
                                <p className="text-gray-500 text-sm">By Sarah Johnson - 3 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Homepage;