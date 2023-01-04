import { IValidation } from '@/presentation/contracts/validation'
import { IFieldValidation } from '@/validation/contracts/field-validation'

export class ValidationComposite implements IValidation {
  constructor (private readonly validators: IFieldValidation[]) {}

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
