import { HttpPostParams, HttpResponse, IHttpPostClient } from '@/data/contracts/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse

    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response ? error.response : 'Erro interno servidor'
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
