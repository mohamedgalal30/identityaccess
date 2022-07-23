import { IUserRepository, User, Email } from "../../../domain/model/user";
import { Identity } from "../../../common";
import { UserMap } from "./UserMap";
import { UserModel } from "./user.model";

import { BaseMongoRepo } from "../BaseMongoRepo";

export class UserRepository extends BaseMongoRepo implements IUserRepository {

    async add(newUser: User): Promise<User> {
        const createdUser = await UserModel.create(UserMap.toPersistence(newUser));
        return UserMap.toDomainObject(createdUser);
    }


    async userOfId(id: Identity): Promise<User | undefined> {
        const user = await UserModel.findById(id.toString());
        if (user) {
            return UserMap.toDomainObject(user);
        }

        return
    }

    async findByEmail(email: Email): Promise<User | undefined> {
        const user = await UserModel.findOne({ email: email.toString() });

        if (user) {
            return UserMap.toDomainObject(user);
        }
        return
    }



    async assignRoleToUser(userId: Identity, roleId: Identity): Promise<boolean> {
        const result = await UserModel.updateOne(
            { _id: userId.toString() },
            { $set: { roleId: roleId.toString() } }
        );

        return Boolean(result.acknowledged);
    }


}