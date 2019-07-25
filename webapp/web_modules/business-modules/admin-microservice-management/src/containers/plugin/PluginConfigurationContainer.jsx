/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PluginConfigurationComponent from '../../components/plugin/PluginConfigurationComponent'
import { pluginConfigurationByPluginIdActions } from '../../clients/PluginConfigurationClient'

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
    pluginConfiguration: CommonShapes.PluginConfiguration,
    pluginMetaData: CommonShapes.PluginMetaData,
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
    this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId)
  }

  handleCopy = () => {
    const { params: { project, microserviceName, pluginId }, pluginConfiguration } = this.props
    const pluginConfigurationId = pluginConfiguration.content.id
    let url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/${pluginConfigurationId}/copy`
    const { query } = browserHistory.getCurrentLocation()
    if (query.backUrl && query.backUrl !== '') {
      url = `${url}?backUrl=${query.backUrl}`
    }
    browserHistory.push(url)
  }

  handleDeleteClick = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props
    this.props.deletePluginConfiguration(pluginConfiguration.content.id, microserviceName, pluginId)
  }

  handleEdit = () => {
    const { params: { project, microserviceName, pluginId }, pluginConfiguration } = this.props
    const pluginConfigurationId = pluginConfiguration.content.id
    let url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/${pluginConfigurationId}/edit`
    const { query } = browserHistory.getCurrentLocation()
    if (query.backUrl && query.backUrl !== '') {
      url = `${url}?backUrl=${query.backUrl}`
    }
    browserHistory.push(url)
  }

  handleDownwardClick = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props
    const previousPluginConfiguration = pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      priorityOrder: previousPluginConfiguration.priorityOrder - 1,
    })

    this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId)
  }

  handleUpwardClick = () => {
    const { params: { microserviceName, pluginId }, pluginConfiguration } = this.props
    const previousPluginConfiguration = pluginConfiguration.content
    const updatedPluginConfiguration = Object.assign({}, previousPluginConfiguration, {
      priorityOrder: previousPluginConfiguration.priorityOrder + 1,
    })
    this.props.updatePluginConfiguration(previousPluginConfiguration.id, updatedPluginConfiguration, microserviceName, pluginId)
  }

  render() {
    const { pluginConfiguration, pluginMetaData, params: { microserviceName } } = this.props
    const deleteTitle = this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete.confirmation.title' }, { name: pluginConfiguration ? pluginConfiguration.content.label : '' })
    const deleteDialogActions = [
      <FlatButton
        key="cancel"
        label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete.cancel' })}
        primary
        onClick={this.closeDeleteDialog}
      />,
      <FlatButton
        key="delete"
        label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete' })}
        primary
        keyboardFocused
        onClick={this.handleDeleteClick}
      />,
    ]
    return (
      <div>
        <PluginConfigurationComponent
          microserviceName={microserviceName}
          pluginConfiguration={pluginConfiguration}
          pluginMetaData={pluginMetaData}
          pluginId={pluginMetaData.pluginId}
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
  updatePluginConfiguration: (id, values, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.updateEntity(id, values, { microserviceName, pluginId })),
  deletePluginConfiguration: (pluginConfigurationId, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.deleteEntity(pluginConfigurationId, { microserviceName, pluginId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationContainer)
