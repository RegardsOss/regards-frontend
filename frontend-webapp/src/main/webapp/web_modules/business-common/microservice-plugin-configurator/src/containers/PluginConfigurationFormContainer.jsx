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
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import isUndefined from 'lodash/isUndefined'
import { I18nProvider } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginConfigurationFormComponent from '../components/PluginConfigurationFormComponent'
import {pluginConfigurationActions, pluginConfigurationSelectorBuilder} from '../clients/PluginConfigurationClient'
import {pluginMetadataActions, pluginMetadataSelectorBuilder} from '../clients/PluginMetadataClient'
import messages from '../i18n'

/**
 * Container connecting the plugin configuration from to the redux store and handling user actions.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormContainer extends React.Component {

  static propTypes = {
    microserviceName: PropTypes.string,
    pluginId: PropTypes.string,
    pluginConfigurationId: PropTypes.string,
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    backUrl: PropTypes.string,
    storePath : PropTypes.array.isRequired,
    displayTitle: PropTypes.bool,
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
      formMode: 'create',
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.formMode === 'create',
      isEditing: props.formMode === 'edit',
      isCopying: props.formMode === 'copy',
    }
  }

  componentDidMount() {
    const {  pluginId, pluginConfigurationId, microserviceName } = this.props

    this.props.fetchPluginMetaDataList(microserviceName)
    if (pluginConfigurationId && pluginId) {
      this.props.fetchPluginConfiguration(pluginConfigurationId, pluginId, microserviceName)
    }
  }

  /**
   * Return React form component
   * @returns {XML}
   */
  getFormComponent = () => {
    const { displayTitle, formMode, microserviceName , currentPluginMetaData, currentPluginConfiguration, isPluginConfigurationFetching, isPluginMetaDataFetching } = this.props
    const isEmpty = this.state.isEditing && isUndefined(currentPluginConfiguration)
    return (
      <LoadableContentDisplayDecorator
        isLoading={isPluginConfigurationFetching || isPluginMetaDataFetching || get(currentPluginMetaData,'content',null) === null}
        isEmpty={isEmpty}
      >
        <PluginConfigurationFormComponent
          onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
          backUrl={this.props.backUrl}
          pluginMetaData={get(currentPluginMetaData,'content',null)}
          pluginConfiguration={get(currentPluginConfiguration,'content',null)}
          formMode={formMode}
          microserviceName={microserviceName}
          displayTitle={displayTitle}
        />
      </LoadableContentDisplayDecorator>
    )
  }

  /**
   * Handle form submission when updating fragment
   * @param vals form updated values
   */
  handleUpdate = (vals) => {
    const { microserviceName, pluginId, pluginConfigurationId } = this.props

    return Promise.resolve(this.props.updatePluginConfiguration(pluginConfigurationId, vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the actions
        if (!actionResult.error) {
          browserHistory.push(this.props.backUrl)
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
    const { microserviceName, pluginId } = this.props

    return Promise.resolve(this.props.createPluginConfiguration(vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          return browserHistory.push(this.props.backUrl)
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
  currentPluginMetaData: ownProps.pluginId ? pluginMetadataSelectorBuilder(ownProps.storePath).getById(state, ownProps.pluginId) : null,
  isPluginMetaDataFetching: pluginMetadataSelectorBuilder(ownProps.storePath).isFetching(state),
  currentPluginConfiguration: ownProps.pluginConfigurationId ? pluginConfigurationSelectorBuilder(ownProps.storePath).getById(state, ownProps.pluginConfigurationId) : null,
  isPluginConfigurationFetching: pluginConfigurationSelectorBuilder(ownProps.storePath).isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaDataList: microserviceName => dispatch(pluginMetadataActions.fetchEntityList({
    microserviceName,
  })),
  fetchPluginConfiguration: (pluginConfId, pluginId, microserviceName) => dispatch(pluginConfigurationActions.fetchEntity(pluginConfId, {
    microserviceName,
    pluginId,
  })),
  createPluginConfiguration: (vals, microserviceName, pluginId) => dispatch(pluginConfigurationActions.createEntity(vals, {
    microserviceName,
    pluginId,
  })),
  updatePluginConfiguration: (id, vals, microserviceName, pluginId) => dispatch(pluginConfigurationActions.updateEntity(id, vals, {
    microserviceName,
    pluginId,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationFormContainer)
