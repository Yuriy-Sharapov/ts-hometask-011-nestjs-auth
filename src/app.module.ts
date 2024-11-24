import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
