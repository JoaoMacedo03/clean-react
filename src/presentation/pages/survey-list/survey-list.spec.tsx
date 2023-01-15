import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/mocks'
import ApiContext from '@/presentation/contexts/api/api-context'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}

const history = createMemoryHistory()

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    render(
        <ApiContext.Provider value={{
            setCurrentAccount: jest.fn(),
            getCurrentAccount: () => mockAccountModel()
        }}>
            <Router location={history.location} navigator={history}>
                <SurveyList loadSurveyList={loadSurveyListSpy} />
            </Router>
        </ApiContext.Provider>
    )
    return { loadSurveyListSpy }
}

describe('SurveyList Component', () => {
    test('Should present 4 empty items on start', async () => {
        makeSut()
        const surveyList = screen.queryByTestId('survey-list')
        await waitFor(() => {
            expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
            expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        })
    })

    test('Should call LoadSurveyList', async () => {
        const { loadSurveyListSpy } = makeSut()
        await waitFor(() => {
            expect(loadSurveyListSpy.callsCount).toBe(1)
        })
    })

    test('Should render SurveyItem on success', async () => {
        makeSut()
        const surveyList = screen.queryByTestId('survey-list')
        await waitFor(() => {
            expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3)
            expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        })
    })

    test('Should render error on failure', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        const error = new UnexpectedError()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
        makeSut(loadSurveyListSpy)
        await waitFor(() => {
            expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
            expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
        })
    })

    test('Should call LoadSurveyList on reload', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
        makeSut(loadSurveyListSpy)

        await waitFor(() => {
            fireEvent.click(screen.getByTestId('reload'))
        })

        await waitFor(() => {
            expect(loadSurveyListSpy.callsCount).toBe(1)
        })
    })
})
