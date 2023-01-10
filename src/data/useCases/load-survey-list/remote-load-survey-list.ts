import { HttpStatusCode, IHttpGetClient } from '@/data/contracts/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList {
    constructor (
        private readonly url: string,
        private readonly httpGetClient: IHttpGetClient
    ) {}

    async loadAll (): Promise<void> {
        const httpResponse = await this.httpGetClient.get({ url: this.url })
        switch (httpResponse.statusCode) {
          case HttpStatusCode.success: break
          default: throw new UnexpectedError()
        }
    }
}
