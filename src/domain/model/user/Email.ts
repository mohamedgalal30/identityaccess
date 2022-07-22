export class Email {
    private emailAddress: string;

    constructor(anEmail: string) {
        this.setEmailAddress(anEmail);
    }

    private setEmailAddress(anEmail: string): Email {
        if (!anEmail) {
            throw new Error("email not exists")
        }
        this.emailAddress = anEmail
        return this;
    }

    toString(): string {
        return this.emailAddress;
    }
}
