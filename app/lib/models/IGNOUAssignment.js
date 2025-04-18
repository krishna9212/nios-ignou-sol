import mongoose from 'mongoose';

const IGNOUAssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  document: {
    type: Object,
    required: true,
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https:\/\/drive\.google\.com\/.+$/.test(v),
        message: 'Document link must be a valid Google Drive URL',
      },
    },
    fileName: {
      type: String,
      required: false, // fileName is not strictly required, if it's provided, it will be stored
    },
  },
  hasPractical: {
    type: Boolean,
    default: false,
  },
  language: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.IGNOUAssignment || mongoose.model('IGNOUAssignment', IGNOUAssignmentSchema);
