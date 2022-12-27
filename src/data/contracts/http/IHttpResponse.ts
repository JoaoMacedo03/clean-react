export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  success = 200,
  notFound = 404,
  serverError = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
