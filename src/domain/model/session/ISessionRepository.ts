import { Session } from ".";

export interface ISessionRepository {
    saveSession(aSession: Session): Promise<Session>;
    findSessionByToken(token: string): Promise<Session | undefined>;
    invalidateSession(sessionId: string): Promise<boolean>;
    removeSessionByToken(token: string): Promise<boolean>;
}