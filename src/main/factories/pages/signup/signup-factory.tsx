import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/useCases/update-current-account/local-update-current-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/useCases/add-account/remote-add-account-factory'

export const MakeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
