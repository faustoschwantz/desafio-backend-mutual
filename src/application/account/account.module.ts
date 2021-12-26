import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { GetAccountBalanceService } from 'src/domain/services/get-account-balance.service';
import { TransferBetweenAccountsService } from 'src/domain/services/transfer-between-accounts.service';
import { AccountHelper } from 'src/domain/shared/helpers/account.helper';
import { MovementHelper } from 'src/domain/shared/helpers/movement.helper';
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
      provide: 'ICreateAccountService',
      useClass: CreateAccountService,
    },
    {
      provide: 'IGetAccountBalanceService',
      useClass: GetAccountBalanceService,
    },
    {
      provide: 'ITransferBetweenAccountsService',
      useClass: TransferBetweenAccountsService,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    {
      provide: 'IMovementRepository',
      useClass: MovementRepository,
    },
    {
      provide: 'AccountHelper',
      useClass: AccountHelper,
    },
    {
      provide: 'MovementHelper',
      useClass: MovementHelper,
    },
  ],
})
export class AccountModule {}
