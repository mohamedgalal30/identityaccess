import jwt from 'jsonwebtoken';
import { Identity } from "../../common";
import { IUserRepository } from "../../domain/model/user";
import { IRoleRepository, Role } from "../../domain/model/role";
import { ISessionRepository } from "../../domain/model/session";

import { AuthenticationError, AuthorizationError } from "../../common/errors";


interface VerifyResponse {
    id: string;
    name: string;
    email: string;
}


interface IBuildDeps {
    userRepository: IUserRepository;
    roleRepository: IRoleRepository;
    sessionRepository: ISessionRepository;

}

interface DecodedData {
    userId: string;
    exp: number;
}

interface ICanAccess {
    service: string;
    resource: string;
    permission: string;
}

export function buildVerify({
    userRepository,
    roleRepository,
    sessionRepository

}: IBuildDeps) {
    return async function verify(token: string, access?: ICanAccess): Promise<VerifyResponse> {

        // decode the token to verify
        let decodedData: DecodedData
        const secret = process.env.JWT_SECRET as string;
        try {
            //@ts-ignore
            decodedData = jwt.verify(token, secret);
        } catch {
            throw new AuthenticationError("Auth token not valid.");
        }


        const existedUser = await userRepository.userOfId(new Identity(decodedData.userId));
        if (!existedUser) {
            throw new AuthenticationError("User for this token not exist.");
        }

        const session = await sessionRepository.findSessionByToken(token);

        if (!session) {
            throw new AuthenticationError("invalid session.");
        }

        if (access) {
            const role = await roleRepository.roleOfId(existedUser.roleId);
            if (!role || !roleHasAccess(role, access)) {
                throw new AuthorizationError("Can not access this resource.");
            }
        }

        return {
            id: existedUser.id.toString(),
            name: existedUser.name,
            email: existedUser.email.toString()
        };

    }

    function roleHasAccess(role: Role, access: ICanAccess): boolean {
        return role.permissions.getPermissions()?.[access.service]?.[access.resource]?.includes(access.permission);
    }

}

