import { ISetStorage } from '@/data/contracts/cache/ISet-storage'
import { ISaveAccessToken } from '@/domain/useCases/ISave-access-token'

export class LocalSaveAccessToken implements ISaveAccessToken {
    constructor (private readonly setStorage: ISetStorage) {}
    async save (accessToken: string): Promise<void> {
        await this.setStorage.set('accessToken', accessToken)
    }
}
