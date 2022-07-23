import { Role } from "../../../domain/model/role"
import { Role as RoleInterface } from "./role.interface";
import { Types } from "mongoose";



export interface RolePresistenceSchema {
    id: string;
    email: string;
    password: string;
    name: string;
}

export class RoleMap {
    static toPersistence(role: Role): RoleInterface {
        return {
            _id: new Types.ObjectId(role.id.toString()),
            name: role.getName(),
            permissions: role.permissions.getPermissions(),
        }
    }

    static toDomainObject(raw: RoleInterface): Role {

        return new Role(
            raw._id.toString(),
            raw.name,
            raw.permissions
        );
    }
}