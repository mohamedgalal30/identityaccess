import { Role } from "../../../domain/model/role"
import { Role as RoleInterface } from "./role.interface";
export interface RolePresistenceSchema {
    id: string;
    email: string;
    password: string;
    name: string;
}

export class RoleMap {
    static toPersistence(role: Role): RoleInterface {
        return {
            permissions: role.permissions.getPermissions(),
            name: role.getName(),
        }
    }

    static toDomainObject(raw: RoleInterface): Role {

        return new Role(raw._id ? raw._id.toString() : "1", raw.name, raw.permissions);
    }
}