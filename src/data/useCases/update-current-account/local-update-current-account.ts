import { ISetStorage } from '@/data/contracts/cache/ISet-storage'
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { IUpdateCurrentAccount } from '@/domain/useCases'

export class LocalUpdateCurrentAccount implements IUpdateCurrentAccount {
    constructor (private readonly setStorage: ISetStorage) {}

    async save (account: AccountModel): Promise<void> {
        if (!account?.accessToken) throw new UnexpectedError()
        await this.setStorage.set('account', JSON.stringify(account))
    }
}
