import { HttpStatusCode, IHttpPostClient } from '@/data/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { AccountModel } from '@/domain/models'
import { AddAccountParams, IAddAcount } from '@/domain/useCases'

export class RemoteAddAccount implements IAddAcount {
    constructor (
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient<AccountModel>
      ) {}

    async add (params: AddAccountParams): Promise<AccountModel> {
        const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.success: return httpResponse.body
            case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
          }
    }
}
