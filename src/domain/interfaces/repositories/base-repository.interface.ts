import { Document } from 'mongoose';

export interface IBaseRepository<TDocument extends Document> {
  create<T>(data: T): Promise<TDocument>;
}
