import faker from 'faker'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/mocks'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { HttpGetParams } from '@/data/contracts/http'

type SutTypes = {
    sut: AuthorizeHttpGetClientDecorator
    getStorageSpy: GetStorageSpy
    httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
    return { getStorageSpy, sut, httpGetClientSpy }
}

describe('AuthorizeHttpGetClientDecorator', () => {
    test('Should call GetStorage with correct value', () => {
        const { getStorageSpy, sut } = makeSut()
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })

    test('Should not add headers if GetStorage is invalid', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httpRequest: HttpGetParams = {
            url: faker.internet.url(),
            headers: {
                field: faker.random.words()
            }
        }
        await sut.get(httpRequest)
        expect(httpGetClientSpy.url).toBe(httpRequest.url)
        expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
    })
})
