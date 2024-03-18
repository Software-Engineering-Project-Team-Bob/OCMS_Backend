const express = require('express');

const router = express.Router();

const signup = require('../controllers/auth/signUp');
const signin = require('../controllers/auth/signIn');
const verifyToken = require('../controllers/auth/verifyToken');

router.post('/signup', signup)
router.post('/signin', signin);
router.post('/verifyToken', verifyToken);

module.exports = router; 