import jwt from 'jsonwebtoken';
import { Identity } from "../../common";
import { IUserRepository } from "../../domain/model/user";
import { IRoleRepository, Role } from "../../domain/model/role";

interface IBuildDeps {
    userRepository: IUserRepository;
    roleRepository: IRoleRepository;

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
    roleRepository
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

        // Check if token has expired
        if (decodedData.exp < Date.now().valueOf() / 1000) {
            return false;
        }


        const existedUser = await userRepository.userOfId(new Identity(decodedData.userId));
        if (!existedUser || !existedUser.userHasToken(token)) {
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
        const r = role.permissions.getPermissions()?.[access.service]?.[access.resource]?.includes(access.permission);
        return r
    }

}

