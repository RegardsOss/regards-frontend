/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Datasource, Model, Connection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasourceFormAttributesComponent from '../components/DatasourceFormAttributesComponent'
import { modelSelectors, modelActions } from '../client/ModelClient'
import { connectionActions, connectionSelectors } from './../client/ConnectionClient'


/**
 * Show the datasource form
 */
export class DatasourceFormAttributesContainer extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    handleSave: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    currentConnectionId: React.PropTypes.string.isRequired,
    // from mapStateToProps
    modelList: React.PropTypes.objectOf(Model),
    currentConnection: Connection,
    // from mapDispatchToProps
    fetchModelList: React.PropTypes.func,
    fetchConnection: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchModelList(),
      this.props.fetchConnection(this.props.currentConnectionId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const { currentDatasource, currentConnection, modelList, handleSave, backUrl } = this.props
    const { isLoading } = this.state

    return (
      <I18nProvider messageDir="business-modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasourceFormAttributesComponent
            modelList={modelList}
            currentDatasource={currentDatasource}
            currentConnection={currentConnection}
            onSubmit={handleSave}
            backUrl={backUrl}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelList: modelSelectors.getList(state),
  currentConnection: connectionSelectors.getById(state, parseInt(ownProps.currentConnectionId, 10)),
})

const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATA' })),
  fetchConnection: id => dispatch(connectionActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormAttributesContainer)
