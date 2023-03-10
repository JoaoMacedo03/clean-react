import faker, { fake } from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 9)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 9)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(9) })
    expect(error).toBeFalsy()
  })

  test('Should return false if field does not exist in schema', () => {
    const sut = makeSut(faker.database.column(), 9)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(9) })
    expect(error).toBeFalsy()
  })
})
