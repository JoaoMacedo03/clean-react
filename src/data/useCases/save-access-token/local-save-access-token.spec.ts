import { SetStorageSpy } from '@/data/mocks/mock-storage'
import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
    sut: LocalSaveAccessToken
    setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)

    return {
        sut,
        setStorageSpy
    }
}

describe('LocalSaveAccessToken', () => {
    test('Should call setStorage with correct value', async () => {
        const { sut, setStorageSpy } = makeSut()
        const accessToken = faker.random.words()
        await sut.save(accessToken)
        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(accessToken)
    })
})
