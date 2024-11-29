import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTicket } from '../../contexts/TicketContext';
import { Table, Button, Modal, Form, Input, notification } from 'antd';


const MyTickets = () => {
    const { tickets, loading, error, fetchTickets, deleteTicket, updateTicket } = useTicket();
    const { user } = useSelector((state) => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user?.id) {
            fetchTickets(user.id);
        }
    }, [user?.id, fetchTickets]);

    const filteredTickets = tickets.filter((ticket) => ticket.created_by === user.id);


    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalVisible(true);
    };


    const handleUpdateTicket = (ticket) => {
        if (ticket.status === 'NotAssigned') {
            setSelectedTicket(ticket);
            form.setFieldsValue({
                client_name: ticket.client_name,
                amount: ticket.amount,
                status: ticket.status,
                client_address: ticket.client_address,
                client_contact_details: ticket.client_contact_details
            });
            setIsUpdateModalVisible(true);
        } else {

            Modal.warning({
                title: 'Cannot Update',
                content: 'This ticket cannot be updated because its status is not "NotAssigned".',
            });
        }
    };




    const handleUpdateSubmit = (values) => {
        const updatedTicket = { ...selectedTicket, ...values };
        updateTicket(updatedTicket);
        notification.success({
            message: 'Ticket Updated Successfully',
            description: `The ticket has been successfully updated.`,
            placement: 'topRight',
        });

        setIsUpdateModalVisible(false);
    };


    // Delete Ticket
    const handleDeleteTicket = (ticketId, status) => {
        if (status === 'NotAssigned' || status === 'Pending') {
            Modal.confirm({
                title: 'Are you sure you want to delete this ticket?',
                content: 'Once deleted, this action cannot be undone.',
                onOk: () => {
                    deleteTicket(ticketId);
                    notification.success({
                        message: 'Ticket Deleted Successfully',
                        description: `The ticket has been successfully deleted.`,
                    })
                },
                onCancel: () => {
                    console.log('Delete action cancelled');
                },
                okText: 'Yes, delete it',
                cancelText: 'No, cancel',
            });
        } else {
            Modal.warning({
                title: 'Cannot Delete',
                content: 'This ticket cannot be deleted because its status is not "NotAssigned" or "Pending".',
            });
        }
    };




    const handleTransferTicket = async () => {

        try {
            const { data } = await axios.get('http://localhost:5000/api/users');
            setUsers(data.users);
            setIsTransferModalVisible(true);
            setIsModalVisible(false);

        } catch (error) {
            setErrorMessage('Error fetching users');
        }
    };

    const handleConfirmTransfer = async () => {
        try {
            if (!selectedUser) {
                Modal.warning({
                    title: 'No User Selected',
                    content: 'Please select a user to transfer the ticket.',
                });
                return;
            }

            const updatedTicket = {
                ...selectedTicket,
                assigned_to: selectedUser,
                status: 'pending',
            };

            updateTicket(updatedTicket);

            setIsTransferModalVisible(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error transferring ticket:', error);

        }
    }


    if (loading) {
        return <div className="text-center py-10">Loading tickets...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-10">{error}</div>;
    }

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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, ticket) => (
                <div className="flex justify-center space-x-2">
                    <Button
                        onClick={() => handleViewTicket(ticket)}
                        icon={<Eye size={20} color="#0284c7" />}
                        title="View Ticket"
                        type="link"
                    />
                    <Button
                        onClick={() => handleUpdateTicket(ticket)}
                        icon={<Edit size={20} color="#0284c7" />}
                        title="Update Ticket"
                        type="link"
                        disabled={ticket.status !== 'NotAssigned'}
                    />
                    <Button
                        onClick={() => handleDeleteTicket(ticket.id, ticket.status)}
                        icon={<Trash2 size={20} />}
                        title="Delete Ticket"
                        type="link"
                        danger
                        disabled={ticket.status !== 'NotAssigned' && ticket.status !== 'Pending'}
                    />
                </div>
            ),
        },

    ];

    const TransferModal = () => {
        const [selectedRole, setSelectedRole] = useState('Financial Planner');
        const filteredUsers = users.filter((user) => user.role === selectedRole);

        return (
            <Modal
                title="Transfer Ticket"
                visible={isTransferModalVisible}
                onCancel={() => setIsTransferModalVisible(false)}
                onOk={() => {
                    console.log('Transfer Modal OK clicked');
                    console.log('Final Selected User:', selectedUser);
                    handleConfirmTransfer();
                }}
            >
                <h3>Select a Role</h3>
                <div className="mb-4">
                    <select
                        onChange={(e) => {
                            const newRole = e.target.value;
                            console.log('Role changed to:', newRole);
                            setSelectedRole(newRole);
                        }}
                        value={selectedRole}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="Financial Planner">Financial Planner</option>
                        <option value="Mortgage Broker">Mortgage Broker</option>
                    </select>
                </div>

                <h3>Select a User</h3>
                <select
                    onChange={(e) => {
                        const newUserId = e.target.value;
                        console.log('User selected:', newUserId);
                        setSelectedUser(newUserId);
                    }}
                    value={selectedUser || ''}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="" disabled>
                        Select a {selectedRole}
                    </option>
                    {filteredUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </Modal>
        );
    };



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
                    rowKey="key"
                    pagination={5}
                    size="middle"
                />
            )}

            {/* Modal for Viewing Ticket */}
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
                        <p><strong>Address:</strong> {selectedTicket.client_address}</p>
                        <p><strong>Contact Details:</strong> {selectedTicket.client_contact_details}</p>

                        {selectedTicket.status === 'NotAssigned' && (
                            <div className="flex justify-end space-x-2 mt-4">
                                <Button
                                    onClick={handleTransferTicket}
                                    type="primary"
                                    size="middle"
                                    className='bg-sky-700 hover:bg-sky-900'
                                >
                                    Transfer
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* Modal for Updating Ticket */}
            <Modal
                title={`Update Ticket - ${selectedTicket?.serial_number}`}
                visible={isUpdateModalVisible}
                onCancel={() => setIsUpdateModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleUpdateSubmit} layout="vertical">
                    <Form.Item
                        label="Client Name"
                        name="client_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the client name!'
                            },
                            {
                                max: 100,
                                message: 'Client name should not exceed 100 characters!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Client Address"
                        name="client_address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the client address!'
                            },
                            {
                                max: 200,
                                message: 'Client address should not exceed 200 characters!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Client Contact"
                        name="client_contact_details"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the client contact!'
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Client contact must be a valid phone number (only numbers allowed)!'
                            },
                            {
                                min: 10,
                                message: 'Client contact must be at least 10 digits!'
                            },
                            {
                                max: 15,
                                message: 'Client contact cannot exceed 15 digits!'
                            }
                        ]}
                    >
                        <Input type="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the amount!'
                            },
                            {
                                min: 0,
                                message: 'Amount cannot be negative!'
                            }
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>


            <TransferModal />

        </div>
    );
};

export default MyTickets;
