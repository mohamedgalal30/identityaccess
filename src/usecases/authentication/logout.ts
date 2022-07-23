import { ISessionRepository } from "../../domain/model/session";

interface IBuildDeps {
    sessionRepository: ISessionRepository

}


export function buildLogout({
    sessionRepository,
}: IBuildDeps) {

    return async function logout(token: string) {
        return sessionRepository.removeSessionByToken(token);

    };


}