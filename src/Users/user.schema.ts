import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  perfil: number;

  @Prop()
  companyId: number[]
}

export const UserSchema = SchemaFactory.createForClass(User);
