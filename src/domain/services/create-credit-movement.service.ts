import { Inject, Injectable } from '@nestjs/common';
import { CreateMovementDto } from '../../application/movement/dto/create-movement.dto';
import { ICreatedCreditMovementService } from '../interfaces/services/create-credit-movement-service.interface';
import { AccountHelper } from '../shared/helpers/account.helper';
import { MovementHelper } from '../shared/helpers/movement.helper';

@Injectable()
export class CreateCreditMovementService
  implements ICreatedCreditMovementService
{
  constructor(
    @Inject('AccountHelper')
    private readonly accountHelper: AccountHelper,
    @Inject('MovementHelper')
    private readonly movementHelper: MovementHelper,
  ) {}

  async execute(createMovimentDto: CreateMovementDto): Promise<void> {
    await this.accountHelper.validateAccountsFound(createMovimentDto.accountId);
    return this.movementHelper.createCreditMovement(createMovimentDto);
  }
}
