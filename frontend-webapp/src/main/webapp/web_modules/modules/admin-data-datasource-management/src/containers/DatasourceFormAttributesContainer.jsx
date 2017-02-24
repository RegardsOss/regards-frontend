/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { map, find, forEach, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Datasource, Model, ModelAttribute, Connection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasourceSelectors from './../model/DatasourceSelectors'
import DatasourceActions from './../model/DatasourceActions'
import DatasourceFormAttributesComponent from '../components/DatasourceFormAttributesComponent'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'
import ConnectionActions from './../model/ConnectionActions'
import ConnectionSelectors from './../model/ConnectionSelectors'


/**
 * Show the datasource form
 */
export class DatasourceFormAttributesContainer extends React.Component {

  static propTypes = {
    currentDatasource: Datasource.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
    isCreating: React.PropTypes.bool.isRequired,
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
      this.props.fetchConnection(this.props.currentConnectionId)
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { currentDatasource, currentConnection, modelList, handleSave, backUrl } = this.props

    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-datasource-management/src/i18n">
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
  modelList: ModelSelectors.getList(state),
  currentConnection: ConnectionSelectors.getById(state, parseInt(ownProps.currentConnectionId,10)),
})

const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(ModelActions.fetchEntityList({ type: 'OBJECT' })),
  fetchConnection: (id) => dispatch(ConnectionActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormAttributesContainer)
