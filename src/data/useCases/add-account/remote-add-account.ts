import { HttpStatusCode, IHttpPostClient } from '@/data/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { IAddAccount } from '@/domain/useCases'

export class RemoteAddAccount implements IAddAccount {
  constructor (
      private readonly url: string,
      private readonly httpPostClient: IHttpPostClient<RemoteAddAccount.Model>
    ) {}

  async add (params: IAddAccount.Params): Promise<IAddAccount.Model> {
      const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })
      switch (httpResponse.statusCode) {
        case HttpStatusCode.success: return httpResponse.body
        case HttpStatusCode.forbidden: throw new EmailInUseError()
        default: throw new UnexpectedError()
      }
  }
}

export namespace RemoteAddAccount {
  export type Model = IAddAccount.Model
}
