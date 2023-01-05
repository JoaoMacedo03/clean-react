import { HttpPostParams, HttpResponse, IHttpPostClient } from '@/data/contracts/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>

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
