/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { PluginConfiguration } from '@regardsoss/model'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PluginConfigurationComponent from '../components/PluginConfigurationComponent'
import PluginConfigurationActions from '../model/PluginConfigurationActions'

/**
 * Container connecting a {@link PluginConfigurationComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationContainer extends React.Component {

  static propTypes = {
    // from parent or router
    params: React.PropTypes.shape({
      project: React.PropTypes.string.isRequired,
      microserviceName: React.PropTypes.string.isRequired,
      pluginId: React.PropTypes.string.isRequired,
    }),
    // from mapStateToProps
    pluginConfiguration: PluginConfiguration,
    // from mapDispatchToProps
    updatePluginConfiguration: React.PropTypes.func,
    deletePluginConfiguration: React.PropTypes.func,
  }

  state = {
    deleteDialogOpen: false,
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
    const { pluginConfiguration } = this.props
    const deleteDialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.setState({ deleteDialogOpen: false })}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleDeleteClick}
      />,
    ]
    return (
      <div>
        <PluginConfigurationComponent
          pluginConfiguration={pluginConfiguration}
          onActiveToggle={this.handleActiveToggle}
          onCopyClick={this.handleCopy}
          onDeleteClick={this.handleDeleteClick}
          onDownwardClick={this.handleDownwardClick}
          onEditClick={this.handleEdit}
          onUpwardClick={this.handleUpwardClick}
        />
        <Dialog
          title="Dialog With Actions"
          actions={deleteDialogActions}
          modal={false}
          open={this.state.deleteDialogOpen}
          onRequestClose={() => this.setState({ deleteDialogOpen: false })}
        >
          The actions in this window were passed in as an array of React objects.
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
