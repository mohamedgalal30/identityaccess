import { buildAssignRoleToUser } from "./assign-role";

import { UserRepository } from "../../adapters/mongodb-repo";
import { RoleRepository } from "../../adapters/mongodb-repo";

export class UserService {
    assignRoleToUser = buildAssignRoleToUser({
        userRepository: new UserRepository(),
        roleRepository: new RoleRepository(),
    })
}

export * from "./user.dto";