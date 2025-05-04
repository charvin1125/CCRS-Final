// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');
// const complaintRoutes = require('./routes/complaints');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collectionName: 'sessions',
//     ttl: 24 * 60 * 60, // 1 day
//     autoRemove: 'native', // Automatically remove expired sessions
//   }),
//   cookie: {
//     secure: false, // Set to false for local development
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     sameSite: 'lax',
//     path: '/',
//   },
// }));
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Session:`, req.session);
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/complaints', complaintRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// require('dotenv').config();
// const path = require('path');
// const fs = require('fs').promises;
// const QRCode = require('qrcode');

// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');
// const complaintRoutes = require('./routes/complaints');

// const app = express();

// // Create public directory and generate QR code on startup
// const initializeQRCode = async () => {
//   const publicDir = path.join(__dirname, 'public');
//   const qrCodePath = path.join(publicDir, 'qr-code.png');
//   const url = 'http://localhost:5173/complaint/public';

//   try {
//     await fs.mkdir(publicDir, { recursive: true });
//     await QRCode.toFile(qrCodePath, url, {
//       errorCorrectionLevel: 'H',
//       width: 200,
//     });
//     console.log('QR code generated at:', qrCodePath);
//   } catch (error) {
//     console.error('Failed to initialize QR code:', error.message);
//   }
// };

// initializeQRCode();

// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collectionName: 'sessions',
//     ttl: 24 * 60 * 60,
//     autoRemove: 'native',
//   }),
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000,
//     sameSite: 'lax',
//     path: '/',
//   },
// }));
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Session:`, req.session);
//   next();
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/complaints', complaintRoutes);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const path = require('path');
const fs = require('fs').promises;
const QRCode = require('qrcode');
const { handleMessage, sendMessage } = require('./controllers/gupshupBot');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const complaintRoutes = require('./routes/complaints');

const app = express();

// Create public directory and generate QR codes on startup
const initializeQRCodes = async () => {
  const publicDir = path.join(__dirname, 'public');
  const qrCodePath = path.join(publicDir, 'qr-code.png');
  const gupshupQrCodePath = path.join(publicDir, 'gupshup-whatsapp-qr.png');
  const complaintUrl = 'http://localhost:5173/complaint/public';
  const gupshupUrl = `https://wa.me/${process.env.GUPSHUP_PHONE_NUMBER}?text=File%20Complaint`;

  try {
    await fs.mkdir(publicDir, { recursive: true });
    await QRCode.toFile(qrCodePath, complaintUrl, {
      errorCorrectionLevel: 'H',
      width: 200,
    });
    await QRCode.toFile(gupshupQrCodePath, gupshupUrl, {
      errorCorrectionLevel: 'H',
      width: 200,
    });
    console.log('QR codes generated at:', qrCodePath, gupshupQrCodePath);
  } catch (error) {
    console.error('Failed to initialize QR codes:', error.message);
  }
};

initializeQRCodes();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60,
    autoRemove: 'native',
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    path: '/',
  },
}));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Session:`, req.session);
  next();
});

// Gupshup webhook
app.post('/api/gupshup/webhook', async (req, res) => {
  const { payload } = req.body;
  if (!payload || !payload.sender) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const from = payload.sender.phone;
  const message = payload.message?.text;
  const mediaUrl = payload.message?.type === 'image' ? payload.message.image?.link : null;

  try {
    const response = await handleMessage(from, message, mediaUrl);
    await sendMessage(from, response);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Gupshup webhook error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/complaints', complaintRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});