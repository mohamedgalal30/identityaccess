import { User } from "../../../domain/model/user"
import { User as UserInterface } from "./user.interface";
export interface UserPresistenceSchema {
    id: string;
    email: string;
    password: string;
    name: string;
}

export class UserMap {
    static toPersistence(user: User): UserInterface {
        return {
            // _id: user.id.id,
            email: user.email.toString(),
            password: user.password.getEncryptedPassword(),
            name: user.getName(),
        }
    }

    static toDomainObject(raw: UserInterface): User {

        return new User(
            raw._id ? raw._id?.toString() : "1",
            raw.name,
            raw.email,
            raw.password,
            raw.accessTokens,
            raw.roleId
        );
    }
}