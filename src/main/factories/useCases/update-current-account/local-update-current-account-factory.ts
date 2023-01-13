import { LocalUpdateCurrentAccount } from '@/data/useCases/update-current-account/local-update-current-account'
import { IUpdateCurrentAccount } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeLocalUpdateCurrentAccount = (): IUpdateCurrentAccount => {
    return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
  }
