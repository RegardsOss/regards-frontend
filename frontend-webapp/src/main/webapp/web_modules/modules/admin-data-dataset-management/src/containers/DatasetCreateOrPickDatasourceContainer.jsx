/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { map, find, forEach, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Datasource } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasourceSelectors from './../model/DatasourceSelectors'
import DatasourceActions from './../model/DatasourceActions'
import DatasetCreateOrPickDatasourceComponent from '../components/DatasetCreateOrPickDatasourceComponent'


/**
 * Pick the datasource if existing or ask the user to create a new one
 */
export class DatasetCreateOrPickDatasourceContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    datasourceList: React.PropTypes.objectOf(Datasource),
    isFetchingDatasource: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchDatasourceList: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchDatasourceList()
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/dataset/list`
  }
  getCreateDatasourceUrl= () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/create`
  }

  redirectToForm = (datasourceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/create/${datasourceId}`
    browserHistory.push(url)
  }

  render() {
    const { isFetchingDatasource, datasourceList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetchingDatasource}
        >
          <DatasetCreateOrPickDatasourceComponent
            datasourceList={datasourceList}
            createDatasourceUrl={this.getCreateDatasourceUrl()}
            backUrl={this.getBackUrl()}
            handleDone={this.redirectToForm}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetchingDatasource: DatasourceSelectors.isFetching(state),
  datasourceList: DatasourceSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasourceList: () => dispatch(DatasourceActions.fetchPagedEntityList(0, 1000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetCreateOrPickDatasourceContainer)
