import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import { Trash2, Edit } from 'lucide-react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  //Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/users');
      setUsers(data.users);
    } catch (error) {
      setErrorMessage('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Delete a user
  const handleDelete = (userId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'Once deleted, this action cannot be undone.',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/users/${userId}`);
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          notification.success({
            message: 'Success',
            description: 'User deleted successfully.',
            duration: 3,
          });
        } catch (error) {
          setDeleteErrorMessage('Cannot delete user. They may have an ongoing ticket.');
        }
      },
      okText: 'Yes, delete it',
      cancelText: 'No, cancel',
    });
  };


  //Populate edit modal with user data
  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
    });
    setIsEditModalVisible(true);
  };

  //Update a user
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, form.getFieldsValue());
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...form.getFieldsValue() } : user
        )
      );
      setIsEditModalVisible(false);
      setSelectedUser(null);
      notification.success({
        message: 'Success',
        description: 'User updated successfully.',
        duration: 3,
      });
    } catch (error) {
      setErrorMessage('Error updating user');
    }
  };


  const handleErrorModalClose = () => {
    setErrorMessage(null);
    setDeleteErrorMessage(null);
  };

  //Table columns
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <Button
            onClick={() => handleEdit(record)}
            icon={<Edit size={20} color="#0284c7" />}

            title="Edit User"
            type="link"
          />
          <Button onClick={() => handleDelete(record.id)} icon={<Trash2 size={20} />}
            title="Delete User"
            type="link"
            danger />
        </div>
      ),
    },
  ];

  return (
    <div>
      {errorMessage && (
        <Modal
          title="Error"
          visible={true}
          onOk={handleErrorModalClose}
          onCancel={handleErrorModalClose}
        >
          <p>{errorMessage}</p>
        </Modal>
      )}

      {deleteErrorMessage && (
        <Modal
          title="Error Deleting"
          visible={true}
          onOk={handleErrorModalClose}
          onCancel={handleErrorModalClose}
        >
          <p>{deleteErrorMessage}</p>
        </Modal>
      )}

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          className: 'bg-sky-700 hover:bg-sky-900 text-white'
        }}
        cancelButtonProps={{
          className: 'bg-gray-200 hover:bg-gray-300 text-black'
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the user email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a user role!' }]}
          >
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Financial Planner">Financial Planner</Select.Option>
              <Select.Option value="Mortgage Broker">Mortgage Broker</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input the user password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={5}
      />
    </div>
  );
};

export default AllUsers;
