import { RoleController } from "../controllers";
import { IRoutes, Router } from "../../../interfaces";
import { RoleService, CreateRoleDto } from "../../../usecases/roles"
import { validationMiddleware, authMiddleware } from "../middleware";

const RoleCtrl = new RoleController(new RoleService());

export class RoleRouter implements Router {
    public prefix = '/api';
    public service = "iam";
    public resource = "roles";

    public routes: IRoutes = [
        {
            method: "post",
            path: "/roles",
            handler: RoleCtrl.addRole,
            middleware: [authMiddleware, validationMiddleware<CreateRoleDto>(CreateRoleDto)],
            permission: "create"
        },
    ]
}