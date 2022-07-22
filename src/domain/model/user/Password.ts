import bcrypt from 'bcrypt';


export class Password {
    private password: string;

    constructor(anPassword: string) {
        this.setPassword(anPassword);
    }

    private setPassword(anPassword: string): Password {
        if (!anPassword) {
            throw new Error("password not exists")
        }
        this.password = anPassword
        return this;
    }

    getPassword(): string {
        return this.password;
    }

    getEncryptedPassword(): string {
        return bcrypt.hashSync(this.password, 10);
    }
}
