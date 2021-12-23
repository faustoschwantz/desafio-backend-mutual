import { Account } from 'src/infrastructure/schemas/account.schema';

export interface IAccountRepository {
  create(account: Account): Promise<string>;

  getByCPF(cpf: string): Promise<Account>;
}
