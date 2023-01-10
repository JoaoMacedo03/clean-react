import { AccountModel } from '@/domain/models'

export type AddAccountParams = {
  email: string
  password: string
  name: string
  passwordConfirmation: string
}

export interface IAddAcount {
  add(params: AddAccountParams): Promise<AccountModel>
}
