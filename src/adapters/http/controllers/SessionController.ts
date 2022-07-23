import { SessionService } from "../../../usecases/sessions"
import { IHttpRequest } from "../../../interfaces";



export class SessionController {
    constructor(private sessionService: SessionService) { }

    invalidate = async ({ params }: IHttpRequest) => {

        const assignRoleStatus = await this.sessionService.invalidateSession(params?.sessionId);

        return { statusCode: 200, body: { success: assignRoleStatus } };

    }
}
