import { IGetStorage, ISetStorage } from '@/data/contracts/cache'

export class LocalStorageAdapter implements ISetStorage, IGetStorage {
    set (key: string, value: object): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    get (key: string): any {
        return JSON.parse(localStorage.getItem(key))
    }
}
