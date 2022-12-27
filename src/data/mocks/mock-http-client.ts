import { HttpPostParams, IHttpPostClient } from '@/data/contracts/http/IHttp-post-client'
import { HttpResponse, HttpStatusCode } from '@/data/contracts/http/IHttpResponse'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string
    body?: object
    response: HttpResponse = {
      statusCode: HttpStatusCode.success
    }

    async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
      this.url = url
      this.body = body
      return Promise.resolve(this.response)
    }
}
