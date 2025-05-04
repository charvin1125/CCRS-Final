const axios = require('axios');
const sanitizeHtml = require('sanitize-html');
const { v4: uuidv4 } = require('uuid');

// In-memory conversation state (use MongoDB for production)
const userStates = {};

// Valid categories
const categories = ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'];

const handleMessage = async (from, message, mediaUrl) => {
  let response = '';
  let state = userStates[from] || { step: 'start' };

  // Clean incoming message
  const cleanMessage = message ? message.trim().toLowerCase() : '';

  switch (state.step) {
    case 'start':
      state = { step: 'name', data: {} };
      response = 'Welcome! Let’s file your complaint. What’s your name?';
      break;

    case 'name':
      if (!cleanMessage) {
        response = 'Please provide your name.';
      } else {
        state.data.name = sanitizeHtml(cleanMessage, { allowedTags: [], allowedAttributes: {} });
        state.step = 'phone';
        response = 'Thanks! What’s your phone number? (e.g., +1234567890)';
      }
      break;

    case 'phone':
      if (!/^\+?\d{10,15}$/.test(cleanMessage)) {
        response = 'Invalid phone number. Please provide a valid number (e.g., +1234567890).';
      } else {
        state.data.phone = cleanMessage;
        state.step = 'category';
        response = `Choose a category:\n${categories.map((cat, i) => `${i + 1}. ${cat}`).join('\n')}`;
      }
      break;

    case 'category':
      const categoryIndex = parseInt(cleanMessage) - 1;
      if (categoryIndex >= 0 && categoryIndex < categories.length) {
        state.data.category = categories[categoryIndex];
        state.step = 'description';
        response = 'Describe the issue in detail.';
      } else {
        response = `Invalid choice. Please select a number between 1 and ${categories.length}.`;
      }
      break;

    case 'description':
      if (!cleanMessage) {
        response = 'Please provide a description of the issue.';
      } else {
        state.data.description = sanitizeHtml(cleanMessage, { allowedTags: [], allowedAttributes: {} });
        state.step = 'photo';
        response = 'Upload a photo (optional, reply “skip” to skip).';
      }
      break;

    case 'photo':
      if (cleanMessage === 'skip' || mediaUrl) {
        state.data.photoUrl = mediaUrl || null;
        state.step = 'email';
        response = 'Optional: What’s your email address? (Reply “skip” to skip)';
      } else {
        response = 'Please upload an image or reply “skip” to proceed.';
      }
      break;

    case 'email':
      if (cleanMessage === 'skip' || !cleanMessage || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanMessage)) {
        state.data.email = cleanMessage === 'skip' ? '' : cleanMessage;
        state.step = 'submit';
        response = await submitComplaint(from, state.data);
        delete userStates[from]; // Clear state
      } else {
        response = 'Invalid email. Please provide a valid email or reply “skip”.';
      }
      break;

    default:
      response = 'Something went wrong. Reply “File Complaint” to start over.';
      delete userStates[from];
      break;
  }

  userStates[from] = state;
  return response;
};

const submitComplaint = async (from, data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('category', data.category);
    formData.append('description', data.description);

    if (data.photoUrl) {
      // Download photo from Twilio media URL
      const photoResponse = await axios.get(data.photoUrl, { responseType: 'arraybuffer' });
      const photoBuffer = Buffer.from(photoResponse.data);
      formData.append('photo', photoBuffer, {
        filename: `${uuidv4()}.jpg`,
        contentType: 'image/jpeg',
      });
    }

    const response = await axios.post('http://localhost:5000/api/complaints/whatsapp', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return `Complaint submitted successfully!\nComplaint ID: ${response.data.complaintId}\nTrack it here: ${response.data.trackingLink}`;
  } catch (error) {
    console.error('WhatsApp complaint submission error:', error.message);
    return 'Failed to submit complaint. Please try again later.';
  }
};

module.exports = { handleMessage };