import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCreditMovementService } from 'src/domain/services/create-credit-movement.service';
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
      provide: 'IMovementRepository',
      useClass: MovementRepository,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
  ],
})
export class MovementModule {}
