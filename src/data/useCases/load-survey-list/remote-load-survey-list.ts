import { HttpStatusCode, IHttpGetClient } from '@/data/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { ILoadSurveyList } from '@/domain/useCases'

export class RemoteLoadSurveyList implements ILoadSurveyList {
    constructor (
        private readonly url: string,
        private readonly httpGetClient: IHttpGetClient<RemoteLoadSurveyList.Model[]>
    ) {}

    async loadAll (): Promise<ILoadSurveyList.Model[]> {
        const httpResponse = await this.httpGetClient.get({ url: this.url })
        const remoteSurveys = httpResponse.body || []
        switch (httpResponse.statusCode) {
          case HttpStatusCode.success: return remoteSurveys.map(
                remoteSurvey => (
                    { ...remoteSurvey, date: new Date(remoteSurvey.date) }
                )
            )
          case HttpStatusCode.noContent: return []
          case HttpStatusCode.forbidden: throw new AccessDeniedError()
          default: throw new UnexpectedError()
        }
    }
}

export namespace RemoteLoadSurveyList {
    export type Model = {
        id: string
        question: string
        date: string
        didAnswer: boolean
      }
}
