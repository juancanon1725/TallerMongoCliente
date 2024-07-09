import React, { useState } from 'react';
import userService from './UserService';

function UserForm({ fetchUsers, closeModal }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthdate: '',
        program: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Validar los datos del formulario
        if (!formData.name || !formData.email || !formData.birthdate || !formData.program) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await userService.addUser(formData);
            fetchUsers(); // Actualizar la lista de usuarios después de agregar uno nuevo
            closeModal(); // Cerrar el modal después de agregar el usuario
            // Reiniciar el estado del formulario después de la sumisión
            setFormData({
                name: '',
                email: '',
                birthdate: '',
                program: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userModalLabel">Add User</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" onChange={handleInputChange}
                                       value={formData.name} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" onChange={handleInputChange}
                                       value={formData.email} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthdate" className="form-label">Birthdate</label>
                                <input type="date" className="form-control" id="birthdate"
                                       onChange={handleInputChange} value={formData.birthdate} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="program" className="form-label">Program</label>
                                <input type="text" className="form-control" id="program"
                                       onChange={handleInputChange} value={formData.program} required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserForm;






