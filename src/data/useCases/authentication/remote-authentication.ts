import { AuthenticationParams } from '@/domain/useCases/IAuthentication'
import { IHttpPostClient } from '@/data/contracts/http/IHttp-post-client'
import { HttpStatusCode } from '@/data/contracts/http/IHttpResponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httResponse.statusCode) {
      case HttpStatusCode.success: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
