const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Corrected to 'required'
        unique: true
    },
    token: {
        type: String
    },
    contact: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: false,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email format validation
    },
    password: {
        type: String,
        required: true // Make password required for security
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], // Restrict role to 'customer' or 'admin'
        default: 'customer'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'], // Restrict status to 'Active' or 'Inactive'
        default: 'Inactive'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields


// Create the user model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
