/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isUndefined from 'lodash/isUndefined'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginFormComponent from '../components/PluginFormComponent'
import { pluginConfigurationByPluginIdActions } from '../clients/PluginConfigurationClient'
import { pluginMetadataActions } from '../clients/PluginMetadataClient'

/**
 * Container to connect with server informations to display a PluginConfigurationForm
 * @author Sébastien Binda
 * @author Xavier-Alexandre Brochard
 */
export class PluginFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state, ownProps) => ({
  })

  /**
  * Redux: map dispatch to props function
  * @param {*} dispatch: redux dispatch function
  * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapDispatchToProps = dispatch => ({
    fetchPluginMetaData: (microserviceName, pluginId) => dispatch(pluginMetadataActions.fetchEntity(pluginId, {
      microserviceName,
    })),
    fetchPluginConfiguration: (pluginConfId, pluginId, microserviceName) => dispatch(pluginConfigurationByPluginIdActions.fetchEntity(pluginConfId, {
      microserviceName,
      pluginId,
    })),
    createPluginConfiguration: (vals, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.createEntity(vals, {
      microserviceName,
      pluginId,
    })),
    updatePluginConfiguration: (vals, microserviceName, pluginId, pluginConfId) => dispatch(pluginConfigurationByPluginIdActions.updateEntity(pluginConfId, vals, {
      microserviceName,
      pluginId,
    })),
  })

  static propTypes = {
    microserviceName: PropTypes.string, // Microservice of the plugin to confiure
    pluginId: PropTypes.string.isRequired, // Identifier of the plugin implementation
    pluginConfigurationId: PropTypes.number, // Identifier of the plugin configuration
    pluginConfiguration: CommonShapes.PluginConfiguration, // Plugin configuration to edit or copy
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']), // Form mode
    title: PropTypes.string, // Form title to display
    cardStyle: PropTypes.bool, // default true, set to false to disable the Card container around the rendered form
    simpleGlobalParameterConf: PropTypes.bool, // Set to true to hide all standard plugin parameter conf except for label
    hideDynamicParameterConf: PropTypes.bool, // Set to true to hide dynamic configuration of each plugin parameter
    backUrl: PropTypes.string, // Url after form submission success or cancel
    // Function to overidde default plugin conf update endpoint
    // Parameters (pluginConf, microservice, pluginId, pluginConfId)
    // Return a Promise
    onUpdatePluginConfiguration: PropTypes.func,
    // Function to overidde default plugin conf create endpoint
    // Parameters (pluginConf, microservice, pluginId)
    // Return a Promise
    onCreatePluginConfiguration: PropTypes.func,
    // from mapDispatchToProps
    fetchPluginConfiguration: PropTypes.func,
    createPluginConfiguration: PropTypes.func,
    updatePluginConfiguration: PropTypes.func,
    fetchPluginMetaData: PropTypes.func,
  }

  static defaultProps = {
    formMode: 'create',
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.formMode === 'edit',
      currentPluginMetaData: null,
      isPluginMetaDataFetching: true,
      currentPluginConfiguration: props.pluginConfiguration,
      isPluginConfigurationFetching: !props.pluginConfiguration && !!props.pluginConfigurationId,
    }
  }

  componentDidMount() {
    const {
      pluginId, pluginConfigurationId, pluginConfiguration, microserviceName,
    } = this.props

    this.props.fetchPluginMetaData(microserviceName, pluginId).then((actionResults) => {
      this.setState({
        isPluginMetaDataFetching: false,
        currentPluginMetaData: get(actionResults, `payload.entities.pluginMetaData.${pluginId}`, null),
      })
    })
    if (!pluginConfiguration && pluginConfigurationId) {
      this.props.fetchPluginConfiguration(pluginConfigurationId, pluginId, microserviceName).then((actionResults) => {
        this.setState({
          isPluginConfigurationFetching: false,
          currentPluginConfiguration: get(actionResults, `payload.entities.pluginConfiguration.${pluginConfigurationId}`, null),
        })
      })
    }
  }

  /**
   * Return React form component
   * @returns {XML}
   */
  getFormComponent = () => {
    const {
      microserviceName, title, cardStyle, simpleGlobalParameterConf, hideDynamicParameterConf,
    } = this.props
    const {
      currentPluginMetaData, currentPluginConfiguration, isPluginConfigurationFetching,
      isPluginMetaDataFetching,
    } = this.state

    const isEmpty = this.state.isEditing && isUndefined(currentPluginConfiguration)
    return (
      <LoadableContentDisplayDecorator
        isLoading={isPluginConfigurationFetching || isPluginMetaDataFetching || get(currentPluginMetaData, 'content', null) === null}
        isEmpty={isEmpty}
      >
        <PluginFormComponent
          onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
          backUrl={this.props.backUrl}
          pluginMetaData={get(currentPluginMetaData, 'content', null)}
          pluginConfiguration={get(currentPluginConfiguration, 'content', null)}
          isEditing={this.state.isEditing}
          microserviceName={microserviceName}
          title={title}
          cardStyle={cardStyle}
          simpleGlobalParameterConf={simpleGlobalParameterConf}
          hideDynamicParameterConf={hideDynamicParameterConf}
        />
      </LoadableContentDisplayDecorator>
    )
  }

  /**
   * Handle form submission when updating fragment
   * Uses update function props.onUpdatePluginConfiguration or props.updatePluginConfiguration if not defined
   * @param vals form updated values
   */
  handleUpdate = (vals) => {
    const {
      backUrl, microserviceName, onUpdatePluginConfiguration, updatePluginConfiguration,
    } = this.props
    const { currentPluginConfiguration } = this.state
    const pluginConfId = get(currentPluginConfiguration, 'content.id', null)
    const pluginId = get(currentPluginConfiguration, 'content.pluginId', null)
    let updateFunction
    if (onUpdatePluginConfiguration) {
      updateFunction = onUpdatePluginConfiguration
    } else {
      updateFunction = updatePluginConfiguration
    }
    return Promise.resolve(updateFunction(vals, microserviceName, pluginId, pluginConfId))
      .then((actionResult) => {
        // We receive here the actions
        if (!actionResult.error) {
          browserHistory.push(backUrl)
        }
        return actionResult
      })
  }

  /**
   * Handle form submission when creating fragment
   * Uses create function props.onCreatePluginConfiguration or props.createPluginConfiguration if not defined
   * @param vals form values
   */
  handleCreate = (vals) => {
    const {
      microserviceName, pluginId, onCreatePluginConfiguration, createPluginConfiguration,
      backUrl,
    } = this.props
    let createFunction
    if (onCreatePluginConfiguration) {
      createFunction = onCreatePluginConfiguration
    } else {
      createFunction = createPluginConfiguration
    }
    return Promise.resolve(createFunction(vals, microserviceName, pluginId))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          return browserHistory.push(backUrl)
        }
        return actionResult
      })
  }

  render() {
    return this.getFormComponent()
  }
}

export default connect(
  PluginFormContainer.mapStateToProps,
  PluginFormContainer.mapDispatchToProps,
)(PluginFormContainer)
