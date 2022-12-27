import { AuthenticationParams, IAuthentication } from '@/domain/useCases/IAuthentication'
import { IHttpPostClient } from '@/data/contracts/http/IHttp-post-client'
import { HttpStatusCode } from '@/data/contracts/http/IHttpResponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { AccountModel } from '@/domain/models/account-model'

export class RemoteAuthentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httResponse.statusCode) {
      case HttpStatusCode.success: return httResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
