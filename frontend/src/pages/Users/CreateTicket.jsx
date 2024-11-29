import React, { useState } from 'react';
import { TicketPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getAuthHeader } from '../../utils/getToken';
import axios from 'axios';

const CreateTicket = () => {


    const [formData, setFormData] = useState({
        client_name: '',
        client_address: '',
        client_contact_details: '',
        amount: ''
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.client_name.trim()) {
            newErrors.client_name = 'Client name is required';
        }

        if (!formData.client_address.trim()) {
            newErrors.client_address = 'Client address is required';
        }


        if (!formData.client_contact_details.trim()) {
            newErrors.client_contact_details = 'Contact details are required';
        }


        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Please enter a valid positive amount';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const ticketData = {
                client_name: formData.client_name,
                client_address: formData.client_address,
                client_contact_details: formData.client_contact_details,
                amount: parseFloat(formData.amount)
            };

            try {


                const config = getAuthHeader();

                const response = await axios.post('http://localhost:5000/api/tickets', ticketData, config);

                if (response.data) {
                    console.log('Ticket created successfully');
                    // Optionally, show a success message or reset form
                }

                // Reset form after submission
                setFormData({
                    client_name: '',
                    client_address: '',
                    client_contact_details: '',
                    amount: ''
                });
            } catch (error) {
                console.error('Error creating ticket:', error.response ? error.response.data : error.message);
                // Optionally, show an error message to the user
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <TicketPlus className="mr-3" /> Create New Ticket
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                            Client Name
                        </label>
                        <input
                            type="text"
                            id="client_name"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.client_name ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Enter client full name"
                        />
                        {errors.client_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.client_name}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="client_address" className="block text-sm font-medium text-gray-700">
                            Client Address
                        </label>
                        <input
                            type="text"
                            id="client_address"
                            name="client_address"
                            value={formData.client_address}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.client_address ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Enter client full address"
                        />
                        {errors.client_address && (
                            <p className="text-red-500 text-xs mt-1">{errors.client_address}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="client_contact_details" className="block text-sm font-medium text-gray-700">
                            Client Contact Details
                        </label>
                        <input
                            type="text"
                            id="client_contact_details"
                            name="client_contact_details"
                            value={formData.client_contact_details}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.client_contact_details ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Enter phone number or email"
                        />
                        {errors.client_contact_details && (
                            <p className="text-red-500 text-xs mt-1">{errors.client_contact_details}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.amount ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                            placeholder="Enter ticket amount"
                            step="0.01"
                            min="0"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="route_to" className="block text-sm font-medium text-gray-700">
                            Route Ticket To
                        </label>
                        <select
                            id="route_to"
                            name="route_to"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                        >
                            <option value="">Select a user to route ticket</option>
                            <option value="financial_planner">Financial Planner</option>
                            <option value="mortgage_broker">Mortgage Broker</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Create Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicket;