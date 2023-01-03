import { mockAccountModel } from '@/domain/mocks'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams, IAuthentication } from '@/domain/useCases'

export class AuthenticationSpy implements IAuthentication {
    account = mockAccountModel()
    params: AuthenticationParams

    async auth (params: AuthenticationParams): Promise<AccountModel> {
      this.params = params
      return Promise.resolve(this.account)
    }
}
