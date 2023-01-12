import React, { useEffect, useState } from 'react'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'
import { IValidation } from '@/presentation/contracts/validation'
import { IAddAcount, ISaveAccessToken } from '@/domain/useCases'
import { useNavigate , Link } from 'react-router-dom'

type Props = {
  validation: IValidation
  addAccount: IAddAcount
  saveAccessToken: ISaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const naviagate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation', formData
    )

    setState(current => {
      return {
        ...current,
        nameError,
        emailError,
        passwordError,
        passwordConfirmationError,
        isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
      }
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState(current => { return { ...current, isLoading: true } })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      naviagate('/')
    } catch (error) {
      setState(current => {
        return {
          ...current,
          mainError: error.message,
          isLoading: false
        }
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <SubmitButton text="Cadastrar" />
          <Link to="/login" data-testid="login" className={Styles.link}>
            Voltar para login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
