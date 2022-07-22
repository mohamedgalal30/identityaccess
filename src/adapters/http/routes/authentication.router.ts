import { AuthenticationController } from "../controllers";
import { IRoutes, Router } from "../../../interfaces";
import { validationMiddleware } from "../middleware/validation.middleware";
import { AuthenticationService, CreateUserDto, LoginUserDto } from "../../../usecases/authentication"

const AuthenticationCtrl = new AuthenticationController(new AuthenticationService());

export class AuthenticationRouter implements Router {
    public prefix = '/auth';
    public service = "iam";
    public resource = "auth";

    public routes: IRoutes = [
        {
            method: "post",
            path: "/register",
            handler: AuthenticationCtrl.register,
            middleware: [validationMiddleware<CreateUserDto>(CreateUserDto)],
        },
        {
            method: "post",
            path: "/login",
            handler: AuthenticationCtrl.login,
            middleware: [validationMiddleware<LoginUserDto>(LoginUserDto)],
        },
        {
            method: "post",
            path: "/verify",
            handler: AuthenticationCtrl.verify,
            // middleware: [validationMiddleware<LoginUserDto>(LoginUserDto)],
        },
    ]
}