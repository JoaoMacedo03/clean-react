import { IHttpPostClient } from 'data/contracts/http/Ihttp-post-client'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string

    async post (url: string): Promise<void> {
      this.url = url
      return Promise.resolve()
    }
}
