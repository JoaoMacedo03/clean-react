import * as Helper from './http-mocks'

export const mockInUseEmailError = (): void => Helper.mockEmailInUseError(/signup/)
