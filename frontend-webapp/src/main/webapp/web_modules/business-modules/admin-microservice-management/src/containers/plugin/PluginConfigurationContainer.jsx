/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PluginConfigurationComponent from '../../components/plugin/PluginConfigurationComponent'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'

/**
 * Container connecting a {@link PluginConfigurationComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationContainer extends React.Component {

  static propTypes = {
    // from parent or router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      microserviceName: PropTypes.string.isRequired,
      pluginId: PropTypes.string.isRequired,
    }),
    pluginConfiguration: PluginConfiguration,
    pluginMetaData: PluginMetaData,
    // from mapStateToProps
    // from mapDispatchToProps
    updatePluginConfiguration: PropTypes.func,
    deletePluginConfiguration: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    deleteDialogOpen: false,
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: false,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpen: true,
    })
  }

  handleActiveToggle = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props

    const previousPluginConfiguration = pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      active: !previousPluginConfiguration.active,
    })
    Promise.resolve(this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          console.log('toggle active successfull!')
        }
      })
  }

  handleCopy = () => {
    const { params: { project, microserviceName, pluginId }, pluginConfiguration } = this.props
    const pluginConfigurationId = pluginConfiguration.content.id
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/${pluginConfigurationId}/copy`
    browserHistory.push(url)
  }

  handleDeleteClick = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props
    Promise.resolve(this.props.deletePluginConfiguration(pluginConfiguration.content.id, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          console.log('delete sucessful')
        }
      })
  }

  handleEdit = () => {
    const { params: { project, microserviceName, pluginId }, pluginConfiguration } = this.props
    const pluginConfigurationId = pluginConfiguration.content.id
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/${pluginConfigurationId}/edit`
    browserHistory.push(url)
  }

  handleDownwardClick = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props
    const previousPluginConfiguration = pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      priorityOrder: previousPluginConfiguration.priorityOrder - 1,
    })

    Promise.resolve(this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          console.log('decrease priority successfull')
        }
      })
  }

  handleUpwardClick = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props
    const previousPluginConfiguration = pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      priorityOrder: previousPluginConfiguration.priorityOrder + 1,
    })

    Promise.resolve(this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          console.log('decrease priority successfull')
        }
      })
  }

  render() {
    const { pluginConfiguration, pluginMetaData, params: { microserviceName } } = this.props
    const deleteTitle = this.context.intl.formatMessage(
      { id: 'microservice-management.plugin.configuration.delete.confirmation.title' }, { name: pluginConfiguration ? pluginConfiguration.content.label : '' })
    const deleteDialogActions = [
      <FlatButton
        label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete.cancel' })}
        primary
        onTouchTap={this.closeDeleteDialog}
      />,
      <FlatButton
        label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete' })}
        primary
        keyboardFocused
        onTouchTap={this.handleDeleteClick}
      />,
    ]
    return (
      <div>
        <PluginConfigurationComponent
          microserviceName={microserviceName}
          pluginConfiguration={pluginConfiguration}
          pluginMetaData={pluginMetaData}
          onActiveToggle={this.handleActiveToggle}
          onCopyClick={this.handleCopy}
          onDeleteClick={this.openDeleteDialog}
          onDownwardClick={this.handleDownwardClick}
          onEditClick={this.handleEdit}
          onUpwardClick={this.handleUpwardClick}
        />
        <Dialog
          title={deleteTitle}
          actions={deleteDialogActions}
          modal={false}
          open={this.state.deleteDialogOpen}
          onRequestClose={this.closeDeleteDialog}
        >
          <FormattedMessage id="microservice-management.plugin.configuration.delete.confirmation.text" />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = dispatch => ({
  updatePluginConfiguration: (id, values, microserviceName, pluginId) => dispatch(PluginConfigurationActions.updateEntity(id, values, { microserviceName, pluginId })),
  deletePluginConfiguration: (pluginConfigurationId, microserviceName, pluginId) => dispatch(PluginConfigurationActions.deleteEntity(pluginConfigurationId, { microserviceName, pluginId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationContainer)
