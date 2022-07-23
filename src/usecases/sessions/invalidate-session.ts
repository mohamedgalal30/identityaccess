import { ISessionRepository } from "../../domain/model/session";

interface IBuildDeps {
    sessionRepository: ISessionRepository

}


export function buildInvaidateSession({
    sessionRepository,
}: IBuildDeps) {

    return async function invaidateSession(sessionId: string) {
        return sessionRepository.invalidateSession(sessionId);

    };


}