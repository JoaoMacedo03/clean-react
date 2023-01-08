import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Factory = {
  MakeLogin: React.FC
  MakeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' caseSensitive element={<factory.MakeLogin />} />
        <Route path='/signup' caseSensitive element={<factory.MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
