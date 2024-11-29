import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTicket } from '../../contexts/TicketContext';
import { Table, Button, Modal } from 'antd';

const ReceivedTickets = () => {
    const { tickets, loading, error, fetchTickets } = useTicket();
    const { user } = useSelector((state) => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [creatorName, setCreatorName] = useState('');

    useEffect(() => {
        if (user?.id) {
            fetchTickets(user.id);
        }
    }, [user?.id, fetchTickets]);

    const filteredTickets = tickets.filter((ticket) => ticket.assigned_to === user.id);



    const fetchCreatorName = async (creatorId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${creatorId}`);
            setCreatorName(response.data.user.name);
        } catch (error) {
            console.error('Error fetching creator name:', error);
        }
    };


    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket);
        setCreatorName('');
        setIsModalVisible(true);
        fetchCreatorName(ticket.created_by);
    };

    const handleAcknowledgeTicket = async () => {
        console.log('Ticket acknowledged:', selectedTicket);
        try {
            await axios.put(`http://localhost:5000/api/tickets/${selectedTicket.id}`, { status: 'In Progress' });

        } catch (error) {
            console.error('Error acknowledging ticket:', error);
        }
        setIsModalVisible(false);

    };


    const handleResolveTicket = async () => {
        console.log('Ticket resolved:', selectedTicket);
        try {
            await axios.put(`http://localhost:5000/api/tickets/${selectedTicket.id}`, { status: 'Resolved' });

        } catch (error) {
            console.error('Error acknowledging ticket:', error);
        }
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            key: 'serial_number',
        },
        {
            title: 'Client Name',
            dataIndex: 'client_name',
            key: 'client_name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, ticket) => (
                <div className="flex justify-center space-x-2">
                    <Button
                        onClick={() => handleViewTicket(ticket)}
                        icon={<Eye size={20} />}
                        title="View Ticket"
                        type="link"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Ticket Management</h2>

            {tickets.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No tickets found. Create your first ticket!
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredTickets}
                    rowKey="key"  // Use the newly added 'key' property
                    pagination={false}
                    size="middle"
                />
            )}

            {/* Modal for Viewing Ticket Details */}
            <Modal
                title={`Ticket Details - ${selectedTicket?.serial_number}`}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedTicket && (
                    <div>
                        <p><strong>Client Name:</strong> {selectedTicket.client_name}</p>
                        <p><strong>Amount:</strong> {selectedTicket.amount}</p>
                        <p><strong>Status:</strong> {selectedTicket.status}</p>
                        <p><strong>Created By:</strong> {creatorName || 'Loading...'}</p> {/* Show creator's name */}

                        <div className="flex justify-end space-x-2 mt-4">
                            <Button
                                onClick={handleAcknowledgeTicket}
                                type="primary"
                                size="middle"
                            >
                                Acknowledge
                            </Button>
                            <Button
                                onClick={handleResolveTicket}
                                type="primary"
                                danger
                                size="middle"
                            >
                                Resolve
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ReceivedTickets;
