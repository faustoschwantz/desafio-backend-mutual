import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movement {
  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  value: number;

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);

export type MovementDocument = Movement & Document;
