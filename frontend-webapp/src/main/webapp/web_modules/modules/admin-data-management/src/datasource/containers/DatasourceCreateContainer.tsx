import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import { connect } from "react-redux"
import { addDatasource } from "../model/datasource.actions"
import { browserHistory } from "react-router"
import CreateDatasourceFormComponent from "../components/add/CreateDatasourceFormComponent"
import DatasourceSelectors from "../model/datasource.selectors"

interface DatasourceCreateProps {
  // From router
  params: any
  // From mapDispatchToProps
  addDatasource?: (name: string) => void

  // From mapStateToProps
  connections: any
  modelObjects: any
  pluginDatasources: any
}
export class DatasourceCreateContainer extends React.Component<DatasourceCreateProps, any> {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    } else {
      const projectName = this.props.params.project
      return "/admin/" + projectName + "/datamanagement/datasetmodel"
    }
  }

  handleNextStep = (name: string) => {
    this.props.addDatasource(name)
    browserHistory.push(this.getCancelUrl())
  }

  render (): JSX.Element {
    const {connections, modelObjects, pluginDatasources} = this.props
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <CreateDatasourceFormComponent
          cancelUrl={this.getCancelUrl()}
          connections={connections}
          modelObjects={modelObjects}
          save={this.handleNextStep}
          pluginDatasources={pluginDatasources}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const connections = DatasourceSelectors.getDatasources(state)
  const modelObjects: any = null
  const pluginDatasources = [{
    name: "CIPAD PostgreSQL",
    id: 1
  }, {
    name: "Tartanpion MongoDB",
    id: 2
  }]
  return {
    connections,
    modelObjects,
    pluginDatasources
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  addDatasource: (name: string) => dispatch(addDatasource(null, null, null, name)),
})
export default connect<{}, {}, DatasourceCreateProps>(mapStateToProps, mapDispatchToProps)(DatasourceCreateContainer)
