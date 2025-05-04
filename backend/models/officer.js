const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true }, // Example: "Water Supply", "Electricity", "Roads"
  designation: { type: String }, // Example: "Junior Engineer", "Supervisor"
  isActive: { type: Boolean, default: true }, // Useful for disabling accounts
  role: { type: String, enum: ['officer', 'senior_officer', 'admin'], default: 'officer' }, // For escalation
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
officerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Officer', officerSchema);