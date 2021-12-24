import { CreateCreditMovementDto } from 'src/application/movement/dto/create-credit-movement.dto';

export interface ICreatedCreditMovementServce {
  execute(createCreditNovementtDto: CreateCreditMovementDto): Promise<void>;
}
