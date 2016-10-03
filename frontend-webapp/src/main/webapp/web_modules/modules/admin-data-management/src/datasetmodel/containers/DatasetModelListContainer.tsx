import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import ModelListComponent from "../components/DatasetModelListComponent"
import ModelSelectors from "../model/model.selectors"
import { connect } from "react-redux"
import { DatasetModel } from "@regardsoss/models"
/**
 */
interface ModelListProps {
  // From router
  params: any
  // From mapStateToProps
  datasetModels?: Array<DatasetModel>
}
export class ModelListContainer extends React.Component<ModelListProps, any> {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement"
  }
  getCreateUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasetmodel/create"
  }

  render (): JSX.Element {
    const {datasetModels} = this.props
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <ModelListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasetModels={datasetModels}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  const datasetModels = ModelSelectors.getDatasetModels(state)
  return {
    datasetModels
  }
}
export default connect<{}, {}, ModelListProps>(mapStateToProps, null)(ModelListContainer)
