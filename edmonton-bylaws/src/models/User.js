import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
}, { timestamps: true });

const User = mongoose.model('users', userSchema);
export default User;
