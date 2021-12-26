import { Inject, Injectable } from '@nestjs/common';
import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';
import { MovementRepository } from 'src/infrastructure/repositories/movement.repository';

@Injectable()
export class MovementHelper {
  constructor(
    @Inject('IMovementRepository')
    private readonly movementRepository: MovementRepository,
  ) {}

  async createCreditMovement(
    createMovimentDto: CreateMovementDto,
  ): Promise<void> {
    this.movementRepository.create(createMovimentDto);
  }

  async createDebitMovement({
    accountId,
    value,
  }: CreateMovementDto): Promise<void> {
    const negativeValue = value * -1;
    await this.movementRepository.create({ accountId, value: negativeValue });
  }
}
