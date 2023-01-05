import { SetStorageMock } from '@/data/mocks/mock-storage'
import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
    sut: LocalSaveAccessToken
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalSaveAccessToken(setStorageMock)

    return {
        sut,
        setStorageMock
    }
}

describe('LocalSaveAccessToken', () => {
    test('Should call setStorage with correct value', async () => {
        const { sut, setStorageMock } = makeSut()
        const accessToken = faker.random.words()
        await sut.save(accessToken)
        expect(setStorageMock.key).toBe('accessToken')
        expect(setStorageMock.value).toBe(accessToken)
    })

    test('Should throw error if SetStorage receive a failure', async () => {
        const { sut, setStorageMock } = makeSut()
        jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
        const promise = sut.save(faker.random.words())
        await expect(promise).rejects.toThrow(new Error())
    })
})
