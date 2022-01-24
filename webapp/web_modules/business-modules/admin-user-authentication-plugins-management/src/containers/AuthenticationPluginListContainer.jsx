/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonShapes } from '@regardsoss/shape'
import { AuthenticationDomain } from '@regardsoss/domain'
import { pluginConfigurationActions, pluginConfigurationByPluginIdActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import { serviceProviderActions, serviceProviderSelectors } from '../clients/ServiceProviderClient'
import AuthenticationPluginListComponent from '../components/AuthenticationPluginListComponent'

const MICROSERVICE = STATIC_CONF.MSERVICES.AUTHENTICATION
const PLUGIN_TYPE = AuthenticationDomain.PluginTypeEnum.AUTHENTICATION
/**
* Container to handle authentication plugin configurations
* @author Sébastien Binda
*/
export class AuthenticationPluginListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    return {
      entities: pluginConfigurationSelectors.getOrderedList(state),
      isLoading: pluginConfigurationSelectors.isFetching(state),
      totalServiceProviderCount: serviceProviderSelectors.getResultsCount(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, props) {
    return {
      fetch: () => dispatch(pluginConfigurationActions.getPluginConfigurationsByType(MICROSERVICE, PLUGIN_TYPE)),
      delete: (conf) => dispatch(pluginConfigurationByPluginIdActions.deleteEntity(conf.businessId, { microserviceName: MICROSERVICE, pluginId: conf.pluginId })),
      deleteServiceProvider: (conf) => dispatch(serviceProviderActions.deleteEntity(conf.name)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }),
    // from mapStateToProps
    entities: CommonShapes.PluginConfigurationArray,
    isLoading: PropTypes.bool.isRequired,
    totalServiceProviderCount: PropTypes.number.isRequired,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    deleteServiceProvider: PropTypes.func.isRequired,
  }

  UNSAFE_componentWillMount() {
    this.props.fetch()
  }

  onEdit = (confToEdit, pluginType) => {
    const { params: { project } } = this.props
    switch (pluginType) {
      case AuthenticationDomain.PluginTypeEnum.AUTHENTICATION:
        browserHistory.push(`/admin/${project}/user/authenticationplugins/${confToEdit.businessId}/edit`)
        break
      case AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER:
        browserHistory.push(`/admin/${project}/user/authenticationplugins/serviceprovider/${confToEdit.name}/edit`)
        break
      default:
    }
  }

  onDelete = (conf, pluginType) => {
    if (pluginType === AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER) {
      this.props.deleteServiceProvider(conf)
    } else {
      this.props.delete(conf)
    }
  }

  goToCreateForm = (pluginType) => {
    const { params: { project } } = this.props
    switch (pluginType) {
      case AuthenticationDomain.PluginTypeEnum.AUTHENTICATION:
        browserHistory.push(`/admin/${project}/user/authenticationplugins/create`)
        break
      case AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER:
        browserHistory.push(`/admin/${project}/user/authenticationplugins/serviceprovider/create`)
        break
      default:
    }
  }

  goToBoard = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/board`)
  }

  render() {
    return (
      <AuthenticationPluginListComponent
        onBack={this.goToBoard}
        onAddNewConf={this.goToCreateForm}
        onEdit={this.onEdit}
        onDuplicate={this.onDuplicate}
        onDelete={this.onDelete}
        onRefresh={this.props.fetch}
        entities={this.props.entities}
        isLoading={this.props.isLoading}
        serviceProviderCount={this.props.totalServiceProviderCount}
      />
    )
  }
}
export default connect(
  AuthenticationPluginListContainer.mapStateToProps,
  AuthenticationPluginListContainer.mapDispatchToProps)(AuthenticationPluginListContainer)
