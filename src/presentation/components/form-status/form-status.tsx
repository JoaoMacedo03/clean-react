import React, { useContext } from 'react'
import { FormContext } from '@/presentation/contexts'
import Spinner from '../spinner/spinner'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state: { isLoading, mainError } } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} /> }
      { mainError &&
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      }
    </div>
  )
}

export default FormStatus
