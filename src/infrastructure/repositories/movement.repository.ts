import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovementRepository } from 'src/domain/interfaces/repositories/movement-repository.interface';
import { Movement, MovementDocument } from '../schemas/movement.schema';

export class MovementRepository implements IMovementRepository {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  async create(movement: Movement): Promise<void> {
    new this.movementModel(movement).save();
  }
}
