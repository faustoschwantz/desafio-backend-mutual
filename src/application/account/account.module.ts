import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import {
  Account,
  AccountSchema,
} from 'src/infrastructure/schemas/account.schema';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    {
      provide: 'ICreateAccountService',
      useClass: CreateAccountService,
    },
  ],
})
export class AccountModule {}
