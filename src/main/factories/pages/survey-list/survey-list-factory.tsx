import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { makeLoadSurveyList } from '@/main/factories/useCases'

export const MakeSurveyList: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeLoadSurveyList()}
    />
  )
}
