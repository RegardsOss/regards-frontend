/**
* LICENSE_PLACEHOLDER
**/
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes } from '@regardsoss/components'
import { CatalogClient } from '@regardsoss/client'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { ServiceContainer, PluginServiceRunModel, target } from '@regardsoss/entities-common'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { HOCUtils } from '@regardsoss/display-control'
import { pluginServiceActions, pluginServiceSelectors } from '../../../clients/PluginServiceClient'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'
import TableClient from '../../../clients/TableClient'
import { Tag } from '../../../models/navigation/Tag'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import runPluginServiceActions from '../../../models/services/RunPluginServiceActions'
import runPluginServiceSelectors from '../../../models/services/RunPluginServiceSelectors'

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
 * It renders clones below element(s) and injects the resolved services with callbacks as following:
 * - selectionServices: resolved services
 * - onStartSelectionService: resolved callback
 * @author Raphaël Mechali
 */
export class PluginServicesContainer extends React.Component {

  /**
   * Retains plugin services that are present in both services list, by there configId
   * @param services1
   * @param services2
   * @return common plugin services to both lists (services list intersection)
   */
  static retainCommon(services1 = [], services2 = []) {
    services1.filter(({ configId: originId }) =>
      services2.some(({ configId: targetId }) => originId === targetId))
  }

  /**
   * Is usable selection service in context?
   * @param service service as PluginService (wrapped in 'content:')
   * @param viewObjectType current view object type
   * @param availableDependencies available dependencies for current user
   */
  static isUsableSelectionService({ content: { applicationModes, entityTypes, type } }, viewObjectType, availableDependencies) {
    return applicationModes.includes(AccessDomain.applicationModes.MANY) &&
      entityTypes.includes(viewObjectType) &&
      // For catalog service only: the user must be allowed to run catalog plugin service
      (type !== AccessDomain.pluginTypes.CATALOG || availableDependencies.includes(catalogServiceDependency))
  }

  /**
   * Computes the selection services available
   * @param properties properties describing current selection state and global services
   * @return [{PluginService}] services available for current selection
   */
  static getSelectionServices = ({ selectionMode, toggledElements, pageMetadata, emptySelection,
    contextSelectionServices, viewObjectType, selectedDatasetIpId, availableDependencies = [] }) => {
    let selectionServices = []
    if (!emptySelection) {
      // 1 - recover context services
      if (contextSelectionServices) {
        // filter service for current context (only selection services, working with current objects type),
        // then remove 'content' wrapper to have basic services shapes
        selectionServices = filter(contextSelectionServices, service =>
          PluginServicesContainer.isUsableSelectionService(service, viewObjectType, availableDependencies))
      }
      // 2 - Find every service that match all objects in selection
      // Notes: That operation cannot be performed when selection is exclusive. It is useless when
      // there is a dataset IP ID set ('MANY' services would then be in "contextSelectionServices")
      if (!selectedDatasetIpId && selectionMode === TableSelectionModes.includeSelected) {
        // compute first element services (pre: toggled elements cannot be empty here since we are in 'includeSelected' mode)
        // note: we remove doubles here to lower later complexity
        const [{ content: { services: allFirstEntityServices = [] } }, ...otherSelectedElements] = values(toggledElements)
        const filteredFirstEntityServices = allFirstEntityServices.filter(
          service => PluginServicesContainer.isUsableSelectionService(service, viewObjectType, availableDependencies) &&
            !selectionServices.some(({ content: { configId, type } }) =>
              configId === service.content.configId && type === service.content.type))

        // compute next selected entities valid services intersection (contains only usable services in context since first element services have been filtered)
        const commonEntitiesSelectionServices = otherSelectedElements.reduce(
          (commonServices, { content: { services: entityServices } }) =>
            // retain only intersection with previous list
            commonServices.filter(({ content: collectedService }) =>
              // intersection is valid if a service with same config Id and type can be retrieved in next entity services
              entityServices && entityServices.some(({ content: entityService }) =>
                entityService.configId === collectedService.configId && entityService.type === collectedService.type))
          , filteredFirstEntityServices)


        // store in resulting list
        selectionServices = selectionServices.concat(commonEntitiesSelectionServices)
      }
    }
    return selectionServices
  }

  /**
   * Returns selected dataset IP ID or null if none
   * @param {*} state redux state
* @param {*} properties component properties
*/
  static getSelectedDatasetIpId = (state, { initialDatasetIpId }) => {
    const dynamicTag = Tag.getSearchedDatasetTag(navigationContextSelectors.getLevels(state))
    return dynamicTag ? dynamicTag.searchKey : initialDatasetIpId
  }

  static mapStateToProps = (state, props) => ({
    // context related
    selectedDatasetIpId: PluginServicesContainer.getSelectedDatasetIpId(state, props),
    // seletion related
    selectionMode: TableClient.tableSelectors.getSelectionMode(state),
    toggledElements: TableClient.tableSelectors.getToggledElements(state),
    emptySelection: TableClient.tableSelectors.isEmptySelection(state, searchSelectors),
    pageMetadata: searchSelectors.getMetaData(state),
    // fetched service related
    contextSelectionServices: pluginServiceSelectors.getResult(state),
    // running service related
    serviceRunModel: runPluginServiceSelectors.getServiceRunModel(state),
    // logged user state related
    availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchFetchPluginServices: datasetIpId => dispatch(pluginServiceActions.fetchPluginServices(datasetIpId)),
    dispatchRunService: (service, serviceTarget) => dispatch(runPluginServiceActions.runService(service, serviceTarget)),
    dispatchCloseService: () => dispatch(runPluginServiceActions.closeService()),
  })

  static propTypes = {
    // context related
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // currently displayed entities type
    // eslint-disable-next-line react/no-unused-prop-types
    initialDatasetIpId: PropTypes.string, // initial dataset ip id or none
    openSearchQuery: PropTypes.string.isRequired,
    // components children, where this container will inject services related properties
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    // from mapStateToProps
    // context related
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasetIpId: PropTypes.string, // selected dataset ip id (none when not a single dataset)
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
    serviceRunModel: PropTypes.instanceOf(PluginServiceRunModel),
    // eslint-disable-next-line react/no-unused-prop-types
    contextSelectionServices: AccessShapes.PluginServiceWithContentArray,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // The full list of dependencies

    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchPluginServices: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
    dispatchCloseService: PropTypes.func.isRequired,

    // ...sub component properties
  }

  static DEFAULT_STATE = {
    children: [], // pre rendered children
    // lists of gathered selection services
    selectionServices: [],
  }

  /**
   * Lifecycle hook. Used here to detect properties change
   */
  componentWillMount = () => this.onPropertiesChanged(this.props)

  /**
   * Lifecycle hook. Used here to detect properties change
   * @param {*} nextProps next component props
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps, this.props)

  /**
   * Updates the component on properties changes (starts fetching, converts data, update state...)
   * @param newProperties new properties
   * @param oldProperties old properties
   */
  onPropertiesChanged = (newProps, oldProps = {}) => {
    const oldState = this.state || {}
    const newState = oldState ? { ...oldState } : PluginServicesContainer.DEFAULT_STATE

    // A - dataset changed, component was mounted or user rights changed, update global services
    if (oldProps.selectedDatasetIpId !== newProps.selectedDatasetIpId ||
      !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      newProps.dispatchFetchPluginServices(newProps.selectedDatasetIpId)
    }

    // B - global services, view object type, selection changed, user rights changed or children changed:
    // update available selection services and clone children with new values
    if (newProps.contextSelectionServices !== oldProps.contextSelectionServices || oldProps.selectionMode !== newProps.selectionMode ||
      oldProps.toggledElements !== newProps.toggledElements || oldProps.pageMetadata !== newProps.pageMetadata ||
      oldProps.viewObjectType !== newProps.viewObjectType || !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      newState.selectionServices = PluginServicesContainer.getSelectionServices(newProps)
    }

    // when children changed or selection services changed, recompute children
    if (!isEqual(oldState.selectionServices, newState.selectionServices) ||
      HOCUtils.shouldCloneChildren(this, oldProps, newProps)) {
      // pre render children (attempts to enhance render performances)
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        ...HOCUtils.getOnlyNonDeclaredProps(this, newProps),
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
    const { dispatchRunService, selectionMode, toggledElements, openSearchQuery, viewObjectType, pageMetadata } = this.props
    // pack ip ID array
    const ipIdArray = map(toggledElements, elt => elt.content.ipId)
    // pack query
    const serviceTarget = selectionMode === TableSelectionModes.includeSelected ?
      target.buildManyElementsTarget(ipIdArray) :
      target.buildQueryTarget(openSearchQuery, viewObjectType, pageMetadata.totalElements, ipIdArray)
    // note : only service content is dipatched (see top methods conversion)
    dispatchRunService(new PluginServiceRunModel(service, serviceTarget))
  }

  render() {
    const { dispatchCloseService, serviceRunModel } = this.props
    const { children } = this.state
    return (
      <div >
        <ServiceContainer
          serviceRunModel={serviceRunModel} // running service display
          onQuit={dispatchCloseService}
        />
        { // render the children list (from pre rendered elements, see on properties changed)
          HOCUtils.renderChildren(children)
        }
      </div >
    )
  }

}

export default connect(PluginServicesContainer.mapStateToProps, PluginServicesContainer.mapDispatchToProps)(PluginServicesContainer)
