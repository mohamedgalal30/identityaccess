import { Entity, Identity } from "../../../common";

export class Session extends Entity {
    permissions: Permissions

    constructor(
        public token: string,
        anId?: string,
    ) {
        super();
        if (anId) {
            this.id = new Identity(anId);
        }

    }

    getToken(): string {
        return this.token;
    }

}