import { RemoteAddAccount } from '@/data/useCases/add-account/remote-add-account'
import { IAddAcount } from '@/domain/useCases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAddAccount = (): IAddAcount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
