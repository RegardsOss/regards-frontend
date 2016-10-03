import * as React from "react"
import {I18nProvider} from "@regardsoss/i18n"
import DatamanagementComponent from "../components/DatamanagementComponent"
import { ComposedInjector } from "@regardsoss/injector"

interface DatamanagementProps {
  // From Router
  params: any
}
/**
 */
class DatamanagementContainer extends React.Component<DatamanagementProps, any> {

  render (): JSX.Element {
    const {params} = this.props
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <ComposedInjector >
          <DatamanagementComponent theme={null} intl={null} params={params}/>
        </ComposedInjector>
      </I18nProvider>
    )
  }
}


export default DatamanagementContainer
