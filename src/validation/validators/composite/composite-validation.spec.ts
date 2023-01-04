import { FieldValidationSpy } from '../mocks/mock-field-validation'
import { ValidationComposite } from './composite-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('InvalidFieldError')
    fieldValidationsSpy[1].error = new Error('SecondInvalidFieldError')

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('InvalidFieldError')
  })

  test('Should return false if all validation succeeds', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('InvalidFieldError')
    fieldValidationsSpy[1].error = new Error('SecondInvalidFieldError')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('InvalidFieldError')
  })
})
