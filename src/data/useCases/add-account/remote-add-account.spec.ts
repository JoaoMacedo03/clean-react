import faker from 'faker'
import { HttpPostClientSpy } from '@/data/mocks'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/useCases'
import { RemoteAddAccount } from './remote-add-account'
import { mockAddAccountParams } from '@/domain/mocks'
import { HttpStatusCode } from '@/data/contracts/http'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'

type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
  }

  const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)

    return {
      sut,
      httpPostClientSpy
    }
  }

describe('RemoteAddAccount', () => {
    test('Should call Http client with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.add(mockAddAccountParams())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call Http client with correct Body Test', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(httpPostClientSpy.body).toEqual(addAccountParams)
    })

    test('Should throw EmailInUserError if HttPostClient return 403', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
          statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new EmailInUseError())
    })
})
