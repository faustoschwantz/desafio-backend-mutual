import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';

export interface IMovementRepository {
  getBalanceByAccountId(accountId: string): Promise<AccountBalanceDto>;
}
