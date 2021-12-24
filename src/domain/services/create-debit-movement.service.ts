import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';
import { CreateMovementDto } from '../../application/movement/dto/create-movement.dto';
import { ICreateDebitMovementService } from '../interfaces/services/create-debit-movement-service.interface';
import { GetAccountBalanceService } from './get-account-balance.service';

@Injectable()
export class CreateDebitMovementService implements ICreateDebitMovementService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
    @Inject('IGetAccountBalanceService')
    private readonly getAccountBalanceService: GetAccountBalanceService,
  ) {}

  async execute({ accountId, value }: CreateMovementDto): Promise<void> {
    const foundAccount = await this.accountRepository.getById(accountId);
    if (!foundAccount) throw new NotFoundException('Account not found');

    const { balance } = await this.getAccountBalanceService.execute(accountId);
    if (balance < value)
      throw new UnprocessableEntityException('Insufficient funds');

    const negativeValue = value * -1;
    await this.movementRepository.create({ accountId, value: negativeValue });
  }
}
