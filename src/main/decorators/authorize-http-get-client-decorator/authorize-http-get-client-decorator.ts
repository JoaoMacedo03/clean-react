import { IGetStorage } from '@/data/contracts/cache'
import { HttpGetParams, HttpResponse, IHttpGetClient } from '@/data/contracts/http'

export class AuthorizeHttpGetClientDecorator implements IHttpGetClient {
    constructor (
        private readonly getStorage: IGetStorage,
        private readonly httpGetClient: IHttpGetClient
    ) {}

    async get (params: HttpGetParams): Promise<HttpResponse> {
        const account = this.getStorage.get('account')
        if (account?.accessToken) {
            params.headers = { ...params.headers, 'x-access-token': account.accessToken }
        }
        const httpResponse = await this.httpGetClient.get(params)
        return httpResponse
    }
}
