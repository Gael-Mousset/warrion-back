import * as mongoose from 'mongoose';

export const WarrantySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  warrantyDurationMonths: { type: Number, required: true },
  brand: { type: String, default: '' },
  serialNumber: { type: String, default: '' },
  store: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  notes: { type: String, default: '' },
  isPrecious: { type: Boolean, default: false },
  documents: [{
    name: { type: String },
    dataUrl: { type: String },
    type: { type: String },
  }],
  createdAt: { type: Date, default: Date.now },
});
