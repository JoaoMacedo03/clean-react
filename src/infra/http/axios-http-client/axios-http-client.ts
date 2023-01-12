import { HttpGetParams, HttpPostParams, HttpResponse, IHttpGetClient, IHttpPostClient } from '@/data/contracts/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpPostClient, IHttpGetClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response ? error.response : 'Erro interno servidor'
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const axiosResponse = await axios.get(params.url)
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
