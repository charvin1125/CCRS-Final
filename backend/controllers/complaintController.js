// const jwt = require('jsonwebtoken');
// const Complaint = require('../models/complaint');

// exports.submitComplaint = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const complaint = new Complaint({
//       title,
//       description,
//       complainant: decoded.id,
//     });
//     await complaint.save();
//     res.status(201).json({ message: 'Complaint submitted successfully', complaint });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getComplaints = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'officer' && decoded.role !== 'admin') {
//       return res.status(403).json({ error: 'Unauthorized' });
//     }
//     const complaints = await Complaint.find().populate('complainant', 'name email');
//     res.json(complaints);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const Complaint = require('../models/complaint');

exports.submitComplaint = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const { title, description } = req.body;
    const complaint = new Complaint({
      title,
      description,
      complainant: req.session.user.id,
    });
    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (req.session.user.role !== 'officer' && req.session.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const complaints = await Complaint.find().populate('complainant', 'name email');
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCitizenComplaints = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const complaints = await Complaint.find({ complainant: req.session.user.id }).populate(
      'complainant',
      'name email'
    );
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};