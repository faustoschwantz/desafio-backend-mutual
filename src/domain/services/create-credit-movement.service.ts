import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';
import { CreateMovementDto } from '../../application/movement/dto/create-movement.dto';
import { ICreatedCreditMovementService } from '../interfaces/services/create-credit-movement-service.interface';

@Injectable()
export class CreateCreditMovementService
  implements ICreatedCreditMovementService
{
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

    createNovementtDto.value = createNovementtDto.value * -1;
    await this.movementRepository.create(createNovementtDto);
  }
}