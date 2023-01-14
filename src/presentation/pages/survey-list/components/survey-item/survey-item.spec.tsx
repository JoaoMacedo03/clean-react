import React from 'react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import { mockSurveyModel } from '@/domain/mocks'
import { IconName } from '@/presentation/components'

describe('SurveyItem Component', () => {
    test('Should render with correct value', () => {
        const survey = mockSurveyModel()
        survey.didAnswer = true
        survey.date = new Date('2022-01-10T00:00:00')
        render(<SurveyItem survey={survey} />)
        expect(screen.queryByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
        expect(screen.queryByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.queryByTestId('day')).toHaveTextContent('10')
        expect(screen.queryByTestId('month')).toHaveTextContent('jan')
        expect(screen.queryByTestId('year')).toHaveTextContent('2022')
    })
})
