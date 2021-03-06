import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountBalanceDto } from 'src/application/account/dto/account-balance.dto';
import { IMovementRepository } from 'src/domain/interfaces/repositories/movement-repository.interface';
import { Movement, MovementDocument } from '../schemas/movement.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class MovementRepository
  extends BaseRepository<MovementDocument>
  implements IMovementRepository
{
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {
    super(movementModel);
  }

  async getBalanceByAccountId(accountId: string): Promise<AccountBalanceDto> {
    const agrregateResult = await this.movementModel
      .aggregate([
        { $match: { accountId } },
        {
          $group: {
            _id: null,
            balance: { $sum: '$value' },
          },
        },
      ])
      .exec();

    return { balance: agrregateResult[0]?.balance || 0 };
  }
}
