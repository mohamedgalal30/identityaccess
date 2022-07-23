import { Session } from ".";

export interface ISessionRepository {
    saveSession(aSession: Session): Promise<Session>;
    findSessionByToken(token: string): Promise<Session | undefined>;
}