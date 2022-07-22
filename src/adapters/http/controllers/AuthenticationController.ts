import { AuthenticationService, LoginUserDto, CreateUserDto } from "../../../usecases/authentication"
import { IHttpRequest } from "../../../interfaces";


export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) { }

    register = async ({ body }: IHttpRequest) => {
        const userData: CreateUserDto = body as CreateUserDto;

        const user = await this.authenticationService.registerUser(userData);

        return { statusCode: 200, body: { data: user } };

    }

    login = async ({ body }: IHttpRequest) => {
        const credentials: LoginUserDto = body as LoginUserDto;

        const data = await this.authenticationService.login(credentials);

        return { statusCode: 200, body: { data } };

    }

    verify = async ({ body, headers }: IHttpRequest) => {

        if (!headers || !headers.Authorization) {
            throw Error("auth token does not exist.");
        }

        const token = headers.Authorization;

        const verificationStatus = await this.authenticationService.verify(token, body?.access);
        return {
            statusCode: verificationStatus ? 200 : 401,
            body: { success: verificationStatus }
        };

    }

}
