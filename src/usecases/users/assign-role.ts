import { IRoleRepository } from "../../domain/model/role";
import { IUserRepository } from "../../domain/model/user";
import { Identity } from "../../common";



interface IBuildDeps {
    roleRepository: IRoleRepository
    userRepository: IUserRepository

}


export function buildAssignRoleToUser({
    userRepository,
    roleRepository,
}: IBuildDeps) {

    return async function assignRoleToUser(userId: string, roleId: string) {

        const user = await userRepository.userOfId(new Identity(userId));
        if (!user) {
            throw Error("user does not exist.")
        }

        const toBeAssignedRole = await roleRepository.roleOfId(new Identity(roleId));
        if (!toBeAssignedRole) {
            throw Error("role does not exist.")
        }

        user.assignRole(toBeAssignedRole);

        return userRepository.assignRoleToUser(user.id, user.roleId);

    };


}