import { SessionController } from "../controllers";
import { IRoutes, Router } from "../../../interfaces";
import { SessionService } from "../../../usecases/sessions"
import { authMiddleware } from "../middleware/auth.middleware";

const SessionCtrl = new SessionController(new SessionService());

export class SessionRouter implements Router {
    public prefix = '/api';
    public service = "iam";
    public resource = "sessions";

    public routes: IRoutes = [
        {
            method: "post",
            path: "/sessions/:sessionId/invalidate",
            handler: SessionCtrl.invalidate,
            middleware: [authMiddleware],
            permission: "invalidate"
        },
    ]
}