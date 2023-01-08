import { mockAccountModel } from '@/domain/mocks'
import { AccountModel } from '@/domain/models'
import { AddAccountParams, IAddAcount } from '@/domain/useCases'

export class AddAccountSpy implements IAddAcount {
    account = mockAccountModel()
    params: AddAccountParams

    async add (params: AddAccountParams): Promise<AccountModel> {
      this.params = params
      return this.account
    }
}
