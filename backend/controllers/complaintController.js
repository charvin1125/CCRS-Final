// const mongoose = require('mongoose');
// const Complaint = require('../models/complaint');
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const nodemailer = require('nodemailer');
// const sanitizeHtml = require('sanitize-html');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Helper function to send status update emails
// const sendStatusUpdateEmail = async (complaint, user, officer, status, isOfficerNotification = false) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: isOfficerNotification ? officer.email : user.email,
//       subject: isOfficerNotification ? `New Complaint Assigned` : `Complaint Status Update: ${status}`,
//       text: isOfficerNotification
//         ? `Dear ${officer.name},\n\nA new complaint has been assigned to you.\n\nDetails:\nTitle: ${complaint.title}\nDescription: ${complaint.description}\nCategory: ${complaint.category}\nStatus: ${status}\nUpdated On: ${new Date().toLocaleString()}\n\nPlease review and take action.\n\nBest regards,\nCCRS Team`
//         : `Dear ${user.name},\n\nYour complaint has been updated.\n\nDetails:\nTitle: ${complaint.title}\nDescription: ${complaint.description}\nCategory: ${complaint.category}\nStatus: ${status}\nUpdated On: ${new Date().toLocaleString()}\n\nThank you for using CCRS.\n\nBest regards,\nCCRS Team`,
//     };
//     await transporter.sendMail(mailOptions);
//   } catch (err) {
//     console.error(`${isOfficerNotification ? 'Officer' : 'User'} email error:`, err);
//   }
// };

// const createComplaint = async (req, res) => {
//   const { title, description, category } = req.body;
//   console.log('Session in createComplaint:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   if (!title || !description || !category) {
//     return res.status(400).json({ error: 'Title, description, and category are required' });
//   }
//   try {
//     const user = await User.findById(req.session.userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     // Sanitize inputs
//     const sanitizedTitle = sanitizeHtml(title, { allowedTags: [], allowedAttributes: {} });
//     const sanitizedDescription = sanitizeHtml(description, { allowedTags: [], allowedAttributes: {} });
//     const validCategories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];
//     if (!validCategories.includes(category)) {
//       return res.status(400).json({ error: 'Invalid category' });
//     }
//     // Find an active officer in the matching department
//     const officer = await Officer.findOne({ department: category, isActive: true });
//     const complaint = new Complaint({
//       title: sanitizedTitle,
//       description: sanitizedDescription,
//       category,
//       complainant: req.session.userId,
//       assignedOfficer: officer ? officer._id : null,
//       history: [{
//         status: 'open',
//         changedAt: new Date(),
//         changedBy: req.session.userId,
//         changedByModel: 'User'
//       }]
//     });
//     await complaint.save();
    
//     // Send email to user (registered)
//     await sendStatusUpdateEmail(complaint, user, null, 'Registered');
    
//     // Send email to assigned officer (if assigned)
//     if (officer) {
//       await sendStatusUpdateEmail(complaint, user, officer, 'Assigned', true);
//       // Notify user of assignment
//       await sendStatusUpdateEmail(complaint, user, officer, 'Assigned');
//     }
    
//     res.status(201).json(complaint);
//   } catch (error) {
//     console.error('Create complaint error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getMyComplaints = async (req, res) => {
//   console.log('Session in getMyComplaints:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const complaints = await Complaint.find({ complainant: req.session.userId })
//       .populate('assignedOfficer', 'name email department')
//       .populate('complainant', 'name email');
//     res.json(complaints);
//   } catch (error) {
//     console.error('Get complaints error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getComplaintById = async (req, res) => {
//   console.log('Session in getComplaintById:', req.session);
//   if (!req.session.userId && !req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   // Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid complaint ID' });
//   }
//   try {
//     const complaint = await Complaint.findById(req.params.id)
//       .populate('assignedOfficer', 'name email department')
//       .populate('complainant', 'name email');
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     // Allow access if user is the complainant or an officer
//     if (
//       req.session.userId &&
//       complaint.complainant._id.toString() !== req.session.userId &&
//       !req.session.officerId
//     ) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     res.json(complaint);
//   } catch (error) {
//     console.error('Get complaint by ID error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAssignedComplaints = async (req, res) => {
//   console.log('Session in getAssignedComplaints:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const complaints = await Complaint.find({ assignedOfficer: req.session.officerId })
//       .populate('assignedOfficer', 'name email department')
//       .populate('complainant', 'name email');
//     res.json(complaints);
//   } catch (error) {
//     console.error('Get assigned complaints error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const updateComplaintStatus = async (req, res) => {
//   console.log('Session in updateComplaintStatus:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   const { status, resolutionRemarks } = req.body;
//   const validStatuses = ['in-progress', 'resolved'];
//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ error: 'Invalid status' });
//   }
//   if (status === 'resolved' && !resolutionRemarks) {
//     return res.status(400).json({ error: 'Resolution remarks are required for resolved status' });
//   }
//   // Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid complaint ID' });
//   }
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     if (complaint.assignedOfficer?.toString() !== req.session.officerId) {
//       return res.status(403).json({ error: 'You are not authorized to update this complaint' });
//     }
//     complaint.status = status;
//     if (status === 'resolved') {
//       complaint.resolutionRemarks = sanitizeHtml(resolutionRemarks, { allowedTags: [], allowedAttributes: {} });
//     }
//     complaint.history.push({
//       status,
//       changedAt: new Date(),
//       changedBy: req.session.officerId,
//       changedByModel: 'Officer'
//     });
//     await complaint.save();
    
//     // Notify user of status update
//     const user = await User.findById(complaint.complainant);
//     if (user) {
//       await sendStatusUpdateEmail(complaint, user, null, status === 'in-progress' ? 'In Progress' : 'Resolved');
//     }
    
//     res.json(complaint);
//   } catch (error) {
//     console.error('Update complaint status error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const reopenComplaint = async (req, res) => {
//   console.log('Session in reopenComplaint:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   // Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid complaint ID' });
//   }
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     if (complaint.complainant.toString() !== req.session.userId) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     if (complaint.status !== 'resolved' && complaint.status !== 'closed') {
//       return res.status(400).json({ error: 'Only resolved or closed complaints can be reopened' });
//     }
//     complaint.status = 'reopened';
//     complaint.isReopened = true;
//     complaint.history.push({
//       status: 'reopened',
//       changedAt: new Date(),
//       changedBy: req.session.userId,
//       changedByModel: 'User'
//     });
//     await complaint.save();
    
//     // Notify assigned officer (if any)
//     if (complaint.assignedOfficer) {
//       const officer = await Officer.findById(complaint.assignedOfficer);
//       if (officer) {
//         await sendStatusUpdateEmail(complaint, null, officer, 'Reopened', true);
//       }
//     }
    
//     res.json(complaint);
//   } catch (error) {
//     console.error('Reopen complaint error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { createComplaint, getMyComplaints, getComplaintById, getAssignedComplaints, updateComplaintStatus, reopenComplaint };
// const mongoose = require('mongoose');
// const Complaint = require('../models/complaint');
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const nodemailer = require('nodemailer');
// const sanitizeHtml = require('sanitize-html');
// const { v4: uuidv4 } = require('uuid');
// const multer = require('multer');
// const path = require('path');
// const QRCode = require('qrcode');
// const fs = require('fs').promises;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed'), false);
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single('photo');

// const sendStatusUpdateEmail = async (complaint, user, officer, status, isOfficerNotification = false) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: isOfficerNotification ? officer.email : user.email,
//       subject: isOfficerNotification ? `New Complaint Assigned` : `Complaint Status Update: ${status}`,
//       text: isOfficerNotification
//         ? `Dear ${officer.name},\n\nA new complaint has been assigned to you.\n\nDetails:\nTitle: ${complaint.title}\nDescription: ${complaint.description}\nCategory: ${complaint.category}\nStatus: ${status}\nUpdated On: ${new Date().toLocaleString()}\n\nPlease review and take action.\n\nBest regards,\nCCRS Team`
//         : `Dear ${user.name},\n\nYour complaint has been updated.\n\nDetails:\nTitle: ${complaint.title}\nDescription: ${complaint.description}\nCategory: ${complaint.category}\nStatus: ${status}\nUpdated On: ${new Date().toLocaleString()}\n\nThank you for using CCRS.\n\nBest regards,\nCCRS Team`,
//     };
//     await transporter.sendMail(mailOptions);
//   } catch (err) {
//     console.error(`${isOfficerNotification ? 'Officer' : 'User'} email error:`, err);
//   }
// };

// const submitPublicComplaint = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     const { name, phone, email, category, description } = req.body;

//     if (!name || !phone || !category || !description) {
//       return res.status(400).json({ error: 'All required fields must be provided' });
//     }
//     if (!/^\+?\d{10,15}$/.test(phone)) {
//       return res.status(400).json({ error: 'Invalid phone number' });
//     }
//     const validCategories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];
//     if (!validCategories.includes(category)) {
//       return res.status(400).json({ error: 'Invalid category' });
//     }

//     try {
//       let user = await User.findOne({ phone });
//       if (!user) {
//         const generatedPassword = Math.random().toString(36).slice(-8);
//         user = new User({
//           name,
//           phone,
//           email: email || undefined,
//           password: generatedPassword,
//           isVerified: true,
//         });
//         await user.save();
//       }

//       const sanitizedTitle = sanitizeHtml(`${category} Complaint by ${name}`, { allowedTags: [], allowedAttributes: {} });
//       const sanitizedDescription = sanitizeHtml(description, { allowedTags: [], allowedAttributes: {} });

//       const officer = await Officer.findOne({ department: category, isActive: true });

//       const trackingId = uuidv4();
//       const complaint = new Complaint({
//         title: sanitizedTitle,
//         description: sanitizedDescription,
//         category,
//         complainant: user._id,
//         trackingId,
//         photo: req.file ? `/uploads/${req.file.filename}` : undefined,
//         assignedOfficer: officer ? officer._id : null,
//         history: [{
//           status: 'open',
//           changedAt: new Date(),
//           changedBy: user._id,
//           changedByModel: 'User',
//         }],
//       });
//       await complaint.save();

//       const trackingLink = `http://localhost:5173/track/${trackingId}`;

//       await sendStatusUpdateEmail(complaint, user, null, 'Registered');
//       if (officer) {
//         await sendStatusUpdateEmail(complaint, user, officer, 'Assigned', true);
//         await sendStatusUpdateEmail(complaint, user, officer, 'Assigned');
//       }

//       if (email) {
//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: 'Your Complaint Tracking Link',
//           html: `
//             <h2>Complaint Submitted Successfully</h2>
//             <p>Your complaint has been received. Use the link below to track its status:</p>
//             <a href="${trackingLink}">${trackingLink}</a>
//             <p>Complaint ID: ${complaint._id}</p>
//             <p>Tracking ID: ${trackingId}</p>
//           `,
//         });
//       }

//       res.status(201).json({
//         message: 'Complaint submitted successfully',
//         complaintId: complaint._id,
//         trackingId,
//         trackingLink,
//       });
//     } catch (error) {
//       console.error('Public complaint error:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
// };

// const trackComplaint = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const complaint = await Complaint.findOne({ trackingId: id })
//       .populate('complainant', 'name email')
//       .populate('assignedOfficer', 'name email department');
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     res.json(complaint);
//   } catch (error) {
//     console.error('Track complaint error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const generateQRCode = async (req, res) => {
//   const qrCodePath = path.join(__dirname, '../public', 'qr-code.png');
//   const qrCodeUrl = '/public/qr-code.png';

//   try {
//     // Check if QR code exists
//     await fs.access(qrCodePath);
//     return res.json({ qrCodeUrl });
//   } catch (error) {
//     // QR code doesn't exist, generate it
//     try {
//       const url = 'http://localhost:5173/complaint/public';
//       const publicDir = path.join(__dirname, '../public');
//       await fs.mkdir(publicDir, { recursive: true });
//       await QRCode.toFile(qrCodePath, url, {
//         errorCorrectionLevel: 'H',
//         width: 200,
//       });
//       res.json({ qrCodeUrl });
//     } catch (err) {
//       console.error('QR code generation error:', err.message, err.stack);
//       res.status(500).json({ error: 'Failed to generate QR code' });
//     }
//   }
// };

// const createComplaint = async (req, res) => {
//   const { title, description, category } = req.body;
//   console.log('Session in createComplaint:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   if (!title || !description || !category) {
//     return res.status(400).json({ error: 'Title, description, and category are required' });
//   }
//   try {
//     const user = await User.findById(req.session.userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const sanitizedTitle = sanitizeHtml(title, { allowedTags: [], allowedAttributes: {} });
//     const sanitizedDescription = sanitizeHtml(description, { allowedTags: [], allowedAttributes: {} });
//     const validCategories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];
//     if (!validCategories.includes(category)) {
//       return res.status(400).json({ error: 'Invalid category' });
//     }
//     const officer = await Officer.findOne({ department: category, isActive: true });
//     const complaint = new Complaint({
//       title: sanitizedTitle,
//       description: sanitizedDescription,
//       category,
//       complainant: req.session.userId,
//       trackingId: uuidv4(),
//       assignedOfficer: officer ? officer._id : null,
//       history: [{
//         status: 'open',
//         changedAt: new Date(),
//         changedBy: req.session.userId,
//         changedByModel: 'User'
//       }],
//     });
//     await complaint.save();
    
//     await sendStatusUpdateEmail(complaint, user, null, 'Registered');
    
//     if (officer) {
//       await sendStatusUpdateEmail(complaint, user, officer, 'Assigned', true);
//       await sendStatusUpdateEmail(complaint, user, officer, 'Assigned');
//     }
    
//     res.status(201).json(complaint);
//   } catch (error) {
//     console.error('Create complaint error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getMyComplaints = async (req, res) => {
//   console.log('Session in getMyComplaints:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const complaints = await Complaint.find({ complainant: req.session.userId })
//       .populate('assignedOfficer', 'name email department')
//       .populate('complainant', 'name email');
//     res.json(complaints);
//   } catch (error) {
//     console.error('Get complaints error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getComplaintById = async (req, res) => {
//   console.log('Session in getComplaintById:', req.session);
//   if (!req.session.userId && !req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid complaint ID' });
//   }
//   try {
//     const complaint = await Complaint.findById(req.params.id)
//       .populate('assignedOfficer', 'name email department')
//       .populate('complainant', 'name email');
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     if (
//       req.session.userId &&
//       complaint.complainant._id.toString() !== req.session.userId &&
//       !req.session.officerId
//     ) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     res.json(complaint);
//   } catch (error) {
//     console.error('Get complaint by ID error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAssignedComplaints = async (req, res) => {
//   console.log('Session in getAssignedComplaints:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const complaints = await Complaint.find({ assignedOfficer: req.session.officerId })
//       .populate('assignedOfficer', 'name email department')
//       .populate('complainant', 'name email');
//     res.json(complaints);
//   } catch (error) {
//     console.error('Get assigned complaints error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const updateComplaintStatus = async (req, res) => {
//   console.log('Session in updateComplaintStatus:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   const { status, resolutionRemarks } = req.body;
//   const validStatuses = ['in-progress', 'resolved'];
//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ error: 'Invalid status' });
//   }
//   if (status === 'resolved' && !resolutionRemarks) {
//     return res.status(400).json({ error: 'Resolution remarks are required for resolved status' });
//   }
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid complaint ID' });
//   }
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     if (complaint.assignedOfficer?.toString() !== req.session.officerId) {
//       return res.status(403).json({ error: 'You are not authorized to update this complaint' });
//     }
//     complaint.status = status;
//     if (status === 'resolved') {
//       complaint.resolutionRemarks = sanitizeHtml(resolutionRemarks, { allowedTags: [], allowedAttributes: {} });
//     }
//     complaint.history.push({
//       status,
//       changedAt: new Date(),
//       changedBy: req.session.officerId,
//       changedByModel: 'Officer'
//     });
//     await complaint.save();
    
//     const user = await User.findById(complaint.complainant);
//     if (user) {
//       await sendStatusUpdateEmail(complaint, user, null, status === 'in-progress' ? 'In Progress' : 'Resolved');
//     }
    
//     res.json(complaint);
//   } catch (error) {
//     console.error('Update complaint status error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const reopenComplaint = async (req, res) => {
//   console.log('Session in reopenComplaint:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid complaint ID' });
//   }
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }
//     if (complaint.complainant.toString() !== req.session.userId) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     if (complaint.status !== 'resolved' && complaint.status !== 'closed') {
//       return res.status(400).json({ error: 'Only resolved or closed complaints can be reopened' });
//     }
//     complaint.status = 'reopened';
//     complaint.isReopened = true;
//     complaint.history.push({
//       status: 'reopened',
//       changedAt: new Date(),
//       changedBy: req.session.userId,
//       changedByModel: 'User'
//     });
//     await complaint.save();
    
//     if (complaint.assignedOfficer) {
//       const officer = await Officer.findById(complaint.assignedOfficer);
//       if (officer) {
//         await sendStatusUpdateEmail(complaint, null, officer, 'Reopened', true);
//       }
//     }
    
//     res.json(complaint);
//   } catch (error) {
//     console.error('Reopen complaint error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { 
//   createComplaint, 
//   getMyComplaints, 
//   getComplaintById, 
//   getAssignedComplaints, 
//   updateComplaintStatus, 
//   reopenComplaint, 
//   submitPublicComplaint, 
//   trackComplaint,
//   generateQRCode 
// };
const mongoose = require('mongoose');
const Complaint = require('../models/complaint');
const User = require('../models/user');
const Officer = require('../models/officer');
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const fs = require('fs').promises;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('photo');

const sendStatusUpdateEmail = async (complaint, user, officer, status, isOfficerNotification = false) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: isOfficerNotification ? officer.email : user.email,
      subject: isOfficerNotification ? `New Complaint Assigned` : `Complaint Status Update: ${status}`,
      text: isOfficerNotification
        ? `Dear ${officer.name},\n\nA new complaint has been assigned to you.\n\nDetails:\nTitle: ${complaint.title}\nDescription: ${complaint.description}\nCategory: ${complaint.category}\nStatus: ${status}\nUpdated On: ${new Date().toLocaleString()}\n\nPlease review and take action.\n\nBest regards,\nCCRS Team`
        : `Dear ${user.name},\n\nYour complaint has been updated.\n\nDetails:\nTitle: ${complaint.title}\nDescription: ${complaint.description}\nCategory: ${complaint.category}\nStatus: ${status}\nUpdated On: ${new Date().toLocaleString()}\n\nThank you for using CCRS.\n\nBest regards,\nCCRS Team`,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(`${isOfficerNotification ? 'Officer' : 'User'} email error:`, err);
  }
};

const submitComplaint = async (req, res, isWhatsApp = false) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, phone, email, category, description } = req.body;

    if (!name || !phone || !category || !description) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }
    const validCategories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    try {
      let user = await User.findOne({ phone });
      if (!user) {
        const generatedPassword = Math.random().toString(36).slice(-8);
        user = new User({
          name,
          phone,
          email: email || undefined,
          password: generatedPassword,
          isVerified: true,
        });
        await user.save();
      }

      const sanitizedTitle = sanitizeHtml(`${category} Complaint by ${name}`, { allowedTags: [], allowedAttributes: {} });
      const sanitizedDescription = sanitizeHtml(description, { allowedTags: [], allowedAttributes: {} });

      const officer = await Officer.findOne({ department: category, isActive: true });

      const trackingId = uuidv4();
      const complaint = new Complaint({
        title: sanitizedTitle,
        description: sanitizedDescription,
        category,
        complainant: user._id,
        trackingId,
        photo: req.file ? `/uploads/${req.file.filename}` : undefined,
        assignedOfficer: officer ? officer._id : null,
        history: [{
          status: 'open',
          changedAt: new Date(),
          changedBy: user._id,
          changedByModel: 'User',
        }],
      });
      await complaint.save();

      const trackingLink = `http://localhost:5173/track/${trackingId}`;

      await sendStatusUpdateEmail(complaint, user, null, 'Registered');
      if (officer) {
        await sendStatusUpdateEmail(complaint, user, officer, 'Assigned', true);
        await sendStatusUpdateEmail(complaint, user, officer, 'Assigned');
      }

      if (email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your Complaint Tracking Link',
          html: `
            <h2>Complaint Submitted Successfully</h2>
            <p>Your complaint has been received. Use the link below to track its status:</p>
            <a href="${trackingLink}">${trackingLink}</a>
            <p>Complaint ID: ${complaint._id}</p>
            <p>Tracking ID: ${trackingId}</p>
          `,
        });
      }

      res.status(201).json({
        message: 'Complaint submitted successfully',
        complaintId: complaint._id,
        trackingId,
        trackingLink,
      });
    } catch (error) {
      console.error('Complaint submission error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

const submitPublicComplaint = async (req, res) => {
  await submitComplaint(req, res, false);
};

const submitWhatsAppComplaint = async (req, res) => {
  await submitComplaint(req, res, true);
};

const trackComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findOne({ trackingId: id })
      .populate('complainant', 'name email')
      .populate('assignedOfficer', 'name email department');
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    console.error('Track complaint error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const generateQRCode = async (req, res) => {
  const qrCodePath = path.join(__dirname, '../public', 'qr-code.png');
  const qrCodeUrl = '/public/qr-code.png';

  try {
    await fs.access(qrCodePath);
    return res.json({ qrCodeUrl });
  } catch (error) {
    try {
      const url = 'http://localhost:5173/complaint/public';
      const publicDir = path.join(__dirname, '../public');
      await fs.mkdir(publicDir, { recursive: true });
      await QRCode.toFile(qrCodePath, url, {
        errorCorrectionLevel: 'H',
        width: 200,
      });
      res.json({ qrCodeUrl });
    } catch (err) {
      console.error('QR code generation error:', err.message);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  }
};

const createComplaint = async (req, res) => {
  const { title, description, category } = req.body;
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required' });
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const sanitizedTitle = sanitizeHtml(title, { allowedTags: [], allowedAttributes: {} });
    const sanitizedDescription = sanitizeHtml(description, { allowedTags: [], allowedAttributes: {} });
    const validCategories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    const officer = await Officer.findOne({ department: category, isActive: true });
    const complaint = new Complaint({
      title: sanitizedTitle,
      description: sanitizedDescription,
      category,
      complainant: req.session.userId,
      trackingId: uuidv4(),
      assignedOfficer: officer ? officer._id : null,
      history: [{
        status: 'open',
        changedAt: new Date(),
        changedBy: req.session.userId,
        changedByModel: 'User'
      }],
    });
    await complaint.save();
    
    await sendStatusUpdateEmail(complaint, user, null, 'Registered');
    
    if (officer) {
      await sendStatusUpdateEmail(complaint, user, officer, 'Assigned', true);
      await sendStatusUpdateEmail(complaint, user, officer, 'Assigned');
    }
    
    res.status(201).json(complaint);
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getMyComplaints = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const complaints = await Complaint.find({ complainant: req.session.userId })
      .populate('assignedOfficer', 'name email department')
      .populate('complainant', 'name email');
    res.json(complaints);
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getComplaintById = async (req, res) => {
  if (!req.session.userId && !req.session.officerId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid complaint ID' });
  }
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('assignedOfficer', 'name email department')
      .populate('complainant', 'name email');
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    if (
      req.session.userId &&
      complaint.complainant._id.toString() !== req.session.userId &&
      !req.session.officerId
    ) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.json(complaint);
  } catch (error) {
    console.error('Get complaint by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAssignedComplaints = async (req, res) => {
  if (!req.session.officerId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const complaints = await Complaint.find({ assignedOfficer: req.session.officerId })
      .popul
      ate('assignedOfficer', 'name email department')
      .populate('complainant', 'name email');
    res.json(complaints);
  } catch (error) {
    console.error('Get assigned complaints error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateComplaintStatus = async (req, res) => {
  if (!req.session.officerId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { status, resolutionRemarks } = req.body;
  const validStatuses = ['in-progress', 'resolved'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  if (status === 'resolved' && !resolutionRemarks) {
    return res.status(400).json({ error: 'Resolution remarks are required for resolved status' });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid complaint ID' });
  }
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    if (complaint.assignedOfficer?.toString() !== req.session.officerId) {
      return res.status(403).json({ error: 'You are not authorized to update this complaint' });
    }
    complaint.status = status;
    if (status === 'resolved') {
      complaint.resolutionRemarks = sanitizeHtml(resolutionRemarks, { allowedTags: [], allowedAttributes: {} });
    }
    complaint.history.push({
      status,
      changedAt: new Date(),
      changedBy: req.session.officerId,
      changedByModel: 'Officer'
    });
    await complaint.save();
    
    const user = await User.findById(complaint.complainant);
    if (user) {
      await sendStatusUpdateEmail(complaint, user, null, status === 'in-progress' ? 'In Progress' : 'Resolved');
    }
    
    res.json(complaint);
  } catch (error) {
    console.error('Update complaint status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const reopenComplaint = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid complaint ID' });
  }
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    if (complaint.complainant.toString() !== req.session.userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    if (complaint.status !== 'resolved' && complaint.status !== 'closed') {
      return res.status(400).json({ error: 'Only resolved or closed complaints can be reopened' });
    }
    complaint.status = 'reopened';
    complaint.isReopened = true;
    complaint.history.push({
      status: 'reopened',
      changedAt: new Date(),
      changedBy: req.session.userId,
      changedByModel: 'User'
    });
    await complaint.save();
    
    if (complaint.assignedOfficer) {
      const officer = await Officer.findById(complaint.assignedOfficer);
      if (officer) {
        await sendStatusUpdateEmail(complaint, null, officer, 'Reopened', true);
      }
    }
    
    res.json(complaint);
  } catch (error) {
    console.error('Reopen complaint error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { 
  createComplaint, 
  getMyComplaints, 
  getComplaintById, 
  getAssignedComplaints, 
  updateComplaintStatus, 
  reopenComplaint, 
  submitPublicComplaint, 
  trackComplaint,
  generateQRCode,
  submitWhatsAppComplaint 
};