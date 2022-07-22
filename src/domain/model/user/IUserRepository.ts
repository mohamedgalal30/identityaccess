import { User, Email } from ".";
import { Identity } from "../../../common";

export interface IUserRepository {
    add(aUser: User): Promise<User>;
    userOfId(id: Identity): Promise<User | undefined>;
    findByEmail(email: Email): Promise<User | undefined>;
    addAccessTokenToUser(id: Identity, accessToken: string): Promise<boolean>;
    assignRoleToUser(userId: Identity, roleId: Identity): Promise<boolean>;
}