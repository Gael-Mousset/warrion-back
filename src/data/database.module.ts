import { Module } from '@nestjs/common';
import { connectDB } from './database.providers';

@Module({
  providers: [...connectDB],
  exports: [...connectDB],
})
export class DatabaseModule {}
