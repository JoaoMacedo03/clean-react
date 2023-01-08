import { IHttpPostClient } from '@/data/contracts/http'
import { AccountModel } from '@/domain/models'
import { AddAccountParams, IAddAcount } from '@/domain/useCases'

export class RemoteAddAccount implements IAddAcount {
    constructor (
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient<AddAccountParams, AccountModel>
      ) {}

    async add (params: AddAccountParams): Promise<AccountModel> {
        await this.httpPostClient.post({ url: this.url, body: params })
        return null
    }
}
