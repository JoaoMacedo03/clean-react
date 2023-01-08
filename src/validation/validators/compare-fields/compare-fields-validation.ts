import { IFieldValidation } from '@/validation/contracts/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    readonly valueToCompare: string
    ) {}

  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null
  }
}
