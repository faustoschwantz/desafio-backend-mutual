import { Document, Model } from 'mongoose';
import { IBaseRepository } from 'src/domain/interfaces/repositories/base-repository.interface';

export abstract class BaseRepository<TDocument extends Document>
  implements IBaseRepository<TDocument>
{
  constructor(private readonly model: Model<TDocument>) {}

  async create<T>(data: T): Promise<TDocument> {
    const createdData = new this.model(data);
    return createdData.save();
  }
}
