import * as mongoose from 'mongoose';

export const connectDB = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/warrion'),
  },
];
