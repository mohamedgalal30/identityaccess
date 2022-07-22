import { buildRegisterUser } from "./register-user";
import { buildLogin } from "./login";
import { buildVerify } from "./verify";

import { UserRepository, RoleRepository } from "../../adapters/mongodb-repo";

export class AuthenticationService {
    registerUser = buildRegisterUser({ userRepository: new UserRepository() })
    login = buildLogin({ userRepository: new UserRepository() })
    verify = buildVerify({
        userRepository: new UserRepository(),
        roleRepository: new RoleRepository()
    })
}

export * from "./user.dto";