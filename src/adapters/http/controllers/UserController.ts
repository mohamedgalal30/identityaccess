import { UserService } from "../../../usecases/users"
import { IHttpRequest } from "../../../interfaces";

import { RoleService } from "../../../usecases/roles"


export class UserController {
    constructor(private userService: UserService) { }

    assignRole = async ({ params, body }: IHttpRequest) => {

        const assignRoleStatus = await this.userService.assignRoleToUser(params?.userId, body?.roleId);

        return { statusCode: 200, body: { success: assignRoleStatus } };

    }


    // just to testing api purpose
    init = async ({ params }: IHttpRequest) => {
        //@ts-ignore
        const role = await (new RoleService()).addRole({ "name": "admin23aa", "permissions": "*" });

        const assignRoleStatus = await this.userService.assignRoleToUser(params?.userId, role.id);

        return { statusCode: 200, body: { success: assignRoleStatus } };

    }
}
