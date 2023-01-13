import { ISetStorage } from '@/data/contracts/cache/ISet-storage'

export class LocalStorageAdapter implements ISetStorage {
    set (key: string, value: any): void {
        localStorage.setItem(key, value)
    }
}
