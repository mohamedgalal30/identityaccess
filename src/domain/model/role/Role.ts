import { Entity, Identity } from "../../../common";
import { IPermissions, Permissions } from "./Permissions";

export class Role extends Entity {
    permissions: Permissions

    constructor(
        anId: string,
        public name: string,
        permissions: IPermissions
    ) {
        super();
        this.id = new Identity(anId);

        this.setPermissions(permissions)
    }

    getName(): string {
        return this.name;
    }

    setPermissions(permissions: IPermissions | "*"): Role {
        if (!Object.keys(permissions).length) {
            throw new Error("permissions object should be exists");
        }

        this.permissions = new Permissions(permissions);
        return this;
    }

}