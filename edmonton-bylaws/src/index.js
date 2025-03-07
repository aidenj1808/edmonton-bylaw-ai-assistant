import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from './db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, CMPT 315 Project is live! 🚀');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// 📘 components/UserInformationForm.jsx
import React from 'react';

const UserInformationForm = ({ title, buttonText, onSubmit, initialData, onChange }) => {
    return (
        <div>
            <h2>{title}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                <input name="firstname" value={initialData.firstname} onChange={onChange} placeholder="First Name" required />
                <input name="lastname" value={initialData.lastname} onChange={onChange} placeholder="Last Name" required />
                <input name="email" value={initialData.email} onChange={onChange} placeholder="Email" required />
                <input name="password" type="password" value={initialData.password} onChange={onChange} placeholder="Password" required />
                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default UserInformationForm;