export interface ValidatorStrategy<T> {
    validate(t: T): void
}

export class Validator<T> {
    private validator: ValidatorStrategy<T>;
    constructor(aValidator: ValidatorStrategy<T>) {
        this.validator = aValidator;
    }

    validate(t: T) {
        this.validator.validate(t)
    }
}