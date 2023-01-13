import { SetStorageMock } from '@/data/mocks'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/mocks'
import faker from 'faker'
import { LocalUpdateCurrentAccount } from './local-update-current-account'

type SutTypes = {
    sut: LocalUpdateCurrentAccount
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalUpdateCurrentAccount(setStorageMock)

    return {
        sut,
        setStorageMock
    }
}

describe('LocalUpdateCurrentAccount', () => {
    test('Should call setStorage with correct value', async () => {
        const { sut, setStorageMock } = makeSut()
        const account = mockAccountModel()
        await sut.save(account)
        expect(setStorageMock.key).toBe('account')
        expect(setStorageMock.value).toBe(JSON.stringify(account))
    })

    test('Should throw error if SetStorage receive a failure', async () => {
        const { sut, setStorageMock } = makeSut()
        jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
        const promise = sut.save(mockAccountModel())
        await expect(promise).rejects.toThrow(new Error())
    })

    test('Should throw error if account is falsy', async () => {
        const { sut } = makeSut()
        const promise = sut.save(undefined)
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})
