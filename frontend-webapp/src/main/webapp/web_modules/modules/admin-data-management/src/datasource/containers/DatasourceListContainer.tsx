import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import { Datasource } from "@regardsoss/models"
import DatasourceListComponent from "../components/list/DatasourceListComponent"
import DatasourceSelectors from "../model/datasource.selectors"
import { connect } from "react-redux"


interface DatasourceListProps {
  // From router
  params: any

  // From mapStateToProps
  datasources?: Array<Datasource>
}


/**
 */
class DatasourceListContainer extends React.Component<DatasourceListProps, any> {


  getBackUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement"
  }

  getCreateUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasource/create"
  }

  render (): JSX.Element {
    const {datasources} = this.props
    console.log(datasources)
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <DatasourceListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasources={datasources}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  const datasources = DatasourceSelectors.getDatasources(state)
  return {
    datasources
  }
}
export default connect<{}, {}, DatasourceListProps>(mapStateToProps, null)(DatasourceListContainer)
