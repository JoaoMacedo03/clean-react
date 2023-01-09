import React, { useContext, useRef } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState(current => {
      return { ...current, [event.target.name]: event.target.value }
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        ref={inputRef}
        onFocus={e => { e.target.readOnly = false }}
        onChange={handleChange}
      />
      <label onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
      <span
        title={error || 'Tudo certo!'}
        data-testid={`${props.name}-status`}
        className={Styles.status}>
        {error ? '🔴️' : '🟢️'}
      </span>
    </div>
  )
}

export default Input
