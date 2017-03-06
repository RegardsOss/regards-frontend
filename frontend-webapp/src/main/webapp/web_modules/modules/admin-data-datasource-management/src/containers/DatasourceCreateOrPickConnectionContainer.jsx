/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Connection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ConnectionSelectors from './../model/ConnectionSelectors'
import ConnectionActions from './../model/ConnectionActions'
import DatasourceCreateOrPickConnectionComponent from '../components/DatasourceCreateOrPickConnectionComponent'


/**
 * Pick the datasource if existing or ask the user to create a new one
 */
export class DatasourceCreateOrPickConnectionContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    connectionList: React.PropTypes.objectOf(Connection),
    // from mapDispatchToProps
    fetchConnectionList: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchConnectionList())
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/list`
  }

  getCreateConnectionUrl= () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/connection/create`
  }

  redirectToForm = (connectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/datasource/create/${connectionId}`
    browserHistory.push(url)
  }

  render() {
    const { connectionList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <DatasourceCreateOrPickConnectionComponent
            connectionList={connectionList}
            createConnectionUrl={this.getCreateConnectionUrl()}
            backUrl={this.getBackUrl()}
            handleDone={this.redirectToForm}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  connectionList: ConnectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchConnectionList: () => dispatch(ConnectionActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceCreateOrPickConnectionContainer)
