// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// router.post('/register-officer', adminController.registerOfficer);

// module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register-officer', adminController.registerOfficer);
router.get('/complaints', adminController.getComplaints);
router.get('/dashboard', adminController.getDashboardData);
router.get('/officers', adminController.getOfficers);
router.delete('/officers/:id', adminController.deleteOfficer);
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;