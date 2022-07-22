import { IUserRepository, User, Email } from "../../domain/model/user";
import { Identity } from "../../common";
import { UserMap, UserPresistenceSchema } from "./mappers/UserMap";

const usersMap: { [id: string]: UserPresistenceSchema } = {};
const usersEmailMap: { [email: string]: UserPresistenceSchema } = {};

export class UserRepository {
    async add(newUser: User) {
        usersMap[newUser.id.toString()] = UserMap.toPersistence(newUser);
        usersEmailMap[newUser.email.toString()] = UserMap.toPersistence(newUser);
        return newUser;
    }


    async userOfId(id: Identity) {
        return UserMap.toDomainObject(usersMap[id.toString()]);
    }

    async findByEmail(email: Email) {
        const user = usersEmailMap[email.toString()];
        if (user) {
            return UserMap.toDomainObject(user);
        }
        return
    }
}