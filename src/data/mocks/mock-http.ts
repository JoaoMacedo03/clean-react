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

export class HttpGetClientSpy implements IHttpGetClient {
  url: string

  async get (params: HttpGetParams): Promise<void> {
      this.url = params.url
  }
}
