// const Officer = require('../models/officer');
// const bcrypt = require('bcryptjs');

// const registerOfficer = async (req, res) => {
//   const { name, email, phone, password, department, designation, role } = req.body;
  
//   // Check if admin is authenticated
//   if (!req.session.userId && !req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
  
//   // Check if user is admin
//   const isAdmin = (req.session.userRole === 'admin' || req.session.officerRole === 'admin');
//   if (!isAdmin) {
//     return res.status(403).json({ error: 'Admin access required' });
//   }
  
//   try {
//     let officer = await Officer.findOne({ email });
//     if (officer) {
//       return res.status(400).json({ error: 'Officer already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     officer = new Officer({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       department,
//       designation,
//       role: role || 'officer', // Default to 'officer' if not specified
//       isActive: true,
//     });
//     await officer.save();
//     res.json({ message: 'Officer registered successfully' });
//   } catch (error) {
//     console.error('Register officer error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { registerOfficer };
const Officer = require('../models/officer');
const Complaint = require('../models/complaint');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const registerOfficer = async (req, res) => {
  const { name, email, phone, password, department, designation, role } = req.body;
  
  if (!req.session.userId && !req.session.officerId && !req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const isAdmin = (
    req.session.userRole === 'admin' || 
    req.session.officerRole === 'admin' || 
    req.session.adminRole === 'admin'
  );
  if (!isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  try {
    let officer = await Officer.findOne({ email });
    if (officer) {
      return res.status(400).json({ error: 'Officer already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    officer = new Officer({
      name,
      email,
      phone,
      password: hashedPassword,
      department,
      designation,
      role: role || 'officer',
      isActive: true,
    });
    await officer.save();
    res.json({ message: 'Officer registered successfully' });
  } catch (error) {
    console.error('Register officer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// const getComplaints = async (req, res) => {
//   if (!req.session.adminId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
  
//   try {
//     const complaints = await Complaint.find({ complainant: { $exists: true, $ne: null } })
//       .populate('complainant', 'name')
//       .sort({ createdAt: -1 });
//     res.json(complaints);
//   } catch (error) {
//     console.error('Get complaints error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
const getComplaints = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const complaints = await Complaint.find({
      complainant: { $exists: true, $ne: null },
      $expr: { $eq: [{ $type: '$complainant' }, 'objectId'] },
      createdAt: { $exists: true, $ne: null }
    })
      .populate('complainant', 'name')
      .sort({ createdAt: -1 });
    
    // Filter out any null complainant after populate and log
    const validComplaints = complaints.filter(complaint => {
      if (!complaint.complainant) {
        console.warn('Complaint with null complainant after populate:', complaint._id);
        return false;
      }
      return true;
    });

    console.log('Complaints sent:', validComplaints);
    res.json(validComplaints);
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getDashboardData = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    // Only fetch complaints with valid complainant ObjectIds
    const complaints = await Complaint.find({
      complainant: { $exists: true, $ne: null },
      $expr: { $eq: [{ $type: '$complainant' }, 'objectId'] }
    })
      .populate('complainant', 'name')
      .sort({ createdAt: -1 })
      .limit(50);
    
    // Log any complaints with null complainant after populate
    complaints.forEach(complaint => {
      if (!complaint.complainant) {
        console.warn('Complaint with null complainant after populate:', complaint._id);
      }
    });
    
    const users = await User.find({ role: 'citizen' }).select('name email role').limit(50);
    const officers = await Officer.find().select('name email department role').limit(50);
    
    res.json({
      complaints,
      users,
      officers,
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getOfficers = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const officers = await Officer.find().select('name email department designation role isActive');
    res.json(officers);
  } catch (error) {
    console.error('Get officers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteOfficer = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const officer = await Officer.findById(req.params.id);
    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }
    await Officer.deleteOne({ _id: req.params.id });
    res.json({ message: 'Officer deleted successfully' });
  } catch (error) {
    console.error('Delete officer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const users = await User.find({ role: 'citizen' }).select('name email role isVerified');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete associated complaints
    await Complaint.deleteMany({ complainant: req.params.id });
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerOfficer,
  getComplaints,
  getDashboardData,
  getOfficers,
  deleteOfficer,
  getUsers,
  deleteUser,
};