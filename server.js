const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/WorkFromHomeDB')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Connection error:", err));

// 2. Register Route (Step 1 & 3: Hashing + Redirect)
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            fullName, 
            email, 
            password: hashedPassword 
        });

        await newUser.save();
        
        // Redirect to login page after success
        res.redirect('http://127.0.0.1:5500/login.html'); 
    } catch (error) {
        res.status(400).send("Registration Error: " + error.message);
    }
});

// 3. Login Route (Step 2)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid password");

        // Send the user's name back as a response
        res.status(200).json({ fullName: user.fullName });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));