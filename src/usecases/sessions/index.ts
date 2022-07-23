import { buildInvaidateSession } from "./invalidate-session";

import { SessionRepository } from "../../adapters/redis-repo";

export class SessionService {
    invalidateSession = buildInvaidateSession({
        sessionRepository: new SessionRepository(),
    })
}