import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';
import { CreateMovementDto } from '../../application/movement/dto/create-movement.dto';
import { ICreateDebitMovementService } from '../interfaces/services/create-debit-movement-service.interface';

@Injectable()
export class CreateDebitMovementService implements ICreateDebitMovementService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
  ) {}

  async execute(createNovementtDto: CreateMovementDto): Promise<void> {
    const foundAccount = await this.accountRepository.getById(
      createNovementtDto.accountId,
    );

    if (!foundAccount) throw new NotFoundException('Account not found');

    await this.movementRepository.create(createNovementtDto);
  }
}
