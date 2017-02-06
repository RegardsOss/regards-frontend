/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Datasource } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasourceActions from '../model/DatasourceActions'
import DatasourceSelectors from '../model/DatasourceSelectors'
import DatasourceListComponent from '../components/DatasourceListComponent'

/**
 * Show the datasource list
 */
export class DatasourceListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    datasourceList: React.PropTypes.objectOf(Datasource),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchDatasourceList: React.PropTypes.func,
    deleteDatasource: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchDatasourceList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleDuplicate = (datasourceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/datasource/${datasourceId}/duplicate`
    browserHistory.push(url)
  }

  handleEdit = (datasourceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/datasource/${datasourceId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(datasourceId) => {
    this.props.deleteDatasource(datasourceId)
  }

  render() {
    const { datasourceList, isFetching } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <DatasourceListComponent
            datasourceList={datasourceList}
            handleDuplicate={this.handleDuplicate}
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
  datasourceList: DatasourceSelectors.getList(state),
  isFetching: DatasourceSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasourceList: () => dispatch(DatasourceActions.fetchPagedEntityList(0, 100)),
  deleteDatasource: id => dispatch(DatasourceActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceListContainer)
