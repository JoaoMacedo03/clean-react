import { IGetStorage } from '@/data/contracts/cache'
import { HttpGetParams, HttpResponse, IHttpGetClient } from '@/data/contracts/http'

export class AuthorizeHttpGetClientDecorator implements IHttpGetClient {
    constructor (private readonly getStorage: IGetStorage) {}
    async get (params: HttpGetParams): Promise<HttpResponse> {
        this.getStorage.get('account')
        return null
    }
}
