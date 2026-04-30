import * as mongoose from 'mongoose';

export const WarrantySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  warrantyDurationMonths: { type: Number, required: true },
  photoUrl: { type: String, default: '' },
  notes: { type: String, default: '' },
  isPrecious: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
