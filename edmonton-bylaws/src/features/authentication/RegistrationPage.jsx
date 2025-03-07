import React, { useState } from 'react';
import UserInformationForm from '../components/UserInformationForm.jsx';
import axios from 'axios';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async () => {
        console.log('Registering user:', formData);
        try {
            const response = await axios.post('http://localhost:3000/api/users', formData);
            console.log('User registered successfully:', response.data);
            alert('Registration Complete');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <div className="page" style={styles.page}>
            <h1 style={styles.h1}>Edmonton Bylaws</h1>

            <UserInformationForm
                title="Register"
                buttonText="Register"
                onSubmit={handleRegistration}
                initialData={formData}
                onChange={handleChange}
            />
        </div>
    );
};

const styles = {
    page: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw' },
    h1: { color: '#005087', fontSize: '64px' },
};

export default RegistrationPage;
