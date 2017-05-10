/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Datasource } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceSelectors, datasourceActions } from './../client/DatasourceClient'
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
    // from mapDispatchToProps
    fetchDatasourceList: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchDatasourceList())
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/dataset/list`
  }
  getCreateDatasourceUrl= () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/create/connection`
  }

  redirectToForm = (datasourceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/create/${datasourceId}`
    browserHistory.push(url)
  }

  render() {
    const { datasourceList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
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
  datasourceList: datasourceSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasourceList: () => dispatch(datasourceActions.fetchPagedEntityList(0, 1000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetCreateOrPickDatasourceContainer)
