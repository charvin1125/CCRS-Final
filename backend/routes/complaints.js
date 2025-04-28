const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/', complaintController.submitComplaint);
router.get('/', complaintController.getComplaints);
router.get('/my-complaints', complaintController.getCitizenComplaints);

module.exports = router;