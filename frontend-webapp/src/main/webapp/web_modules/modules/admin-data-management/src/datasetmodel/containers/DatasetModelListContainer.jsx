
import { I18nProvider } from '@regardsoss/i18n'
import ModelListComponent from '../components/DatasetModelListComponent'
import ModelSelectors from '../model/model.selectors'
import { connect } from 'react-redux'
/**
 */
export class ModelListContainer extends React.Component {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement`
  }
  getCreateUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/datasetmodel/create`
  }

  render() {
    const { datasetModels } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <ModelListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          datasetModels={datasetModels}
        />
      </I18nProvider>
    )
  }
}
ModelListContainer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  datasetModels: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}
const mapStateToProps = (state) => {
  const datasetModels = ModelSelectors.getDatasetModels(state)
  return {
    datasetModels,
  }
}
export default connect(mapStateToProps, null)(ModelListContainer)
