import { Connection } from 'mongoose';
import { WarrantySchema } from './schemas/warranty.schema';

export const warrantiesProviders = [
  {
    provide: 'WARRANTY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Warranty', WarrantySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
