// Import necessary modules
const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const User = require('./model');
const db = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
db();

// Register endpoint
app.post('/users', async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: req.body.Email });

        if (existingUser) {
            // If the email already exists, return a response indicating that the email is already registered
            return res.status(400).json({ message: 'Email already exists' });
        }

        // If the email does not exist, create a new user
        const user = new User({
            name: req.body.Username,
            email: req.body.Email,
            password: req.body.Password,
            number: req.body.Number,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.Password, salt);

        // Save the new user to the database
        await user.save();

        // Return a success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // If an error occurs during the process, return an error response
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
app.post('/users/login', async (req, res) => {
    try {
        const { Username, Password } = req.body;

        // Check if the user with the provided username exists in the database
        const user = await User.findOne({ name: Username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(Password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If the username and password are correct, authenticate the user
        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        // If an error occurs during the process, return an error response
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
