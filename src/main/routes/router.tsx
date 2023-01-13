import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeLogin, MakeSignUp } from '@/main/factories/pages'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' caseSensitive element={<MakeLogin />} />
        <Route path='/signup' caseSensitive element={<MakeSignUp />} />
        <Route path='/' caseSensitive element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
