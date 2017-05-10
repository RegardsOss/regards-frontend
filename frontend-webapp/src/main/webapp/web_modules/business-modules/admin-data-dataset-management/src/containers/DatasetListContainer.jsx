/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Dataset } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasetActions, datasetSelectors } from '../client/DatasetClient'
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
    // from mapDispatchToProps
    fetchDatasetList: React.PropTypes.func,
    deleteDataset: React.PropTypes.func,
  }
  state = {
    isLoading: true,
  }
  componentWillMount() {
    Promise.resolve(this.props.fetchDatasetList())
      .then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
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
    const { datasetList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
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
  datasetList: datasetSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasetList: () => dispatch(datasetActions.fetchPagedEntityList(0, 100)),
  deleteDataset: id => dispatch(datasetActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListContainer)
