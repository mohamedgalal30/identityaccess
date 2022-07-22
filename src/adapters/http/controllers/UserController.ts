import { UserService } from "../../../usecases/users"
import { IHttpRequest } from "../../../interfaces";



export class UserController {
    constructor(private userService: UserService) { }

    assignRole = async ({ params, body }: IHttpRequest) => {

        const assignRoleStatus = await this.userService.assignRoleToUser(params?.userId, body?.roleId);

        return { statusCode: 200, body: { success: assignRoleStatus } };

    }
}
