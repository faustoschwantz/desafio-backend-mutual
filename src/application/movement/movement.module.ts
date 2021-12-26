import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCreditMovementService } from 'src/domain/services/create-credit-movement.service';
import { CreateDebitMovementService } from 'src/domain/services/create-debit-movement.service';
import { GetAccountBalanceService } from 'src/domain/services/get-account-balance.service';
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
import { MovementController } from './movement.controller';

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
  controllers: [MovementController],
  providers: [
    {
      provide: 'ICreateCreditMovementService',
      useClass: CreateCreditMovementService,
    },
    {
      provide: 'ICreateDebitMovementService',
      useClass: CreateDebitMovementService,
    },
    {
      provide: 'IGetAccountBalanceService',
      useClass: GetAccountBalanceService,
    },
    {
      provide: 'IMovementRepository',
      useClass: MovementRepository,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
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
export class MovementModule {}
