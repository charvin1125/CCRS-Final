// const mongoose = require('mongoose');

// const complaintSchema = new mongoose.Schema({
//   title: { type: String, required: true, maxlength: 100 },
//   description: { type: String, required: true, maxlength: 1000 },
//   complainant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { 
//     type: String, 
//     enum: ['open', 'in-progress', 'resolved', 'escalated', 'reopened', 'closed'], 
//     default: 'open' 
//   },
//   assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer', default: null },
//   category: { type: String, required: true },
//   escalatedLevel: { type: Number, default: 0 },
//   resolutionRemarks: { type: String, maxlength: 1000 },
//   isReopened: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   history: [{
//     status: { type: String, enum: ['open', 'in-progress', 'resolved', 'escalated', 'reopened', 'closed'] },
//     changedAt: { type: Date, default: Date.now },
//     changedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'history.changedByModel' },
//     changedByModel: { type: String, enum: ['User', 'Officer'] }
//   }]
// });

// // Update updatedAt automatically
// complaintSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Indexes for performance
// complaintSchema.index({ complainant: 1, createdAt: -1 });
// complaintSchema.index({ assignedOfficer: 1, createdAt: -1 });

// module.exports = mongoose.model('Complaint', complaintSchema);
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 1000 },
  complainant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['open', 'in-progress', 'resolved', 'escalated', 'reopened', 'closed'], 
    default: 'open' 
  },
  assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer', default: null },
  category: { 
    type: String, 
    enum: ['Water Supply', 'Electricity', 'Roads', 'Sanitation', 'Public Transport'], 
    required: true 
  },
  escalatedLevel: { type: Number, default: 0 },
  resolutionRemarks: { type: String, maxlength: 1000 },
  isReopened: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  trackingId: { type: String, unique: true, required: true },
  photo: { type: String },
  history: [{
    status: { type: String, enum: ['open', 'in-progress', 'resolved', 'escalated', 'reopened', 'closed'] },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'history.changedByModel' },
    changedByModel: { type: String, enum: ['User', 'Officer'] }
  }],
});

complaintSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

complaintSchema.index({ complainant: 1, createdAt: -1 });
complaintSchema.index({ assignedOfficer: 1, createdAt: -1 });
complaintSchema.index({ trackingId: 1 });

module.exports = mongoose.model('Complaint', complaintSchema);