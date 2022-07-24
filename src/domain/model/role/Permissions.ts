
export interface IPermissions {
	//iam for identity and access management.
	iam?: {
		users?: string[];
		roles?: string[];
		sessions?: string[];
	};
}

export class Permissions {

	static PermissionsScheme: IPermissions = {
		iam: {
			users: ["assignRole"],
			roles: ["create", "edit", "delete"],
			sessions: ["invalidate"]
		},
	}


	private permissions: IPermissions;

	constructor(permissionsPayload: IPermissions | "*") {
		if (permissionsPayload === "*") {
			this.setPermissions(Permissions.PermissionsScheme);
		} else {
			this.setPermissions(permissionsPayload);
		}

	}

	private setPermissions(permissions: IPermissions) {
		//TODO: validate permissions object scheme
		this.permissions = permissions;
	}


	getPermissions(): IPermissions {
		return this.permissions;
	}

};
