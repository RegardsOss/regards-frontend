/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginConfigurationFormComponent from '../components/PluginConfigurationFormComponent'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'
import PluginMetaDataSelectors from '../model/PluginMetaDataSelectors'
import PluginMetaDataActions from '../model/PluginMetaDataActions'

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
    pluginConfiguration: PluginConfiguration,
    pluginMetaData: PluginMetaData,
    isPluginConfigurationFetching: React.PropTypes.bool,
    isPluginMetaDataFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createPluginConfiguration: React.PropTypes.func,
    fetchPluginConfiguration: React.PropTypes.func,
    updatePluginConfiguration: React.PropTypes.func,
    fetchPluginMetaData: React.PropTypes.func,
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
    const { params: { microserviceName, pluginId } } = this.props

    if (this.state.isEditing || this.state.isCopying) {
      this.props.fetchPluginConfiguration(this.props.params.pluginConfigurationId, microserviceName, pluginId)
    }

    if (this.props.params.pluginId) {
      this.props.fetchPluginMetaData(this.props.params.pluginId, this.props.params.microserviceName)
    }
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
    const { params: { formMode }, isPluginConfigurationFetching, isPluginMetaDataFetching, pluginConfiguration, pluginMetaData } = this.props
    const isEmpty = this.state.isEditing && typeof pluginConfiguration === 'undefined'
    return (
      <LoadableContentDisplayDecorator
        isLoading={isPluginConfigurationFetching || isPluginMetaDataFetching}
        isEmpty={isEmpty}
      >
        <PluginConfigurationFormComponent
          onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
          backUrl={this.getBackUrl()}
          pluginConfiguration={pluginConfiguration}
          pluginMetaData={pluginMetaData}
          formMode={formMode}
        />
      </LoadableContentDisplayDecorator>
    )
  }

  /**
   * Handle form submission when updating fragment
   * @param values form updated values
   */
  handleUpdate = (values) => {
    const { params: { microserviceName, pluginId } } = this.props
    const previousPluginConfiguration = this.props.pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      id: values.id,
      label: values.label,
      version: values.version,
      priorityOrder: parseInt(values.priorityOrder, 10),
      active: values.active,
      pluginClassName: values.pluginClassName,
      pluginId: values.pluginId,
    })

    Promise.resolve(this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  /**
   * Handle form submission when creating fragment
   *
   * @param values form values
   */
  handleCreate = (values) => {
    const { params: { microserviceName, pluginId } } = this.props
    const newPluginConfiguration = {
      label: values.label,
      version: values.version,
      priorityOrder: parseInt(values.priorityOrder, 10),
      active: values.active,
      pluginClassName: values.pluginClassName,
      pluginId: values.pluginId,
    }

    Promise.resolve(this.props.createPluginConfiguration(newPluginConfiguration, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  pluginConfiguration: ownProps.params.pluginConfigurationId ? PluginConfigurationSelectors.getById(state, ownProps.params.pluginConfigurationId) : null,
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
  pluginMetaData: ownProps.params.pluginId ? PluginMetaDataSelectors.getById(state, ownProps.params.pluginId) : null,
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createPluginConfiguration: (values, microserviceName, pluginId) => dispatch(PluginConfigurationActions.createEntity(values, [microserviceName, pluginId])),
  updatePluginConfiguration: (id, values, microserviceName, pluginId) => dispatch(PluginConfigurationActions.updateEntity(id, values, [microserviceName, pluginId])),
  fetchPluginConfiguration: (id, microserviceName, pluginId) => dispatch(PluginConfigurationActions.fetchEntity(id, [microserviceName, pluginId])),
  fetchPluginMetaData: (id, microserviceName) => dispatch(PluginMetaDataActions.fetchEntity(id, [microserviceName])),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationFormContainer)
