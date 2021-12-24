import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { Movement } from 'src/infrastructure/schemas/movement.schema';

export interface IMovementRepository {
  create(movement: Movement): Promise<void>;

  getBalanceByAccountId(accountId: string): Promise<AccountBalanceDto>;
}
