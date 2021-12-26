import { Account } from 'src/infrastructure/schemas/account.schema';

export interface IAccountRepository {
  getByCPF(cpf: string): Promise<Account>;

  getById(id: string): Promise<Account>;
}
