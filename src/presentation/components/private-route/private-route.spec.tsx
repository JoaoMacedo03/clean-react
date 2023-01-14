import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { render } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/mocks'

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
        <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
            <Router location={history.location} navigator={history}>
                <Routes>
                    <Route caseSensitive path='/' element={<PrivateRoute />}>
                        <Route path='/' caseSensitive element={<SurveyList />} />
                    </Route>
                </Routes>
            </Router>
        </ApiContext.Provider>
    )
    return { history }
}

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty', () => {
        const { history } = makeSut(null)
        expect(history.location.pathname).toBe('/login')
    })

    test('Should render current component if token is not empty', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/')
    })
})
