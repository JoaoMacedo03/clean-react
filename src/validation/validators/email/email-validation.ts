import { IFieldValidation } from '@/validation/contracts/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements IFieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): InvalidFieldError {
    return new InvalidFieldError()
  }
}
