import jwt from 'jsonwebtoken';
import { Identity } from "../../common";
import { IUserRepository } from "../../domain/model/user";
import { IRoleRepository, Role } from "../../domain/model/role";
import { ISessionRepository } from "../../domain/model/session";

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
    return async function verify(token: string, access?: ICanAccess): Promise<boolean> {

        // decode the token to verify
        let decodedData: DecodedData
        const secret = process.env.JWT_SECRET as string;
        try {
            //@ts-ignore
            decodedData = jwt.verify(token, secret);
        } catch {
            return false;
        }


        const existedUser = await userRepository.userOfId(new Identity(decodedData.userId));
        if (!existedUser) {
            return false;
        }

        const session = await sessionRepository.findSessionByToken(token);

        if (!session) {
            return false;
        }

        if (access) {
            const role = await roleRepository.roleOfId(existedUser.roleId);
            if (!role || !roleHasAccess(role, access)) {
                return false;
            }
        }

        return true;

    }

    function roleHasAccess(role: Role, access: ICanAccess): boolean {
        return role.permissions.getPermissions()?.[access.service]?.[access.resource]?.includes(access.permission);
    }

}

