import { LocalSaveAccessToken } from '@/data/useCases/save-access-token/local-save-access-token'
import { ISaveAccessToken } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeLocalSaveAccessToken = (): ISaveAccessToken => {
    return new LocalSaveAccessToken(makeLocalStorageAdapter())
  }
