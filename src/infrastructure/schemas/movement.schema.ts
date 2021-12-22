import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Movment {
  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  value: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movment);
