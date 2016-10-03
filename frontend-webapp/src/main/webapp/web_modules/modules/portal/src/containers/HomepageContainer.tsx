import * as React from "react"
import {I18nProvider} from "@regardsoss/i18n"
import HomepageComponent from "../components/HomepageComponent"
import { ComposedInjector } from "@regardsoss/injector"

interface HomepageProps {
  // From Router
  params: any
  newsList: any
  projects: any
}
/**
 */
export class HomepageContainer extends React.Component<HomepageProps, any> {

  render (): JSX.Element {
    const {params, newsList, projects} = this.props
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <ComposedInjector >
          <HomepageComponent
            theme={null}
            intl={null}
            params={params}
            newsList={newsList}
            projects={projects}
          />
        </ComposedInjector>
      </I18nProvider>
    )
  }
}


export default HomepageContainer
