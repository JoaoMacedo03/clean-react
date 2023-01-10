import faker from 'faker'
import { HttpGetClientSpy } from '@/data/mocks'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpStatusCode } from '@/data/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'

type SutTypes = {
    sut: RemoteLoadSurveyList
    httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    return {
        sut,
        httpGetClientSpy
    }
}

describe('RemoteLoadSurveyList', () => {
    test('Should call HttpGetClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpGetClientSpy } = makeSut(url)
        await sut.loadAll()
        expect(httpGetClientSpy.url).toBe(url)
    })

    test('Should throw UnexpectedError if HttGetClient return 403', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttGetClient return 404', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.notFound
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttGetClient return 500', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.serverError
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})
