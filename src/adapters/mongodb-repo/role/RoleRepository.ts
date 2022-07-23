import { IRoleRepository, Role } from "../../../domain/model/role";
import { Identity } from "../../../common";
import { RoleMap } from "./RoleMap";
import { RoleModel } from "./role.model";
import { BaseMongoRepo } from "../BaseMongoRepo";

export class RoleRepository extends BaseMongoRepo implements IRoleRepository {
    async add(newRole: Role): Promise<Role> {
        const createdRole = await RoleModel.create(RoleMap.toPersistence(newRole));
        return RoleMap.toDomainObject(createdRole);
    }


    async roleOfId(id: Identity): Promise<Role | undefined> {
        const role = await RoleModel.findById(id.toString());
        if (role) {
            return RoleMap.toDomainObject(role);
        }

        return
    }

    async isUniqueRoleName(name: string): Promise<boolean> {
        const role = await RoleModel.findOne({ name });
        return !Boolean(role);
    }


}