/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import isUndefined from 'lodash/isUndefined'
import { I18nProvider } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginConfigurationFormComponent from '../../components/plugin/PluginConfigurationFormComponent'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'
import PluginConfigurationSelectors from '../../model/plugin/PluginConfigurationSelectors'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import messages from '../../i18n'

/**
 * Container connecting the plugin configuration from to the redux store and handling user actions.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
      pluginId: PropTypes.string,
      pluginConfigurationId: PropTypes.string,
      formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    }),
    // from mapStateToProps
    currentPluginMetaData: CommonShapes.PluginMetaData,
    isPluginMetaDataFetching: PropTypes.bool,
    currentPluginConfiguration: CommonShapes.PluginConfiguration,
    isPluginConfigurationFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginConfiguration: PropTypes.func,
    createPluginConfiguration: PropTypes.func,
    updatePluginConfiguration: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
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
    const { params: { pluginId, pluginConfigurationId, microserviceName } } = this.props

    this.props.fetchPluginMetaDataList(microserviceName)
    if (pluginConfigurationId && pluginId) {
      this.props.fetchPluginConfiguration(pluginConfigurationId, pluginId, microserviceName)
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
    const { params: { formMode, microserviceName }, currentPluginMetaData, currentPluginConfiguration, isPluginConfigurationFetching, isPluginMetaDataFetching } = this.props
    const isEmpty = this.state.isEditing && isUndefined(currentPluginConfiguration)
    return (
      <LoadableContentDisplayDecorator
        isLoading={isPluginConfigurationFetching || isPluginMetaDataFetching}
        isEmpty={isEmpty}
      >
        <PluginConfigurationFormComponent
          onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
          backUrl={this.getBackUrl()}
          currentPluginMetaData={currentPluginMetaData}
          currentPluginConfiguration={currentPluginConfiguration}
          formMode={formMode}
          microserviceName={microserviceName}
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

    return Promise.resolve(this.props.updatePluginConfiguration(pluginConfigurationId, vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the actions
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
        return actionResult
      })
  }

  /**
   * Handle form submission when creating fragment
   *
   * @param vals form values
   */
  handleCreate = (vals) => {
    const { params: { microserviceName, pluginId } } = this.props

    return Promise.resolve(this.props.createPluginConfiguration(vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          return browserHistory.push(url)
        }
        return actionResult
      })
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  currentPluginMetaData: ownProps.params.pluginId ? PluginMetaDataSelectors.getById(state, ownProps.params.pluginId) : null,
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
  currentPluginConfiguration: ownProps.params.pluginConfigurationId ? PluginConfigurationSelectors.getById(state, ownProps.params.pluginConfigurationId) : null,
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaDataList: microserviceName => dispatch(PluginMetaDataActions.fetchEntityList({
    microserviceName,
  })),
  fetchPluginConfiguration: (pluginConfId, pluginId, microserviceName) => dispatch(PluginConfigurationActions.fetchEntity(pluginConfId, {
    microserviceName,
    pluginId,
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
