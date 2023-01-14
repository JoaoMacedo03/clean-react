import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeLogin, MakeSignUp } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' caseSensitive element={<MakeLogin />} />
          <Route path='/signup' caseSensitive element={<MakeSignUp />} />
          <Route path='/' caseSensitive element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
