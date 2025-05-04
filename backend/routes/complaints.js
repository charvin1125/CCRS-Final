// const express = require('express');
// const router = express.Router();
// const complaintController = require('../controllers/complaintController');

// router.post('/', complaintController.createComplaint);
// router.get('/my-complaints', complaintController.getMyComplaints);
// router.get('/assigned', complaintController.getAssignedComplaints); // Moved above /:id
// router.get('/:id', complaintController.getComplaintById);
// router.put('/:id/reopen', complaintController.reopenComplaint);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const complaintController = require('../controllers/complaintController');

// router.post('/', complaintController.createComplaint);
// router.get('/my-complaints', complaintController.getMyComplaints);
// router.get('/assigned', complaintController.getAssignedComplaints);
// router.get('/:id', complaintController.getComplaintById);
// router.put('/:id/status', complaintController.updateComplaintStatus);
// router.put('/:id/reopen', complaintController.reopenComplaint);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const complaintController = require('../controllers/complaintController');

// router.post('/', complaintController.createComplaint);
// router.get('/my-complaints', complaintController.getMyComplaints);
// router.get('/assigned', complaintController.getAssignedComplaints);
// router.get('/:id', complaintController.getComplaintById);
// router.put('/:id/status', complaintController.updateComplaintStatus);
// router.put('/:id/reopen', complaintController.reopenComplaint);
// router.post('/public', complaintController.submitPublicComplaint);
// router.get('/track/:id', complaintController.trackComplaint);
// router.get('/qrcode', complaintController.generateQRCode);

// module.exports = router;
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/public', complaintController.submitPublicComplaint);
router.post('/whatsapp', complaintController.submitWhatsAppComplaint);
router.get('/track/:id', complaintController.trackComplaint);
router.get('/qrcode', complaintController.generateQRCode);
router.post('/', complaintController.createComplaint);
router.get('/my', complaintController.getMyComplaints);
router.get('/:id', complaintController.getComplaintById);
router.get('/officer/assigned', complaintController.getAssignedComplaints);
router.put('/:id/status', complaintController.updateComplaintStatus);
router.put('/:id/reopen', complaintController.reopenComplaint);

module.exports = router;