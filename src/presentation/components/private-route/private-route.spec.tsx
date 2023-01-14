import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { render } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty', () => {
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
        expect(history.location.pathname).toBe('/login')
    })
})
