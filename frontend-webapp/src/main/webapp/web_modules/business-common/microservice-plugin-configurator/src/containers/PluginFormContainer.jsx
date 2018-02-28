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
    updatePluginConfiguration: (id, vals, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.updateEntity(id, vals, {
      microserviceName,
      pluginId,
    })),
  })

  static propTypes = {
    microserviceName: PropTypes.string,
    pluginId: PropTypes.string.isRequired,
    pluginConfigurationId: PropTypes.string,
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    title: PropTypes.string,
    cardStyle: PropTypes.bool,
    simpleGlobalParameterConf: PropTypes.bool,
    backUrl: PropTypes.string,
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
      currentPluginConfiguration: null,
      isPluginConfigurationFetching: !!props.pluginConfigurationId,
    }
  }

  componentDidMount() {
    const { pluginId, pluginConfigurationId, microserviceName } = this.props

    this.props.fetchPluginMetaData(microserviceName, pluginId).then((actionResults) => {
      this.setState({
        isPluginMetaDataFetching: false,
        currentPluginMetaData: get(actionResults, `payload.entities.pluginMetaData.${pluginId}`, null),
      })
    })
    if (pluginConfigurationId) {
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
      microserviceName, title, cardStyle, simpleGlobalParameterConf,
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
    return this.getFormComponent()
  }
}

export default connect(
  PluginFormContainer.mapStateToProps,
  PluginFormContainer.mapDispatchToProps,
)(PluginFormContainer)
