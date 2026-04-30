import { Module } from '@nestjs/common';
import { WarrantiesController } from './warranties.controller';
import { WarrantiesService } from './warranties.service';
import { warrantiesProviders } from './warranties.providers';
import { DatabaseModule } from '../data/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WarrantiesController],
  providers: [WarrantiesService, ...warrantiesProviders],
  exports: [WarrantiesService],
})
export class WarrantiesModule {}
