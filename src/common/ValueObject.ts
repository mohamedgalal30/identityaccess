export abstract class ValueObject<T extends Object> {
    equals(aValueObject: T): boolean {
        // class names are equal
        // all attributes are equal
        return true
    }
    copy() {

    }
}
