import React, { useEffect } from 'react'
import { ILoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty } from './components'
import Styles from './survey-list-styles.scss'

type Props = {
    loadSurveyList: ILoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    useEffect(() => {
        (async function () {
            loadSurveyList.loadAll()
        })()
    }, [])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                    <SurveyItemEmpty />
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList
