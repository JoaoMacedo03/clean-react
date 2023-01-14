import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { render } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route caseSensitive path='/' element={<PrivateRoute />}>
                    <Route path='/' caseSensitive element={<SurveyList />} />
                </Route>
            </Routes>
        </Router>
    )
    return { history }
}

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/login')
    })
})
