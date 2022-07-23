import { Entity, Schema, Repository } from 'redis-om';
import { RedisClient } from "./client";
import { ISessionRepository, Session } from "../../domain/model/session";
import { expireInSeconds } from "../../config/session"


interface SessionEntity {
    token: string,
}

class SessionEntity extends Entity { }

const sessionSchema = new Schema(SessionEntity, {
    token: { type: 'string' },
});

export class SessionRepository implements ISessionRepository {
    private sessionRepository: Repository<SessionEntity>;

    private gerRepo() {
        if (!this.sessionRepository) {
            this.sessionRepository = RedisClient.Instance.getClient().fetchRepository(sessionSchema);
            this.sessionRepository.createIndex();
        }

        return this.sessionRepository;
    }

    async saveSession(session: Session): Promise<Session> {
        const createdSession = await this.gerRepo().createAndSave({
            token: session.token
        });

        await this.gerRepo().expire(createdSession.entityId, expireInSeconds);
        return new Session(createdSession.token, createdSession.entityId);

    }

    async findSessionByToken(token: string): Promise<Session | undefined> {
        const session = await this.gerRepo().search().where('token').equals(token).return.first();
        if (session) {
            this.gerRepo().expire(session.entityId, expireInSeconds);
            return new Session(session.token, session.entityId);
        }
    }

    async invalidateSession(sessionId: string): Promise<boolean> {
        await this.gerRepo().remove(sessionId);
        return true;
    }
}