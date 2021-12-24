import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '../account/account.module';
import { MovementModule } from '../movement/movement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONN_STRING),
    AccountModule,
    MovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
