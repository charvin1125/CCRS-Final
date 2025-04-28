// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const User = require('../models/user');

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// exports.generateOtp = async (req, res) => {
//   try {
//     const { email, phone } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     const tempUser = new User({ email, phone, otp, otpExpires });
//     await tempUser.save();

//     await transporter.sendMail({
//       from: `"CCRS Portal" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Your OTP for CCRS Registration',
//       text: `Your OTP for CCRS registration is ${otp}. It is valid for 10 minutes.`,
//     });

//     res.json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, phone, otp, name, password } = req.body;
//     const user = await User.findOne({ email, phone, otp, otpExpires: { $gt: new Date() } });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired OTP' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.name = name;
//     user.password = hashedPassword;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.generateOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const tempUser = new User({ email, phone, otp, otpExpires });
    await tempUser.save();

    await transporter.sendMail({
      from: `"CCRS Portal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for CCRS Registration',
      text: `Your OTP for CCRS registration is ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, phone, otp, name, password } = req.body;
    const user = await User.findOne({ email, phone, otp, otpExpires: { $gt: new Date() } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.name = name;
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Store user info in session
    req.session.user = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const user = await User.findById(req.session.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ error: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};