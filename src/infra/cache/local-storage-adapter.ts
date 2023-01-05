import { ISetStorage } from '@/data/contracts/cache/ISet-storage'

export class LocalStorageAdapter implements ISetStorage {
    async set (key: string, value: any): Promise<void> {
        localStorage.setItem(key, value)
    }
}
