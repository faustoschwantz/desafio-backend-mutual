import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';

export interface ICreatedCreditMovementService {
  execute(createMovementDto: CreateMovementDto): Promise<void>;
}
