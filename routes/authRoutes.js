const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController');

// POST route for user sign-up
router.post('/signup', signUp);

// POST route for user sign-in
router.post('/signin', signIn);

module.exports = router;
