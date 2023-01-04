import { IFieldValidation } from '@/validation/contracts/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class FieldValidationSpy implements IFieldValidation {
    error: Error = null
    constructor (readonly field: string) {}

    validate (value: string): Error {
      return new InvalidFieldError()
    }
}
