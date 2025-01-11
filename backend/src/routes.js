const express = require('express');
const { createProfile } = require('./controllers/profileController');
const { login } = require('./controllers/authController');

const router = express.Router();

// Profile Creation
router.post('/profile', createProfile);

// Login
router.post('/login', login);

module.exports = router;
