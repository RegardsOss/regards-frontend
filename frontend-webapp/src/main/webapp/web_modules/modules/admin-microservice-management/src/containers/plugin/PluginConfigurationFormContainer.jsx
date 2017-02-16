/**
 * LICENSE_PLACEHOLDER
 **/
import { map, difference, values } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginMetaData, PluginMetaDataList, PluginConfiguration, PluginConfigurationList } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginConfigurationFormComponent from '../../components/plugin/PluginConfigurationFormComponent'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'
import PluginConfigurationSelectors from '../../model/plugin/PluginConfigurationSelectors'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'

/**
 * Container connecting the plugin configuration from to the redux store and handling user actions.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microserviceName: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
      formMode: React.PropTypes.oneOf(['create', 'edit', 'copy']),
    }),
    // from mapStateToProps
    currentPluginMetaData: PluginMetaData,
    pluginMetaDataList: PluginMetaDataList,
    isPluginMetaDataFetching: React.PropTypes.bool,
    currentPluginConfiguration: PluginConfiguration,
    pluginConfigurationList: PluginConfigurationList,
    isPluginConfigurationFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginConfigurationList: React.PropTypes.func,
    createPluginConfiguration: React.PropTypes.func,
    updatePluginConfiguration: React.PropTypes.func,
    fetchPluginMetaDataList: React.PropTypes.func,
  }

  static defaultProps = {
    params: {
      formMode: 'create',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.formMode === 'create',
      isEditing: props.params.formMode === 'edit',
      isCopying: props.params.formMode === 'copy',
    }
  }

  componentDidMount() {
    const { params: { microserviceName } } = this.props

    this.props.fetchPluginMetaDataList(microserviceName)
    this.props.fetchPluginConfigurationList(microserviceName)
  }

  getBackUrl = () => {
    const { params: { project, microserviceName, pluginId } } = this.props
    return `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/list`
  }

  /**
   * Return React form component
   * @returns {XML}
   */
  getFormComponent = () => {
    const { params: { formMode }, currentPluginMetaData, pluginMetaDataList, currentPluginConfiguration, pluginConfigurationList, isPluginConfigurationFetching, isPluginMetaDataFetching, pluginConfiguration, pluginMetaData } = this.props
    const isEmpty = this.state.isEditing && typeof currentPluginConfiguration === 'undefined'
    return (
      <LoadableContentDisplayDecorator
        isLoading={isPluginConfigurationFetching || isPluginMetaDataFetching}
        isEmpty={isEmpty}
      >
        <PluginConfigurationFormComponent
          onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
          backUrl={this.getBackUrl()}
          currentPluginMetaData={currentPluginMetaData}
          pluginMetaDataList={pluginMetaDataList}
          currentPluginConfiguration={currentPluginConfiguration}
          pluginConfigurationList={pluginConfigurationList}
          formMode={formMode}
        />
      </LoadableContentDisplayDecorator>
    )
  }

  /**
   * Handle form submission when updating fragment
   * @param vals form updated values
   */
  handleUpdate = (vals) => {
    const { params: { microserviceName, pluginId, pluginConfigurationId } } = this.props

    Promise.resolve(this.props.updatePluginConfiguration(pluginConfigurationId, vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the actions
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  /**
   * Handle form submission when creating fragment
   *
   * @param vals form values
   */
  handleCreate = (vals) => {
    const { params: { microserviceName, pluginId } } = this.props

    Promise.resolve(this.props.createPluginConfiguration(vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('PluginConfigurationFormContainer::componentWillReceiveProps', nextProps, nextState)
  }

  render() {
    console.log('PluginConfigurationFormContainer::render')
    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  currentPluginMetaData: ownProps.params.pluginId ? PluginMetaDataSelectors.getById(state, ownProps.params.pluginId) : null,
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
  currentPluginConfiguration: ownProps.params.pluginConfigurationId ? PluginConfigurationSelectors.getById(state, ownProps.params.pluginConfigurationId) : null,
  pluginConfigurationList: PluginConfigurationSelectors.getListByPluginId(state, ownProps.params.pluginId),
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaDataList: microserviceName => dispatch(PluginMetaDataActions.fetchPagedEntityList(0, 100, {
    microserviceName,
  })),
  fetchPluginConfigurationList: microserviceName => dispatch(PluginConfigurationActions.fetchPagedEntityList(0, 100, {
    microserviceName,
  })),
  createPluginConfiguration: (vals, microserviceName, pluginId) => dispatch(PluginConfigurationActions.createEntity(vals, {
    microserviceName,
    pluginId,
  })),
  updatePluginConfiguration: (id, vals, microserviceName, pluginId) => dispatch(PluginConfigurationActions.updateEntity(id, vals, {
    microserviceName,
    pluginId,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationFormContainer)
