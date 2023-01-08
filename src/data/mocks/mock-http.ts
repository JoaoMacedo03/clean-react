import { HttpPostParams, IHttpPostClient, HttpResponse, HttpStatusCode } from '@/data/contracts/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export class HttpPostClientSpy<T, R> implements IHttpPostClient<T, R> {
    url?: string
    body?: T
    response: HttpResponse<R> = {
      statusCode: HttpStatusCode.success
    }

    async post ({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
      this.url = url
      this.body = body

      return this.response
    }
}
