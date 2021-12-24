import { Movement } from 'src/infrastructure/schemas/movement.schema';

export interface IMovementRepository {
  create(movement: Movement): Promise<void>;
}
