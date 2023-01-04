import { IFieldValidation } from '../contracts/field-validation'
import { RequiredFieldError } from '../errors'

export class RequiredFieldValidation implements IFieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new RequiredFieldError()
  }
}
