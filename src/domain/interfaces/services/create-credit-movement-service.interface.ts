import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';

export interface ICreatedCreditMovementServce {
  execute(createMovementDto: CreateMovementDto): Promise<void>;
}
