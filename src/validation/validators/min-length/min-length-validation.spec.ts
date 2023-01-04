import faker, { fake } from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (minLength: number): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), minLength)
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut(9)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value is valid', () => {
    const sut = makeSut(9)
    const error = sut.validate(faker.random.alphaNumeric(9))
    expect(error).toBeFalsy()
  })
})
