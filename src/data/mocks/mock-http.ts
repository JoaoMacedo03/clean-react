import {
  HttpPostParams,
  IHttpPostClient,
  HttpResponse,
  HttpStatusCode,
  HttpGetParams,
  IHttpGetClient
} from '@/data/contracts/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

export class HttpPostClientSpy<R> implements IHttpPostClient<R> {
    url?: string
    body?: any
    response: HttpResponse<R> = {
      statusCode: HttpStatusCode.success
    }

    async post ({ url, body }: HttpPostParams): Promise<HttpResponse<R>> {
      this.url = url
      this.body = body

      return this.response
    }
}

export class HttpGetClientSpy<R> implements IHttpGetClient<R> {
  url: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
      this.url = params.url
      return this.response
  }
}
