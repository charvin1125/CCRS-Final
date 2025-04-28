const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/otp/generate', authController.generateOtp);
router.post('/otp/verify', authController.verifyOtp);
router.post('/login', authController.login);
router.get('/user', authController.getUser);
router.post('/logout', authController.logout);

module.exports = router;