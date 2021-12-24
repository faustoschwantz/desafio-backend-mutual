import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';
import { CreateCreditMovementDto } from '../../application/movement/dto/create-credit-movement.dto';
import { ICreatedCreditMovementServce } from '../interfaces/services/create-credit-movement-service.interface';

@Injectable()
export class CreateCreditMovementService
  implements ICreatedCreditMovementServce
{
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
  ) {}

  async execute(
    createCreditNovementtDto: CreateCreditMovementDto,
  ): Promise<void> {
    const foundAccount = await this.accountRepository.getById(
      createCreditNovementtDto.accountId,
    );

    if (!foundAccount) throw new NotFoundException('Account not found');

    await this.movementRepository.create(createCreditNovementtDto);
  }
}
