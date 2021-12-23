import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account {
  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  created_at?: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

export type AccountDocument = Account & Document;
