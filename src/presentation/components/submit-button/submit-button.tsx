import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)

  return (
    <button
      data-testid="submit"
      disabled={state.isFormInvalid}
      type="submit"
    >
      {text}
    </button>
  )
}

export default SubmitButton
