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
import get from 'lodash/get'
import omit from 'lodash/omit'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { CatalogClient } from '@regardsoss/client'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { connect } from '@regardsoss/redux'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AccessShapes } from '@regardsoss/shape'
import { TargetHelper } from '@regardsoss/entities-common'
import { StringComparison } from '@regardsoss/form-utils'
import isEqual from 'lodash/isEqual'
import { getRunServiceClient } from '../../../../../../clients/RunPluginServiceClient'
import OneElementServicesComponent from '../../../../../../components/user/tabs/results/common/options/OneElementServicesComponent'

// Determinate the required resource name to apply catalog plugins
const tempActions = new CatalogClient.CatalogPluginServiceResultActions('entities-common/apply-catalog-service')
const catalogServiceDependency = tempActions.getDependency(RequestVerbEnum.POST)

/**
* One element services option container
* @author Raphaël Mechali
*/
export class OneElementServicesContainer extends React.Component {
  static propTypes = {
    // tab type
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired, // used in mapStateToProps and mapDispatchToProps
    // from table cell API
    rowIndex: PropTypes.number,
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // The full list of dependencies
    // from mapDispatchToProps
    dispatchRunService: PropTypes.func.isRequired,
  }

  static defaultProps = {
    availableDependencies: [],
  }

  /** Properties that will not be reported to sub component */
  static NON_REPORTED_PROPS = ['tabType', 'entity', 'rowIndex', 'dispatchRunService', 'availableDependencies']

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { tabType }) {
    const { runServiceActions } = getRunServiceClient(tabType)
    return {
      dispatchRunService: (service, serviceTarget) => dispatch(runServiceActions.runService(service, serviceTarget)),
    }
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // logged user state related
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  /**
   * Is usable selection service in context?
   * @param service service as PluginService (wrapped in 'content:')
   * @param currentEntityType current entity type
   * @param availableDependencies available dependencies for current user
   */
  static isUsableService({ content: { applicationModes, entityTypes, type } }, currentEntityType, availableDependencies = []) {
    return applicationModes.includes(AccessDomain.applicationModes.ONE)
      && entityTypes.includes(currentEntityType)
      // For catalog service only: the user must be allowed to run catalog plugin service
      && (type !== AccessDomain.pluginTypes.CATALOG || availableDependencies.includes(catalogServiceDependency))
  }

  state = {
    services: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // detect entity change to update the available services (the service that can be applied to one entity)
    const { entity, availableDependencies } = newProps
    if (!isEqual(oldProps.entity, entity)
      || !isEqual(oldProps.availableDependencies, availableDependencies)) {
      const newServices = get(entity.content, 'services', [])
        .reduce((services, service) => OneElementServicesContainer.isUsableService(service, entity.content.entityType, availableDependencies)
        && !services.find(({ content: { type, configId } }) => type === service.content.type && configId === service.content.configId)
          ? [...services, service]
          : services, [])
        .sort((s1, s2) => StringComparison.compare(s1.content.label, s2.content.label))
      if (!isEqual(this.state.services, newServices)) {
        this.setState({
          services: newServices,
        })
      }
    }
  }

  /**
   * Callback: on service started by user. Dispatches run service event
   * @param service service wrapped in content
   */
  onServiceStarted = ({ content: service }) => {
    const { entity, dispatchRunService } = this.props
    dispatchRunService({
      serviceConfiguration: service,
      target: TargetHelper.buildOneElementTarget(entity),
    })
  }

  render() {
    const subComponentProperties = omit(this.props, OneElementServicesContainer.NON_REPORTED_PROPS)
    const { services } = this.state
    return (
      <OneElementServicesComponent
        services={services}
        onServiceStarted={this.onServiceStarted}
        {...subComponentProperties}
      />
    )
  }
}
export default connect(OneElementServicesContainer.mapStateToProps, OneElementServicesContainer.mapDispatchToProps)(OneElementServicesContainer)
