import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';

@Injectable()
export class AccountHelper {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
  ) {}

  async validateAccountBalance(
    senderAccountId: string,
    value: number,
  ): Promise<void> {
    const { balance } = await this.movementRepository.getBalanceByAccountId(
      senderAccountId,
    );
    if (balance < value)
      throw new UnprocessableEntityException('Insufficient funds');
  }

  async validateAccountsFound(...accountIds: string[]) {
    const accountPromises = accountIds.map((accountId) =>
      this.accountRepository.getById(accountId),
    );

    const accountsList = await Promise.all(accountPromises);
    const invalid = accountsList.some((account) => !account);

    if (invalid) {
      const notFoundAccounts = accountIds.filter(
        (_, index) => !accountsList[index],
      );
      const message = `Account(s) not found: ${notFoundAccounts.join(', ')}`;
      throw new NotFoundException(message);
    }
  }
}
