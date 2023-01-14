import React, { useEffect, useState } from 'react'
import { ILoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'
import { SurveyContext, SurveyError, SurveyListItem } from './components'
import Styles from './survey-list-styles.scss'
import { SurveyModel } from '@/domain/models'

type Props = {
    loadSurveyList: ILoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const [state, setState] = useState({
        surveys: [] as SurveyModel[],
        error: ''
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState(current => {
                return { ...current, surveys }
            }))
            .catch(error => setState(current => {
                return { ...current, error: error.message }
            }))
    }, [])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state }}>
                    {state.error ? <SurveyError /> : <SurveyListItem />}
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList
