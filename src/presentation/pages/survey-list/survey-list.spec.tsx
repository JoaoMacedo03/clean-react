import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { ILoadSurveyList } from '@/domain/useCases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/mocks'
import { UnexpectedError } from '@/domain/errors'
class LoadSurveyListSpy implements ILoadSurveyList {
    callsCount = 0
    surveys = mockSurveyListModel()

    async loadAll (): Promise<SurveyModel[]> {
        this.callsCount++
        return this.surveys
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
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
