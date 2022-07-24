import { Role } from "../../domain/model/role";
import { IRoleRepository } from "../../domain/model/role";
import { CreateRoleDto } from ".";

interface AddRoleResponse {
    id: string;
    name: string;
    permissions: any;
}


interface IBuildDeps {
    roleRepository: IRoleRepository

}


export function buildAddRole({
    roleRepository,
}: IBuildDeps) {

    return async function addRole(roleDto: CreateRoleDto): Promise<AddRoleResponse> {
        if (!(await roleRepository.isUniqueRoleName(roleDto.name))) {
            throw new Error("there is a role with the same name.");
        }
        const toBeCreatedRole = new Role(
            await roleRepository.nextIdentity(),
            roleDto.name,
            roleDto.permissions
        );
        const role = await roleRepository.add(toBeCreatedRole);

        return {
            id: role.id.toString(),
            name: role.name,
            permissions: role.permissions
        }

    };


}