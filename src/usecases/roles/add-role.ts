import { Role } from "../../domain/model/role";
import { IRoleRepository } from "../../domain/model/role";
import { CreateRoleDto } from ".";



interface IBuildDeps {
    roleRepository: IRoleRepository

}


export function buildAddRole({
    roleRepository,
}: IBuildDeps) {

    return async function addRole(roleDto: CreateRoleDto) {

        if (!(await roleRepository.isUniqueRoleName(roleDto.name))) {
            throw new Error("there is a role with the same name.");
        }

        const toBeCreatedRole = new Role("1", roleDto.name, roleDto.permissions);
        return roleRepository.add(toBeCreatedRole);

    };


}