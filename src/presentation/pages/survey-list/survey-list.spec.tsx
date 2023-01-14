import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { ILoadSurveyList } from '@/domain/useCases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/mocks'
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

const makeSut = (): SutTypes => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    return { loadSurveyListSpy }
}

describe('SurveyList Component', () => {
    test('Should present 4 empty items on start', async () => {
        makeSut()
        const surveyList = screen.queryByTestId('survey-list')
        await waitFor(() => {
            expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
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
        })
    })

    test('Should render error on failure', async () => {
        makeSut()
        const surveyList = screen.queryByTestId('survey-list')
        await waitFor(() => {
            expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3)
        })
    })
})
