import { ISetStorage } from '@/data/contracts/cache/ISet-storage'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): ISetStorage => {
    return new LocalStorageAdapter()
  }
