import { Schema, model } from "mongoose";



const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, },
        email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
        password_hash: { type: String, required: true },
        fullName: {type: String, minlength: 3, required: true},
        profile_url: String,
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        dateOfBirth: Date,
        phoneNumber: { type: String, maxlength: 20 },
        address: String,
        lastLogin: { type: Date, default: null }
    },
    {
        timestamps: true
    }
);


const User = model('User', userSchema);
export default User;