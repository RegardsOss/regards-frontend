/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceActions, datasourceSelectors } from '../clients/DatasourceClient'
import DatasourceListComponent from '../components/DatasourceListComponent'

/**
 * Show the datasource list
 */
export class DatasourceListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    datasourceList: DataManagementShapes.DatasourceList,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchDatasourceList: PropTypes.func,
    deleteDatasource: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchDatasourceList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/create/connection`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
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
      <I18nProvider messageDir="business-modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <DatasourceListComponent
            datasourceList={datasourceList}
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
  datasourceList: datasourceSelectors.getList(state),
  isFetching: datasourceSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasourceList: () => dispatch(datasourceActions.fetchEntityList()),
  deleteDatasource: id => dispatch(datasourceActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceListContainer)
