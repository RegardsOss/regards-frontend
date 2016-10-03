import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import { connect } from "react-redux"
import { DatasetModel } from "@regardsoss/models"
import DatasourceModelListComponent from "../components/DatasourceModelListComponent"
/**
 */
interface DatasourceModelListProps {
  // From router
  params: any
  // From mapStateToProps
  datasourceModels?: Array<DatasetModel>
}

class DatasourceModelListContainer extends React.Component<DatasourceModelListProps, any> {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement"
  }
  getCreateUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasourcemodel/create"
  }

  render (): JSX.Element {
    const {datasourceModels} = this.props
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <DatasourceModelListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasourceModels={datasourceModels}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  const datasourceModels: any = null
  return {
    datasourceModels
  }
}
export default connect<{}, {}, DatasourceModelListProps>(mapStateToProps, null)(DatasourceModelListContainer)
