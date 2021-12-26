import { Inject, Injectable } from '@nestjs/common';
import { TransferBetweenAccountsDto } from 'src/application/account/dto/transfer-account.dto';
import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';
import { ITransferBetweenAccountsService } from '../interfaces/services/transfer-between-accounts-service.interface';
import { AccountHelper } from '../shared/helpers/account.helper';
import { MovementHelper } from '../shared/helpers/movement.helper';

@Injectable()
export class TransferBetweenAccountsService
  implements ITransferBetweenAccountsService
{
  constructor(
    @Inject('AccountHelper')
    private readonly accountHelper: AccountHelper,
    @Inject('MovementHelper')
    private readonly movementHelper: MovementHelper,
  ) {}

  async execute(
    senderAccountId: string,
    receiverMovement: TransferBetweenAccountsDto,
  ): Promise<void> {
    const { value, accountId: receiverAccountId } = receiverMovement;
    const senderMovement: CreateMovementDto = {
      accountId: senderAccountId,
      value,
    };
    await this.accountHelper.validateAccountsFound(
      senderAccountId,
      receiverAccountId,
    );
    await this.accountHelper.validateAccountBalance(senderAccountId, value);

    await Promise.all([
      this.movementHelper.createDebitMovement(senderMovement),
      this.movementHelper.createCreditMovement(receiverMovement),
    ]);
  }
}
