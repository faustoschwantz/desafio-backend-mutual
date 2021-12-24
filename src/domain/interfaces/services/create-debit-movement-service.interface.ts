import { CreateMovementDto } from 'src/application/movement/dto/create-movement.dto';

export interface ICreateDebitMovementService {
  execute(createMovementDto: CreateMovementDto): Promise<void>;
}
