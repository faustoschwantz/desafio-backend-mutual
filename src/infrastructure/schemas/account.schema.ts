import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Account {
  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  created_at: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
