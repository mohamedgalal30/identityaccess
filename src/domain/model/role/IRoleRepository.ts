import { Role } from ".";
import { Identity } from "../../../common";

export interface IRoleRepository {
    nextIdentity(): Promise<string>;
    add(aRole: Role): Promise<Role>;
    roleOfId(id: Identity): Promise<Role | undefined>;
    isUniqueRoleName(name: string): Promise<boolean>;
}