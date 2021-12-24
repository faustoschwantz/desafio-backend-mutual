import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { GetAccountBalanceService } from 'src/domain/services/get-account-balance.service';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';
import {
  Account,
  AccountSchema,
} from 'src/infrastructure/schemas/account.schema';
import {
  Movement,
  MovementSchema,
} from 'src/infrastructure/schemas/movement.schema';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: Movement.name,
        schema: MovementSchema,
      },
    ]),
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
    {
      provide: 'IGetAccountBalanceService',
      useClass: GetAccountBalanceService,
    },
    {
      provide: 'IMovementRepository',
      useClass: MovementRepository,
    },
  ],
})
export class AccountModule {}
