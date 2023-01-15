import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'

type SutTypes = {
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()

    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
            <Router location={history.location} navigator={history}>
                <Header />
            </Router>
        </ApiContext.Provider>
    )

    return { history, setCurrentAccountMock }
}

describe('', () => {
    test('Should call setCurrentAccount with null', () => {
        const { history, setCurrentAccountMock } = makeSut()
        fireEvent.click(screen.queryByTestId('logout'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })
})
