import * as mongoose from 'mongoose';
import { Role } from './role.interface';

const roleSchema = new mongoose.Schema(
  {
    name: String,
    permissions: {
      type: JSON
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);


export const RoleModel = mongoose.model<Role & mongoose.Document>('Role', roleSchema);
