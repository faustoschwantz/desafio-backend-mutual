import { Inject, NotFoundException } from '@nestjs/common';
import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';

export class GetAccountBalanceService implements GetAccountBalanceService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
  ) {}

  async execute(accountId: string): Promise<AccountBalanceDto> {
    const foundAccount = await this.accountRepository.getById(accountId);

    if (!foundAccount) throw new NotFoundException('Account not found');

    return this.movementRepository.getBalanceByAccountId(accountId);
  }
}
