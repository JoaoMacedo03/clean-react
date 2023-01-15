import React, { memo, useContext } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    const naviagate = useNavigate()
    const { setCurrentAccount } = useContext(ApiContext)
    const logout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        setCurrentAccount(undefined)
        naviagate('/login')
    }

    return (
        <header className={Styles.headerWrap}>
            <div className={Styles.headerContent}>
                <Logo />
                <div className={Styles.logoutWrap}>
                    <span>Joao Macedo</span>
                    <a data-testid="logout" href="#" onClick={logout}>Sair</a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)
