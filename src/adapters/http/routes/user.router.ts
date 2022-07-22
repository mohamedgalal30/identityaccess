import { UserController } from "../controllers";
import { IRoutes, Router } from "../../../interfaces";
import { UserService } from "../../../usecases/users"
import { authMiddleware } from "../middleware/auth.middleware";

const UserCtrl = new UserController(new UserService());

export class UserRouter implements Router {
    public prefix = '/api';
    public service = "iam";
    public resource = "users";

    public routes: IRoutes = [
        {
            method: "post",
            path: "/users/:userId/assign-role",
            handler: UserCtrl.assignRole,
            middleware: [authMiddleware],
            permission: "assignRole"
        },
    ]
}