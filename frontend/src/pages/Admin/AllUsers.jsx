import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);

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

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    if (userIdToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userIdToDelete}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
        setIsModalVisible(false);
      } catch (error) {
        setDeleteErrorMessage('Cannot delete user. They may have an ongoing ticket.');
      }
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleErrorModalClose = () => {
    setErrorMessage(null);
    setDeleteErrorMessage(null);
  };


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
        <Button onClick={() => handleDelete(record.id)} type="danger">
          Delete
        </Button>
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

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title="Are you sure?"
        visible={isModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
      >
        {deleteErrorMessage ? (
          <p>{deleteErrorMessage}</p>
        ) : (
          <p>Do you want to delete this user?</p>
        )}
      </Modal>
    </div>
  );
};

export default AllUsers;
