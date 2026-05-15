const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: '',
  },
  reviewText: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Review', reviewSchema);
