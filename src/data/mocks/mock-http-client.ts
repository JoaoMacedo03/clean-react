import { HttpPostParams, IHttpPostClient } from '@/data/contracts/http/IHttp-post-client'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string
    body?: object

    async post ({ url, body }: HttpPostParams): Promise<void> {
      this.url = url
      this.body = body

      return Promise.resolve()
    }
}
