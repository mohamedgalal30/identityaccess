import { RoleService, CreateRoleDto } from "../../../usecases/roles"
import { IHttpRequest } from "../../../interfaces";


export class RoleController {

    constructor(private roleService: RoleService) { }

    addRole = async ({ body }: IHttpRequest) => {
        const roleData: CreateRoleDto = body as CreateRoleDto;

        const role = await this.roleService.addRole(roleData);

        return { statusCode: 200, body: { data: role } };

    }

}
