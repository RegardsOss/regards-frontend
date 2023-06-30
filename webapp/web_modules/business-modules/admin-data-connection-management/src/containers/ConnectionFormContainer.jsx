/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import find from 'lodash/find'
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { connectionActions, connectionSelectors } from '../clients/ConnectionClient'
import ConnectionFormComponent from '../components/ConnectionFormComponent'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetaDataClient'
import messages from '../i18n'

/**
 * List connection
 */
export class ConnectionFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      connectionId: PropTypes.string,
    }),
    // from mapStateToProps
    currentConnection: DataManagementShapes.Connection,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    // from mapDispatchToProps
    fetchConnection: PropTypes.func,
    createConnection: PropTypes.func,
    updateConnection: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
  }

  static PLUGIN_ATTRS = ['user', 'password', 'dbHost', 'dbPort', 'dbName']

  /**
   * Generates parameter values to publish on server
   * @param {*} values form values
   * @param {*} correspondingPluginMeta matching PluginMetaData shape
   * @return {[*]} list of parameters (matching PluginParameterType)
   */
  static toParameters = (editedValues, correspondingPluginMeta) => map(ConnectionFormContainer.PLUGIN_ATTRS, (attr) => ({
    name: attr,
    type: correspondingPluginMeta.content.parameters.find((p) => p.name === attr).type,
    value: editedValues[attr],
    dynamic: false,
    dynamicsValues: [],
  }))

  /**
   * Converts edited form values into corresponding plugin configuration DTO
   * @param {*} editedValues edited form values
   * @param {*} pluginMetaDataList known plugin metadata
   * @param {*} businessId configuration ID (keep null / undefined for a new connection)
   * @return {*} converted configuration, matching expected server object shape
   */
  static toConnectionPlugin(editedValues, pluginMetaDataList, businessId = null) {
    // retrieve the selected plugin data (necessary found, as it is mandatory and comes from server list)
    const correspondingPluginMeta = find(pluginMetaDataList,
      ({ content: { pluginId } }) => editedValues.pluginId === pluginId)
    return {
      businessId,
      pluginId: editedValues.pluginId,
      label: editedValues.label,
      parameters: ConnectionFormContainer.toParameters(editedValues, correspondingPluginMeta),
    }
  }

  state = {
    isCreating: this.props.params.connectionId === undefined,
    isEditing: this.props.params.connectionId !== undefined,
    isLoading: true,
  }

  componentDidMount() {
    const tasks = []
    tasks.push(this.props.fetchPluginMetaDataList())
    if (this.state.isEditing) {
      tasks.push(this.props.fetchConnection(this.props.params.connectionId))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/connection/list`
  }

  handleCreate = (values) => {
    const { pluginMetaDataList } = this.props
    Promise.resolve(this.props.createConnection(ConnectionFormContainer.toConnectionPlugin(values, pluginMetaDataList)))
      .then((actionResult) => {
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleUpdate = (values) => {
    const { pluginMetaDataList, params: { connectionId }, currentConnection } = this.props
    Promise.resolve(this.props.updateConnection(connectionId,
      ConnectionFormContainer.toConnectionPlugin(values, pluginMetaDataList, currentConnection.content.businessId)))
      .then((actionResult) => {
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  renderSubForm = () => (<ConnectionFormComponent
    onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
    currentConnection={this.props.currentConnection}
    pluginMetaDataList={this.props.pluginMetaDataList}
    backUrl={this.getBackUrl()}
    isEditing={this.state.isEditing}
    isCreating={this.state.isCreating}
  />)

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentConnection: ownProps.params.connectionId ? connectionSelectors.getById(state, ownProps.params.connectionId) : null,
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchConnection: (id) => dispatch(connectionActions.fetchEntity(id)),
  createConnection: (values) => dispatch(connectionActions.createEntity(values)),
  updateConnection: (id, values) => dispatch(connectionActions.updateEntity(id, values)),
  fetchPluginMetaDataList: () => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginType: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IDBConnectionPlugin',
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionFormContainer)
