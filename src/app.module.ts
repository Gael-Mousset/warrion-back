import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WarrantiesModule } from './warranties/warranties.module';

@Module({
  imports: [UsersModule, WarrantiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
