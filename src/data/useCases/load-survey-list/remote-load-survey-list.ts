import { HttpStatusCode, IHttpGetClient } from '@/data/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { ILoadSurveyList } from '@/domain/useCases'

export class RemoteLoadSurveyList implements ILoadSurveyList {
    constructor (
        private readonly url: string,
        private readonly httpGetClient: IHttpGetClient<SurveyModel[]>
    ) {}

    async loadAll (): Promise<SurveyModel[]> {
        const httpResponse = await this.httpGetClient.get({ url: this.url })
        switch (httpResponse.statusCode) {
          case HttpStatusCode.success: return httpResponse.body
          default: throw new UnexpectedError()
        }
    }
}
