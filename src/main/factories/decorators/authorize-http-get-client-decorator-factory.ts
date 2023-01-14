import { IHttpGetClient } from '@/data/contracts/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeAuthorizeHttpGetClientDecorator = (): IHttpGetClient => {
    return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
