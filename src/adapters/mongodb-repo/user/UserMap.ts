import { User } from "../../../domain/model/user";
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
            _id: user.id.toString(),
            email: user.email.toString(),
            password: user.password.getEncryptedPassword(),
            name: user.getName(),
        }
    }

    static toDomainObject(raw: UserInterface): User {

        return new User(
            raw._id.toString(),
            raw.name,
            raw.email,
            raw.password,
            raw.roleId
        );
    }
}