import { HttpPostParams, IHttpPostClient } from '../contracts/http/IHttp-post-client'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string

    async post ({ url }: HttpPostParams): Promise<void> {
      this.url = url
      return Promise.resolve()
    }
}
