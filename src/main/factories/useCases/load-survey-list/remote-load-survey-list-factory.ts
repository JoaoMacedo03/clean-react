import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { ILoadSurveyList } from '@/domain/useCases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeLoadSurveyList = (): ILoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}
