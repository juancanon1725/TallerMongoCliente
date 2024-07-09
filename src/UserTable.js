import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import userService from './UserService';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openModal = () => setModalOpen(true);

    const closeModal = () => setModalOpen(false);

    return (
        <div className="container mt-5">
            <button type="button" className="btn btn-success" onClick={openModal}>
                Add user
            </button>
            <h2 className="mt-3">Registered Users</h2>
            <table className="table table-striped table-hover ">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birthdate</th>
                    <th>Program</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                        <td>{user.program}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {modalOpen && <UserForm fetchUsers={fetchUsers} closeModal={closeModal} />}
        </div>
    );
}

export default UserTable;





