import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';

export interface IGetAccountBalanceService {
  execute(accountId: string): Promise<AccountBalanceDto>;
}
