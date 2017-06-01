/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginConf as UIPluginConfiguration } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginProvider } from '@regardsoss/plugins'
import ServiceConfigurationFormComponent from '../components/ServiceConfigurationFormComponent'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'

/**
 * Show the plugin service configuration form
 *
 * @author Léo Mieulet
 */
export class ServiceConfigurationFormContainer extends React.Component {

  static mapStateToProps = (state, ownProps) => ({
    uiPluginConfiguration: ownProps.params.uiPluginConfId ? uiPluginConfigurationSelectors.getById(state, ownProps.params.uiPluginConfId) : null,
  })

  static mapDispatchToProps = dispatch => ({
    fetchUIPluginConfiguration: id => dispatch(uiPluginConfigurationActions.fetchEntity(id)),
    createUIPluginConfiguration: (entity, pathParams) => dispatch(uiPluginConfigurationActions.createEntity(entity, pathParams)),
    updateUIPluginConfiguration: (id, entity, pathParams) => dispatch(uiPluginConfigurationActions.updateEntity(id, entity, pathParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      uiPluginId: PropTypes.string,
      uiPluginConfId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    uiPluginConfiguration: PropTypes.shape({
      content: UIPluginConfiguration,
    }),
    // from mapDispatchToProps
    fetchUIPluginConfiguration: PropTypes.func,
    updateUIPluginConfiguration: PropTypes.func,
    createUIPluginConfiguration: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.uiPluginConfId === undefined

    this.state = {
      isCreating,
      isLoading: !isCreating,
      isEditing: props.params.uiPluginConfId !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.uiPluginConfId !== undefined && props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchUIPluginConfiguration(this.props.params.uiPluginConfId))
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project, uiPluginId } } = this.props
    return `/admin/${project}/ui/service/${uiPluginId}/list`
  }

  redirectToBackUrl = () => {
    browserHistory.push(this.getBackUrl())
  }

  handleUpdate = (values) => {
    const updatedPluginConfiguration = Object.assign({}, {
      id: this.props.uiPluginConfiguration.content.id,
      pluginId: this.props.uiPluginConfiguration.content.uiPluginId,
    }, {
      active: values.isActive,
      default: values.isDefault,
      conf: {
        label: values.label,
        static: values.static || {},
        dynamic: values.dynamic || {},
      },
    })
    Promise.resolve(this.props.updateUIPluginConfiguration(this.props.params.uiPluginConfId, updatedPluginConfiguration))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToBackUrl()
        }
      })
  }

  /**
   * Handle form submission on duplication / creation
   * Create a new service configuration
   * @param values
   */
  handleCreate = (values) => {
    const newPluginConfiguration = {
      pluginId: this.props.params.uiPluginId,
      active: values.isActive,
      default: values.isDefault,
      conf: {
        label: values.label,
        static: values.static || {},
        dynamic: values.dynamic || {},
      },
    }
    Promise.resolve(this.props.createUIPluginConfiguration(newPluginConfiguration, { plugin_id: this.props.params.uiPluginId }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToBackUrl()
        }
      })
  }

  render() {
    const { uiPluginConfiguration, params: { uiPluginId } } = this.props
    const { isCreating, isEditing, isDuplicating, isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-ui-service-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (
            <PluginProvider
              pluginId={uiPluginId}
              pluginInstanceId="something"
              displayPlugin={false}
            >
              <ServiceConfigurationFormComponent
                uiPluginConfiguration={uiPluginConfiguration}
                isCreating={isCreating}
                isEditing={isEditing}
                isDuplicating={isDuplicating}
                onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
                backUrl={this.getBackUrl()}
              />
            </PluginProvider>
          )}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(ServiceConfigurationFormContainer.mapStateToProps, ServiceConfigurationFormContainer.mapDispatchToProps)(ServiceConfigurationFormContainer)
