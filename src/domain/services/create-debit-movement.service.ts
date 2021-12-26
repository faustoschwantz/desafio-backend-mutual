import { Inject, Injectable } from '@nestjs/common';
import { CreateMovementDto } from '../../application/movement/dto/create-movement.dto';
import { ICreateDebitMovementService } from '../interfaces/services/create-debit-movement-service.interface';
import { AccountHelper } from '../shared/helpers/account.helper';
import { MovementHelper } from '../shared/helpers/movement.helper';

@Injectable()
export class CreateDebitMovementService implements ICreateDebitMovementService {
  constructor(
    @Inject('AccountHelper')
    private readonly accountHelper: AccountHelper,
    @Inject('MovementHelper')
    private readonly movementHelper: MovementHelper,
  ) {}

  async execute(createMovementDto: CreateMovementDto): Promise<void> {
    const { accountId, value } = createMovementDto;
    await this.accountHelper.validateAccountsFound(accountId);
    await this.accountHelper.validateAccountBalance(accountId, value);

    return this.movementHelper.createDebitMovement(createMovementDto);
  }
}
