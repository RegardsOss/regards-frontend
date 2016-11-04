import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import { addDatasetModel } from '../model/model.actions'
import DatasetModelCreateComponent from '../components/add/DatasetModelCreateComponent'

/**
 */
export class ModelCreateContainer extends React.Component {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    }
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/datasetmodel`
  }

  handleNextStep = (name, attributes) => {
    this.props.addDatasetModel(name, attributes)
    browserHistory.push(this.getCancelUrl())
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <DatasetModelCreateComponent
          getCancelUrl={this.getCancelUrl}
          handleNextStep={this.handleNextStep}
        />
      </I18nProvider>
    )
  }
}
ModelCreateContainer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  addDatasetModel: React.PropTypes.func,
}
const mapDispatchToProps = dispatch => ({
  addDatasetModel: (name, attributes) => dispatch(addDatasetModel(name, attributes)),
})
export default connect(null, mapDispatchToProps)(ModelCreateContainer)
