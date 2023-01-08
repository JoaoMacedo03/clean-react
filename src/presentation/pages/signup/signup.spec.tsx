import React from 'react'
import faker from 'faker'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { Helper, ValidationStub } from '@/presentation/mocks'
import SignUp from './signup'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError

    const sut = render(
        <SignUp
            validation={validationStub}
        />
    )
    return {
      sut
    }
}

describe('Signup component', () => {
    afterEach(cleanup)

    test('Should start with initial state', () => {
        const validationError = 'Campo obrigatório'
        const { sut } = makeSut({ validationError })
        Helper.testChildCount(sut, 'error-wrap', 0)
        Helper.testButtonIsDisabled(sut, 'submit', true)
        Helper.testStatusForField(sut, 'name', validationError)
        Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
        Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
        Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
    })

    test('Should show name error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.populateField(sut, 'name')
        Helper.testStatusForField(sut, 'name', validationError)
    })
})
