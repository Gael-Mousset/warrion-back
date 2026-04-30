import { Document, Types } from 'mongoose';

export interface Warranty extends Document {
  readonly userId: Types.ObjectId;
  readonly name: string;
  readonly category: string;
  readonly purchaseDate: string;
  readonly warrantyDurationMonths: number;
  readonly photoUrl: string;
  readonly notes: string;
  readonly isPrecious: boolean;
  readonly createdAt: Date;
}
