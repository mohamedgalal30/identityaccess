import { buildRegisterUser } from "./register-user";
import { buildLogin } from "./login";
import { buildVerify } from "./verify";
import { buildLogout } from "./logout";

import { UserRepository, RoleRepository } from "../../adapters/mongodb-repo";
import { SessionRepository } from "../../adapters/redis-repo"



export class AuthenticationService {
    registerUser = buildRegisterUser({ userRepository: new UserRepository() });

    login = buildLogin({
        userRepository: new UserRepository(),
        sessionRepository: new SessionRepository(),
    });

    verify = buildVerify({
        userRepository: new UserRepository(),
        roleRepository: new RoleRepository(),
        sessionRepository: new SessionRepository(),
    });

    logout = buildLogout({
        sessionRepository: new SessionRepository(),
    });

}

export * from "./user.dto";