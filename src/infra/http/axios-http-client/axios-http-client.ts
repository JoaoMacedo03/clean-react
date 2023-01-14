import { HttpGetParams, HttpPostParams, HttpResponse, IHttpGetClient, IHttpPostClient } from '@/data/contracts/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpPostClient, IHttpGetClient {
  private adapt (axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response ? error.response : 'Erro interno servidor'
    }

    return this.adapt(axiosResponse)
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(params.url, { headers: params.headers })
    } catch (error) {
      axiosResponse = error.response ? error.response : 'Erro interno servidor'
    }

    return this.adapt(axiosResponse)
  }
}
