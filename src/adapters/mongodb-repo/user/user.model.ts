import { model, Document, Schema, Types } from 'mongoose';
import { User } from './user.interface';

const userSchema = new Schema(
  {
    name: String,
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    roleId: {
      type: Types.ObjectId,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);


export const UserModel = model<User & Document>('User', userSchema);
