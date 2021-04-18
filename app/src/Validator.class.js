export default class Validator {
    errors = [];
    input = "";
    value = null;
    
    constructor(input, value) {
        this.input = input;
        this.value = value;
    }

    required() {
        if (!this.value) {
            this.errors.push(`${this.input} is required.`);
        }
        return this;
    }

    minCharacters(min) {
        if (this.value.length < min) {
            this.errors.push(`${this.input} must contain more than ${min} characters.`);
        }
        return this;
    }

    maxCharacters(max) {
        if (this.value.length > max) {
            this.errors.push(`${this.input} must contain fewer than ${max} characters.`);
        }
        return this;
    }

    equals(value) {
        if (this.value !== value) {
            this.errors.push(`${this.input} must be equal with ${value}.`);
        }
        return this;
    }
}
