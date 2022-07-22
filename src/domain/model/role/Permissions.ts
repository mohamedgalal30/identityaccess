
export interface IPermissions {
	iam?: {
		users?: string[];
		roles?: string[];
	};
}

export class Permissions {

	static PermissionsScheme: IPermissions = {
		iam: {
			users: ["assignRole"],
			roles: ["create", "edit", "delete"],
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
