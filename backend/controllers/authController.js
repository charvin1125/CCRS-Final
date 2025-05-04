// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, phone, password: hashedPassword });
//     await user.save();
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     req.session.otp = otp;
//     req.session.email = email;
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'CCRS OTP Verification',
//       text: `Your OTP for CCRS registration is ${otp}.`,
//     };
//     await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
//     res.json({ message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { otp } = req.body;
//   try {
//     if (otp === req.session.otp) {
//       const user = await User.findOneAndUpdate(
//         { email: req.session.email },
//         { isVerified: true },
//         { new: true }
//       );
//       if (user) {
//         req.session.destroy();
//         res.json({ message: 'Registration successful' });
//       } else {
//         res.status(400).json({ error: 'User not found' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) {
//       return res.status(400).json({ error: 'Invalid credentials or unverified account' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.userId = user._id;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after login:', req.session);
//       res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     req.session.destroy();
//     res.json({ message: 'Logout successful' });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   console.log('Session in getUser:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const user = await User.findById(req.session.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, verifyOtp, login, logout, getUser };
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, phone, password: hashedPassword });
//     await user.save();
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     req.session.otp = otp;
//     req.session.email = email;
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'CCRS OTP Verification',
//       text: `Your OTP for CCRS registration is ${otp}.`,
//     };
//     await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
//     res.json({ message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { otp } = req.body;
//   try {
//     if (otp === req.session.otp) {
//       const user = await User.findOneAndUpdate(
//         { email: req.session.email },
//         { isVerified: true },
//         { new: true }
//       );
//       if (user) {
//         req.session.destroy();
//         res.json({ message: 'Registration successful' });
//       } else {
//         res.status(400).json({ error: 'User not found' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) {
//       return res.status(400).json({ error: 'Invalid credentials or unverified account' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.userId = user._id;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after login:', req.session);
//       res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const officerLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Officer login attempt:', { email, password });
//   try {
//     const officer = await Officer.findOne({ email });
//     console.log('Found officer:', officer);
//     if (!officer || !officer.isActive) {
//       return res.status(400).json({ error: 'Invalid credentials or inactive account' });
//     }
//     const isMatch = await bcrypt.compare(password, officer.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.officerId = officer._id;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after officer login:', req.session);
//       res.json({ message: 'Officer login successful', officer: { id: officer._id, name: officer.name, email: officer.email, department: officer.department } });
//     });
//   } catch (error) {
//     console.error('Officer login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     req.session.destroy();
//     res.json({ message: 'Logout successful' });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   console.log('Session in getUser:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const user = await User.findById(req.session.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getOfficer = async (req, res) => {
//   console.log('Session in getOfficer:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const officer = await Officer.findById(req.session.officerId).select('-password');
//     if (!officer) {
//       return res.status(404).json({ error: 'Officer not found' });
//     }
//     res.json(officer);
//   } catch (error) {
//     console.error('Get officer error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, verifyOtp, login, officerLogin, logout, getUser, getOfficer };
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, phone, password: hashedPassword });
//     await user.save();
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     req.session.otp = otp;
//     req.session.email = email;
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'CCRS OTP Verification',
//       text: `Your OTP for CCRS registration is ${otp}.`,
//     };
//     await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
//     res.json({ message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { otp } = req.body;
//   try {
//     if (otp === req.session.otp) {
//       const user = await User.findOneAndUpdate(
//         { email: req.session.email },
//         { isVerified: true },
//         { new: true }
//       );
//       if (user) {
//         req.session.destroy();
//         res.json({ message: 'Registration successful' });
//       } else {
//         res.status(400).json({ error: 'User not found' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) {
//       return res.status(400).json({ error: 'Invalid credentials or unverified account' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.userId = user._id;
//     req.session.userRole = user.role; // Store role for admin checks
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after login:', req.session);
//       res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const officerLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Officer login attempt:', { email, password });
//   try {
//     const officer = await Officer.findOne({ email });
//     console.log('Found officer:', officer);
//     if (!officer || !officer.isActive) {
//       return res.status(400).json({ error: 'Invalid credentials or inactive account' });
//     }
//     const isMatch = await bcrypt.compare(password, officer.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.officerId = officer._id;
//     req.session.officerRole = officer.role; // Store role for admin checks
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after officer login:', req.session);
//       res.json({ message: 'Officer login successful', officer: { id: officer._id, name: officer.name, email: officer.email, department: officer.department, role: officer.role } });
//     });
//   } catch (error) {
//     console.error('Officer login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     req.session.destroy();
//     res.json({ message: 'Logout successful' });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   console.log('Session in getUser:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const user = await User.findById(req.session.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getOfficer = async (req, res) => {
//   console.log('Session in getOfficer:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const officer = await Officer.findById(req.session.officerId).select('-password');
//     if (!officer) {
//       return res.status(404).json({ error: 'Officer not found' });
//     }
//     res.json(officer);
//   } catch (error) {
//     console.error('Get officer error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, verifyOtp, login, officerLogin, logout, getUser, getOfficer };
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, phone, password: hashedPassword });
//     await user.save();
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     req.session.otp = otp;
//     req.session.email = email;
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'CCRS OTP Verification',
//       text: `Your OTP for CCRS registration is ${otp}.`,
//     };
//     await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
//     res.json({ message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { otp } = req.body;
//   try {
//     if (otp === req.session.otp) {
//       const user = await User.findOneAndUpdate(
//         { email: req.session.email },
//         { isVerified: true },
//         { new: true }
//       );
//       if (user) {
//         req.session.destroy();
//         res.json({ message: 'Registration successful' });
//       } else {
//         res.status(400).json({ error: 'User not found' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) {
//       return res.status(400).json({ error: 'Invalid credentials or unverified account' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.userId = user._id;
//     req.session.userRole = user.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after login:', req.session);
//       res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const officerLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Officer login attempt:', { email, password });
//   try {
//     const officer = await Officer.findOne({ email });
//     console.log('Found officer:', officer);
//     if (!officer || !officer.isActive) {
//       return res.status(400).json({ error: 'Invalid credentials or inactive account' });
//     }
//     const isMatch = await bcrypt.compare(password, officer.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.officerId = officer._id;
//     req.session.officerRole = officer.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after officer login:', req.session);
//       res.json({ message: 'Officer login successful', officer: { id: officer._id, name: officer.name, email: officer.email, department: officer.department, role: officer.role } });
//     });
//   } catch (error) {
//     console.error('Officer login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Admin login attempt:', { email, password });
//   try {
//     const admin = await Admin.findOne({ email });
//     console.log('Found admin:', admin);
//     if (!admin) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.adminId = admin._id;
//     req.session.adminRole = admin.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after admin login:', req.session);
//       res.json({ message: 'Admin login successful', admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
//     });
//   } catch (error) {
//     console.error('Admin login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     req.session.destroy();
//     res.json({ message: 'Logout successful' });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   console.log('Session in getUser:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const user = await User.findById(req.session.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getOfficer = async (req, res) => {
//   console.log('Session in getOfficer:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const officer = await Officer.findById(req.session.officerId).select('-password');
//     if (!officer) {
//       return res.status(404).json({ error: 'Officer not found' });
//     }
//     res.json(officer);
//   } catch (error) {
//     console.error('Get officer error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAdmin = async (req, res) => {
//   console.log('Session in getAdmin:', req.session);
//   if (!req.session.adminId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const admin = await Admin.findById(req.session.adminId).select('-password');
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }
//     res.json(admin);
//   } catch (error) {
//     console.error('Get admin error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, verifyOtp, login, officerLogin, adminLogin, logout, getUser, getOfficer, getAdmin };
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, phone, password: hashedPassword });
//     await user.save();
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     req.session.otp = otp;
//     req.session.email = email;
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'CCRS OTP Verification',
//       text: `Your OTP for CCRS registration is ${otp}.`,
//     };
//     await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
//     res.json({ message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { otp } = req.body;
//   try {
//     if (otp === req.session.otp) {
//       const user = await User.findOneAndUpdate(
//         { email: req.session.email },
//         { isVerified: true },
//         { new: true }
//       );
//       if (user) {
//         req.session.destroy();
//         res.json({ message: 'Registration successful' });
//       } else {
//         res.status(400).json({ error: 'User not found' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) {
//       return res.status(400).json({ error: 'Invalid credentials or unverified account' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.userId = user._id;
//     req.session.userRole = user.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after login:', req.session);
//       res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const officerLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Officer login attempt:', { email, password });
//   try {
//     const officer = await Officer.findOne({ email });
//     console.log('Found officer:', officer);
//     if (!officer || !officer.isActive) {
//       return res.status(400).json({ error: 'Invalid credentials or inactive account' });
//     }
//     const isMatch = await bcrypt.compare(password, officer.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.officerId = officer._id;
//     req.session.officerRole = officer.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after officer login:', req.session);
//       res.json({ message: 'Officer login successful', officer: { id: officer._id, name: officer.name, email: officer.email, department: officer.department, role: officer.role } });
//     });
//   } catch (error) {
//     console.error('Officer login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Admin login attempt:', { email, password });
//   try {
//     const admin = await Admin.findOne({ email });
//     console.log('Found admin:', admin);
//     if (!admin) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.adminId = admin._id;
//     req.session.adminRole = admin.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after admin login:', req.session);
//       res.json({ message: 'Admin login successful', admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
//     });
//   } catch (error) {
//     console.error('Admin login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Session destroy error:', err);
//         return res.status(500).json({ error: 'Failed to logout' });
//       }
//       res.clearCookie('connect.sid'); // Clear session cookie
//       res.json({ message: 'Logout successful' });
//     });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   console.log('Session in getUser:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const user = await User.findById(req.session.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getOfficer = async (req, res) => {
//   console.log('Session in getOfficer:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const officer = await Officer.findById(req.session.officerId).select('-password');
//     if (!officer) {
//       return res.status(404).json({ error: 'Officer not found' });
//     }
//     res.json(officer);
//   } catch (error) {
//     console.error('Get officer error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAdmin = async (req, res) => {
//   console.log('Session in getAdmin:', req.session);
//   if (!req.session.adminId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const admin = await Admin.findById(req.session.adminId).select('-password');
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }
//     res.json(admin);
//   } catch (error) {
//     console.error('Get admin error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, verifyOtp, login, officerLogin, adminLogin, logout, getUser, getOfficer, getAdmin };
// const User = require('../models/user');
// const Officer = require('../models/officer');
// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, phone, password: hashedPassword });
//     await user.save();
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     req.session.otp = otp;
//     req.session.email = email;
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'CCRS OTP Verification',
//       text: `Your OTP for CCRS registration is ${otp}.`,
//     };
//     await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
//     res.json({ message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { otp } = req.body;
//   try {
//     if (otp === req.session.otp) {
//       const user = await User.findOneAndUpdate(
//         { email: req.session.email },
//         { isVerified: true },
//         { new: true }
//       );
//       if (user) {
//         req.session.destroy();
//         res.json({ message: 'Registration successful' });
//       } else {
//         res.status(400).json({ error: 'User not found' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) {
//       return res.status(400).json({ error: 'Invalid credentials or unverified account' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.userId = user._id;
//     req.session.userRole = user.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after login:', req.session);
//       res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const officerLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Officer login attempt:', { email, password });
//   try {
//     const officer = await Officer.findOne({ email });
//     console.log('Found officer:', officer);
//     if (!officer || !officer.isActive) {
//       return res.status(400).json({ error: 'Invalid credentials or inactive account' });
//     }
//     const isMatch = await bcrypt.compare(password, officer.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.officerId = officer._id;
//     req.session.officerRole = officer.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after officer login:', req.session);
//       res.json({ message: 'Officer login successful', officer: { id: officer._id, name: officer.name, email: officer.email, department: officer.department, role: officer.role } });
//     });
//   } catch (error) {
//     console.error('Officer login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Admin login attempt:', { email, password });
//   try {
//     const admin = await Admin.findOne({ email });
//     console.log('Found admin:', admin);
//     if (!admin) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     console.log('Password match:', isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     req.session.adminId = admin._id;
//     req.session.adminRole = admin.role;
//     req.session.save(err => {
//       if (err) console.error('Session save error:', err);
//       console.log('Session after admin login:', req.session);
//       res.json({ message: 'Admin login successful', admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
//     });
//   } catch (error) {
//     console.error('Admin login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Session destroy error:', err);
//         return res.status(500).json({ error: 'Failed to logout' });
//       }
//       res.clearCookie('connect.sid');
//       res.json({ message: 'Logout successful' });
//     });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   console.log('Session in getUser:', req.session);
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const user = await User.findById(req.session.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getOfficer = async (req, res) => {
//   console.log('Session in getOfficer:', req.session);
//   if (!req.session.officerId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const officer = await Officer.findById(req.session.officerId).select('-password');
//     if (!officer) {
//       return res.status(404).json({ error: 'Officer not found' });
//     }
//     res.json(officer);
//   } catch (error) {
//     console.error('Get officer error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAdmin = async (req, res) => {
//   console.log('Session in getAdmin:', req.session);
//   if (!req.session.adminId) {
//     return res.status(401).json({ error: 'Not authenticated' });
//   }
//   try {
//     const admin = await Admin.findById(req.session.adminId).select('-password');
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }
//     res.json(admin);
//   } catch (error) {
//     console.error('Get admin error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { register, verifyOtp, login, officerLogin, adminLogin, logout, getUser, getOfficer, getAdmin };
const User = require('../models/user');
const Officer = require('../models/officer');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    req.session.otp = otp;
    req.session.email = email;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'CCRS OTP Verification',
      text: `Your OTP for CCRS registration is ${otp}.`,
    };
    await transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));
    
    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  try {
    if (otp === req.session.otp) {
      const user = await User.findOneAndUpdate(
        { email: req.session.email },
        { isVerified: true },
        { new: true }
      );
      if (user) {
        req.session.destroy();
        res.json({ message: 'Registration successful' });
      } else {
        res.status(400).json({ error: 'User not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(400).json({ error: 'Invalid credentials or unverified account' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    req.session.userRole = user.role;
    req.session.save(err => {
      if (err) console.error('Session save error:', err);
      console.log('Session after login:', req.session);
      res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const officerLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Officer login attempt:', { email });
  try {
    const officer = await Officer.findOne({ email });
    if (!officer || !officer.isActive) {
      return res.status(400).json({ error: 'Invalid credentials or inactive account' });
    }
    const isMatch = await bcrypt.compare(password, officer.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.officerId = officer._id;
    req.session.officerRole = officer.role;
    req.session.save(err => {
      if (err) console.error('Session save error:', err);
      console.log('Session after officer login:', req.session);
      res.json({ message: 'Officer login successful', officer: { id: officer._id, name: officer.name, email: officer.email, department: officer.department, role: officer.role } });
    });
  } catch (error) {
    console.error('Officer login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Admin login attempt:', { email });
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.adminId = admin._id;
    req.session.adminRole = admin.role;
    req.session.save(err => {
      if (err) console.error('Session save error:', err);
      console.log('Session after admin login:', req.session);
      res.json({ message: 'Admin login successful', admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const logout = async (req, res) => {
  console.log('Logout attempt, current session:', req.session);
  try {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.clearCookie('connect.sid', { path: '/', sameSite: 'lax', httpOnly: true });
      console.log('Session destroyed and cookie cleared');
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUser = async (req, res) => {
  console.log('Session in getUser:', req.session);
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getOfficer = async (req, res) => {
  console.log('Session in getOfficer:', req.session);
  if (!req.session.officerId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const officer = await Officer.findById(req.session.officerId).select('-password');
    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }
    res.json(officer);
  } catch (error) {
    console.error('Get officer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAdmin = async (req, res) => {
  console.log('Session in getAdmin:', req.session);
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const admin = await Admin.findById(req.session.adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, verifyOtp, login, officerLogin, adminLogin, logout, getUser, getOfficer, getAdmin };
