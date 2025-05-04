// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.register);
// router.post('/verify-otp', authController.verifyOtp);
// router.post('/login', authController.login);
// router.post('/officer/login', authController.officerLogin);
// router.post('/logout', authController.logout);
// router.get('/user', authController.getUser);
// router.get('/officer', authController.getOfficer);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.register);
// router.post('/verify-otp', authController.verifyOtp);
// router.post('/login', authController.login);
// router.post('/officer/login', authController.officerLogin);
// router.post('/admin/login', authController.adminLogin);
// router.post('/logout', authController.logout);
// router.get('/user', authController.getUser);
// router.get('/officer', authController.getOfficer);
// router.get('/admin', authController.getAdmin);

// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.post('/officer/login', authController.officerLogin);
router.post('/admin/login', authController.adminLogin);
router.post('/logout', authController.logout);
router.get('/user', authController.getUser);
router.get('/officer', authController.getOfficer);
router.get('/admin', authController.getAdmin);

module.exports = router;