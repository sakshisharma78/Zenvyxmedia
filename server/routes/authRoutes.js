const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { validateLogin } = require('../utils/validators');

router.post('/register', registerUser);
router.post('/login', validationMiddleware(validateLogin), loginUser);
router.get('/me', protect, getMe);

module.exports = router;
