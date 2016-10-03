import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import { connect } from "react-redux"
import { ModelAttribute } from "@regardsoss/models"
import { addDatasetModel } from "../model/model.actions"
import DatasetModelCreateComponent from "../components/add/DatasetModelCreateComponent"
import { browserHistory } from "react-router"

/**
 */
interface ModelCreateProps {
  // From router
  params: any
  // From mapDispatchToProps
  addDatasetModel?: (name: string, attributes: Array<ModelAttribute>) => void
}
export class ModelCreateContainer extends React.Component<ModelCreateProps, any> {

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

  handleNextStep = (name: string, attributes: Array<ModelAttribute>) => {
    this.props.addDatasetModel(name, attributes)
    browserHistory.push(this.getCancelUrl())
  }

  render (): JSX.Element {
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <DatasetModelCreateComponent
          getCancelUrl={this.getCancelUrl}
          handleNextStep={this.handleNextStep}
        />
      </I18nProvider>
    )
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  addDatasetModel: (name: string, attributes: Array<ModelAttribute>) => dispatch(addDatasetModel(name, attributes)),
})
export default connect<{}, {}, ModelCreateProps>(null, mapDispatchToProps)(ModelCreateContainer)
