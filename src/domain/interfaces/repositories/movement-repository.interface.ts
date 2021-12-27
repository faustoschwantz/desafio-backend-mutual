import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { MovementDocument } from 'src/infrastructure/schemas/movement.schema';
import { IBaseRepository } from './base-repository.interface';

export interface IMovementRepository extends IBaseRepository<MovementDocument> {
  getBalanceByAccountId(accountId: string): Promise<AccountBalanceDto>;
}
