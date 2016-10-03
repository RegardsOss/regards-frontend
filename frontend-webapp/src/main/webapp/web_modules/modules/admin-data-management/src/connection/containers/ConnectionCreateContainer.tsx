import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import { browserHistory } from "react-router"
import ConnectionCreateComponent from "../components/add/ConnectionCreateComponent"
import { connect } from "react-redux"
import { addConnection } from "../model/ConnectionActions"


/**
 */
interface ConnectionCreateProps {
  // From router
  params: any
  // From mapDispatchToProps
  addConnection?: (name: string, pluginName: string, requiredAttributes: {[index: string]: string}) => void
}
class ConnectionCreateContainer extends React.Component<ConnectionCreateProps, any> {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    } else {
      const projectName = this.props.params.project
      return "/admin/" + projectName + "/datamanagement/connection"
    }
  }

  handleNextStep = (name: string, pluginName: string, requiredAttributes: {[index: string]: string}) => {
    this.props.addConnection(name, pluginName, requiredAttributes)
    console.log(name, pluginName, requiredAttributes)
    browserHistory.push(this.getCancelUrl())
  }

  render (): JSX.Element {
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <ConnectionCreateComponent
          getCancelUrl={this.getCancelUrl}
          handleNextStep={this.handleNextStep}
        />
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addConnection: (name: string, pluginName: string, requiredAttributes: {[index: string]: string}) =>
    dispatch(addConnection(name, pluginName, requiredAttributes))
})
export default connect<{}, {}, ConnectionCreateProps>(null, mapDispatchToProps)(ConnectionCreateContainer)
