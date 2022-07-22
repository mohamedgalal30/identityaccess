import { User } from "../../../domain/model/user"

export interface UserPresistenceSchema {
    id: string;
    email: string;
    password: string;
    name: string;
}

export class UserMap {
    static toPersistence(user: User): UserPresistenceSchema {
        return {
            id: user.id.id,
            email: user.email.toString(),
            password: user.password.getEncryptedPassword(),
            name: user.getName(),
        }
    }

    static toDomainObject(raw: UserPresistenceSchema): User {
        return new User(raw.id, raw.name, raw.email, raw.password);
    }
}