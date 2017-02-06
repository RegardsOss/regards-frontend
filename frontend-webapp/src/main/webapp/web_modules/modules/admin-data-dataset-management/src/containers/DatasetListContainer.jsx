/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Dataset } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetActions from '../model/DatasetActions'
import DatasetSelectors from '../model/DatasetSelectors'
import DatasetListComponent from '../components/DatasetListComponent'

/**
 * Show the dataset list
 */
export class DatasetListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    datasetList: React.PropTypes.objectOf(Dataset),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchDatasetList: React.PropTypes.func,
    deleteDataset: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchDatasetList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/dataset/create/datasource`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleEdit = (datasetId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/${datasetId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(datasetId) => {
    this.props.deleteDataset(datasetId)
  }

  render() {
    const { datasetList, isFetching } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <DatasetListComponent
            datasetList={datasetList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  datasetList: DatasetSelectors.getList(state),
  isFetching: DatasetSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasetList: () => dispatch(DatasetActions.fetchPagedEntityList(0, 100)),
  deleteDataset: id => dispatch(DatasetActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListContainer)
