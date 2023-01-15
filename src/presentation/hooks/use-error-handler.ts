import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { AccessDeniedError } from '@/domain/errors'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
    const naviagate = useNavigate()
    const { setCurrentAccount } = useContext(ApiContext)
    return (error: Error): void => {
        if (error instanceof AccessDeniedError) {
            setCurrentAccount(undefined)
            naviagate('/login')
        } else {
            callback(error)
        }
    }
}
