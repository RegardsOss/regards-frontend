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
 **/
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes } from '@regardsoss/components'
import { CatalogClient } from '@regardsoss/client'
import { AccessDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { ServiceContainer, PluginServiceRunModel, TargetHelper } from '@regardsoss/entities-common'
import { AccessShapes, CommonShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { HOCUtils } from '@regardsoss/display-control'
import { getSearchCatalogClient } from '../../../../clients/SearchEntitiesClient'
import { getSelectionClient } from '../../../../clients/SelectionClient'
import { getServicesClient } from '../../../../clients/PluginServiceClient'
import { getRunServiceClient } from '../../../../clients/RunPluginServiceClient'

// Determinate the required resource name to apply catalog plugins
const tempActions = new CatalogClient.CatalogPluginServiceResultActions('entities-common/apply-catalog-service')
const catalogServiceDependency = tempActions.getDependency(RequestVerbEnum.POST)

/**
 * Plugin services container. It :
 * 1. resolves the 'global' services, using the current dataset context
 * 2. provides to component below the service related properties
 *   * selectionServices: list of services available for the current selection
 *   * onStartSelectionService: Handler to run when user started a service with current selection  (serviceWrapper) => ()
 *
 * @author Raphaël Mechali
 */
export class PluginServicesContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired, // used in mapStateToProps
    // context related
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // currently displayed entities type
    // eslint-disable-next-line react/no-unused-prop-types
    restrictedDatasetsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired, // current open search request parameters
    // components children, where this container will inject services related properties
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    // from parent HOCs
    // eslint-disable-next-line react/no-unused-prop-types
    onShowDescription: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    isDescAvailableFor: PropTypes.func,

    // from mapStateToProps
    // selection related
    toggledElements: PropTypes.objectOf(AccessShapes.EntityWithServices).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),
    // eslint-disable-next-line react/no-unused-prop-types
    emptySelection: PropTypes.bool.isRequired,
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // service related
    serviceRunModel: PluginServiceRunModel,
    // eslint-disable-next-line react/no-unused-prop-types
    contextSelectionServices: AccessShapes.PluginServiceWithContentArray,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // The full list of dependencies

    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchPluginServices: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
    dispatchCloseService: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    children: [], // pre rendered children
    // lists of gathered selection services
    selectionServices: [],
  }

  /**
   * Retains plugin services that are present in both services list, by there configId
   * @param services1
   * @param services2
   * @return common plugin services to both lists (services list intersection)
   */
  static retainCommon(services1 = [], services2 = []) {
    services1.filter(({ configId: originId }) => services2.some(({ configId: targetId }) => originId === targetId))
  }

  /**
   * Is usable selection service in context?
   * @param service service as PluginService (wrapped in 'content:')
   * @param viewObjectType current view object type
   * @param availableDependencies available dependencies for current user
   */
  static isUsableSelectionService({ content: { applicationModes, entityTypes, type } }, viewObjectType, availableDependencies) {
    return applicationModes.includes(AccessDomain.applicationModes.MANY)
      && entityTypes.includes(viewObjectType)
      // For catalog service only: the user must be allowed to run catalog plugin service
      && (type !== AccessDomain.pluginTypes.CATALOG || availableDependencies.includes(catalogServiceDependency))
  }

  /**
   * Computes the selection services available
   * @param properties properties describing current selection state and global services
   * @return [{PluginService}] services available for current selection
   */
  static getSelectionServices = ({
    selectionMode, toggledElements, pageMetadata, emptySelection,
    contextSelectionServices, viewObjectType, availableDependencies = [],
    restrictedDatasetsIds,
  }) => {
    let selectionServices = []

    if (!emptySelection) {
      // 1 - Compute if there is a context
      const hasDastasetContext = restrictedDatasetsIds && !!restrictedDatasetsIds.length
      // 2 - recover context services
      if (contextSelectionServices) {
        // filter service for current context (only selection services, working with current objects type),
        // then remove 'content' wrapper to have basic services shapes
        selectionServices = filter(contextSelectionServices, (service) => PluginServicesContainer.isUsableSelectionService(service, viewObjectType, availableDependencies))
      }
      // 3 - Find every service that match all objects in selection
      // Note 1: That operation cannot be performed when selection is exclusive.
      //         Indeed, our catalog cannot active a service on entities from different datasets.
      //         i.e. : Maybe there is product, matching current form criteria, related to a dataset
      //         that does not allow the service execution. So we do not display service in such context
      // Note 2: It is useless when there is a dataset context ('MANY' services would then be in "contextSelectionServices")
      if (!hasDastasetContext && selectionMode === TableSelectionModes.includeSelected) {
        // compute first element services (pre: toggled elements cannot be empty here since we are in 'includeSelected' mode)
        // note: we remove doubles here to lower later complexity
        const [{ content: { services: allFirstEntityServices = [] } }, ...otherSelectedElements] = values(toggledElements)
        const filteredFirstEntityServices = allFirstEntityServices.filter((service) => PluginServicesContainer.isUsableSelectionService(service, viewObjectType, availableDependencies)
          && !selectionServices.some(({ content: { configId, type } }) => configId === service.content.configId && type === service.content.type))

        // compute next selected entities valid services intersection (contains only usable services in context since first element services have been filtered)
        const commonEntitiesSelectionServices = otherSelectedElements.reduce(
          (commonServices, { content: { services: entityServices } }) => commonServices.filter(({ content: collectedService }) => entityServices && entityServices.some(({ content: entityService }) => entityService.configId === collectedService.configId && entityService.type === collectedService.type)),
          filteredFirstEntityServices,
        )

        // store in resulting list
        selectionServices = selectionServices.concat(commonEntitiesSelectionServices)
      }
    }
    return selectionServices
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { tableSelectors } = getSelectionClient(tabType)
    const { searchSelectors } = getSearchCatalogClient(tabType)
    const { servicesSelectors } = getServicesClient(tabType)
    const { runServiceSelectors } = getRunServiceClient(tabType)
    return {
      // seletion related
      selectionMode: tableSelectors.getSelectionMode(state),
      toggledElements: tableSelectors.getToggledElements(state),
      emptySelection: tableSelectors.isEmptySelection(state, searchSelectors),
      pageMetadata: searchSelectors.getMetaData(state),
      // fetched service related
      contextSelectionServices: servicesSelectors.getResult(state),
      // running service related
      serviceRunModel: runServiceSelectors.getServiceRunModel(state),
      // logged user state related
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { tabType }) {
    const { servicesActions } = getServicesClient(tabType)
    const { runServiceActions } = getRunServiceClient(tabType)
    return {
      dispatchFetchPluginServices: (datasetIds) => dispatch(servicesActions.fetchPluginServices(datasetIds)),
      dispatchRunService: (service, serviceTarget) => dispatch(runServiceActions.runService(service, serviceTarget)),
      dispatchCloseService: () => dispatch(runServiceActions.closeService()),
    }
  }

  /**
   * Lifecycle hook. Used here to detect properties change
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesChanged(this.props)
  }

  /**
   * Lifecycle hook. Used here to detect properties change
   * @param {*} nextProps next component props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesChanged(nextProps, this.props)
  }

  /**
   * Updates the component on properties changes (starts fetching, converts data, update state...)
   * @param newProperties new properties
   * @param oldProperties old properties
   */
  onPropertiesChanged = (newProps, oldProps = {}) => {
    const oldState = this.state || {}
    const newState = { ...(this.state || PluginServicesContainer.DEFAULT_STATE) }

    // A - dataset tag or context changed, component was mounted or user rights changed, update global services
    if (!isEqual(oldProps.restrictedDatasetsIds, newProps.restrictedDatasetsIds)
      || !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      // 1 - compute the list of dataset IDs to provide
      let datasetIds = null
      if (newProps.restrictedDatasetsIds && newProps.restrictedDatasetsIds.length) {
        // restricted to some dataset by configuration
        datasetIds = newProps.restrictedDatasetsIds
      }
      newProps.dispatchFetchPluginServices(datasetIds)
    }

    // B - global services, view object type, selection changed, user rights changed or children changed:
    // update available selection services and clone children with new values
    if (newProps.contextSelectionServices !== oldProps.contextSelectionServices || oldProps.selectionMode !== newProps.selectionMode
      || oldProps.toggledElements !== newProps.toggledElements || oldProps.pageMetadata !== newProps.pageMetadata
      || oldProps.viewObjectType !== newProps.viewObjectType || !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      newState.selectionServices = PluginServicesContainer.getSelectionServices(newProps)
    }

    // when children changed or selection services changed, recompute children
    if (oldProps.children !== newProps.children
      || !isEqual(oldProps.isDescAvailableFor, newProps.isDescAvailableFor)
      || !isEqual(oldProps.onShowDescription, newProps.onShowDescription)
      || !isEqual(oldState.selectionServices, newState.selectionServices)) {
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        // From description HOC
        isDescAvailableFor: newProps.isDescAvailableFor,
        onShowDescription: newProps.onShowDescription,
        // This HOC properties
        selectionServices: newState.selectionServices,
        onStartSelectionService: this.onStartSelectionService,
      })
      // update state
      this.setState(newState)
    }
  }

  /**
   * Handler: user started a selection service
   * @param service started service (as returned by served, wrapped in content)
   */
  onStartSelectionService = ({ content: service }) => {
    const {
      dispatchRunService, selectionMode, toggledElements, requestParameters, viewObjectType, pageMetadata,
    } = this.props
    const entities = values(toggledElements)
    // pack service target
    const target = selectionMode === TableSelectionModes.includeSelected
      ? TargetHelper.buildManyElementsTarget(entities)
      : TargetHelper.buildQueryTarget(requestParameters, viewObjectType, pageMetadata.totalElements, entities)
    // note : only service content is dipatched (see top methods conversion)
    dispatchRunService({ serviceConfiguration: service, target })
  }

  render() {
    const { dispatchCloseService, serviceRunModel } = this.props
    const { children } = this.state
    return (
      <>
        <ServiceContainer
          serviceRunModel={serviceRunModel} // running service display
          onQuit={dispatchCloseService}
        />
        { // render the children list (from pre rendered elements, see on properties changed)
          HOCUtils.renderChildren(children)
        }
      </>
    )
  }
}

export default connect(PluginServicesContainer.mapStateToProps, PluginServicesContainer.mapDispatchToProps)(PluginServicesContainer)
