import * as mongoose from 'mongoose';

export const connectDB = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      const uri = process.env.MONGODB_URI;
      if (!uri) throw new Error('MONGODB_URI is not defined');
      return mongoose.connect(uri);
    },
  },
];
