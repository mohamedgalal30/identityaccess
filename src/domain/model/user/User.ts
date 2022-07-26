import { Entity, Validator, Identity } from "../../../common";
import { UserValidator } from "./UserValidator";
import { Email } from "./Email";
import { Password } from "./Password";

import { Role } from "../role";

export class User extends Entity {
    email: Email;
    password: Password;
    roleId: Identity

    constructor(
        anId: string,
        public name: string,
        anEmail: string,
        aPassword: string,
        aRoleId?: string,
    ) {
        super();
        this.id = new Identity(anId);
        this.email = new Email(anEmail)

        if (aPassword) {
            this.password = new Password(aPassword)
        }

        if (aRoleId) {
            this.roleId = new Identity(aRoleId);
        }

        const userValidator = new Validator(new UserValidator());
        userValidator.validate(this);
    }

    getName(): string {
        return this.name;
    }

    assignRole(role: Role): User {
        this.roleId = role.id;
        return this
    }

}
