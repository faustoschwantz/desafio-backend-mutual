import { Inject } from '@nestjs/common';
import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';
import { IGetAccountBalanceService } from '../interfaces/services/get-account-balance-service.interface';
import { AccountHelper } from '../shared/helpers/account.helper';

export class GetAccountBalanceService implements IGetAccountBalanceService {
  constructor(
    @Inject('AccountHelper')
    private readonly accountHelper: AccountHelper,
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
  ) {}

  async execute(accountId: string): Promise<AccountBalanceDto> {
    await this.accountHelper.validateAccountsFound(accountId);
    return this.movementRepository.getBalanceByAccountId(accountId);
  }
}
