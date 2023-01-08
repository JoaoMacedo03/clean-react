import { AuthenticationParams, IAuthentication } from '@/domain/useCases'
import { IHttpPostClient, HttpStatusCode } from '@/data/contracts/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export class RemoteAuthentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
