import { HttpPostParams, IHttpPostClient } from '@/data/contracts/http/IHttp-post-client'
import { HttpResponse, HttpStatusCode } from '@/data/contracts/http/IHttpResponse'

export class HttpPostClientSpy<T, R> implements IHttpPostClient<T, R> {
    url?: string
    body?: T
    response: HttpResponse<R> = {
      statusCode: HttpStatusCode.success
    }

    async post ({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
      this.url = url
      this.body = body
      return Promise.resolve(this.response)
    }
}
