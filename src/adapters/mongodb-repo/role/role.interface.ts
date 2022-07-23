import { Types } from "mongoose";

export interface Role {
  _id: Types.ObjectId;
  name: string;
  permissions: {}
}
