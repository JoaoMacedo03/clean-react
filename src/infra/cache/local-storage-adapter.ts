import { ISetStorage } from '@/data/contracts/cache/ISet-storage'

export class LocalStorageAdapter implements ISetStorage {
    set (key: string, value: object): void {
        localStorage.setItem(key, JSON.stringify(value))
    }
}
