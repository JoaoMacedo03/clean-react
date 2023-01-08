import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { MakeLogin, MakeSignUp } from './factories/pages'

ReactDOM.render(
  <Router
    MakeLogin={MakeLogin}
    MakeSignUp={MakeSignUp}
  />,
  document.getElementById('main')
)
