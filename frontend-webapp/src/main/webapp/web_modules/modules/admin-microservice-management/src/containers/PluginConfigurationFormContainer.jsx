/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { PluginConfiguration } from '@regardsoss/model'
import PluginConfigurationFormComponent from '../components/PluginConfigurationFormComponent'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'

export class PluginConfigurationFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microservice: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
    }),
    // from mapStateToProps
    pluginConfiguration: PluginConfiguration,
    isPluginConfigurationFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createPluginConfiguration: React.PropTypes.func,
    fetchPluginConfiguration: React.PropTypes.func,
    updatePluginConfiguration: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.pluginConfigurationId !== undefined,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchPluginConfiguration(this.props.params.pluginConfigurationId)
    }
  }

  getBackUrl = () => {
    const { params: { project, microservice, pluginId } } = this.props
    return `/admin/${project}/microservice/${microservice}/plugin/${pluginId}/plugin-configuration/list` // TODO
  }

  /**
   * Return React form component
   * @returns {XML}
   */
  getFormComponent = () => {
    if (this.state.isEditing) {
      const { isPluginConfigurationFetching, pluginConfiguration } = this.props
      if (isPluginConfigurationFetching) {
        return (<FormLoadingComponent />)
      }
      if (pluginConfiguration) {
        return (<PluginConfigurationFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          pluginConfiguration={pluginConfiguration}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<PluginConfigurationFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }

  /**
   * Handle form submission when updating fragment
   * @param values form updated values
   */
  handleUpdate = (values) => {
    const previousPluginConfiguration = this.props.pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      description: values.description,
    })
    Promise.resolve(this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration))
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
    const newPluginConfiguration = {
      label: values.label,
      version: values.version,
      priorityOrder: values.priorityOrder,
      active: values.active,
      pluginClassName: values.pluginClassName,
    }
    Promise.resolve(this.props.createPluginConfiguration(newPluginConfiguration))
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
})

const mapDispatchToProps = dispatch => ({
  createPluginConfiguration: values => dispatch(PluginConfigurationActions.createEntity(values, dispatch)),
  updatePluginConfiguration: (id, values) => dispatch(PluginConfigurationActions.updateEntity(id, values, dispatch)),
  fetchPluginConfiguration: id => dispatch(PluginConfigurationActions.fetchEntity(id, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationFormContainer)
