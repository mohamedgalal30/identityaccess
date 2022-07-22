import { buildAddRole } from "./add-role";

import { RoleRepository } from "../../adapters/mongodb-repo";

export class RoleService {
    addRole = buildAddRole({ roleRepository: new RoleRepository() })
}

export * from "./role.dto";