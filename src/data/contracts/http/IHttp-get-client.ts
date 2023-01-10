import { HttpResponse } from './IHttp-response'

export type HttpGetParams = {
    url: string
  }

export interface IHttpGetClient<R = any> {
    get(params: HttpGetParams): Promise<HttpResponse<R>>
}
