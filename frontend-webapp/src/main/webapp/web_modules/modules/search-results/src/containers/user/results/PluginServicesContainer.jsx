/**
* LICENSE_PLACEHOLDER
**/
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import map from 'lodash/map'
import omit from 'lodash/omit'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { AccessDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { ServiceContainer, PluginServiceRunModel, target } from '@regardsoss/entities-common'
import { TableSelectionModes } from '@regardsoss/components'
import { pluginServiceActions, pluginServiceSelectors } from '../../../clients/PluginServiceClient'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'
import TableClient from '../../../clients/TableClient'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import runPluginServiceActions from '../../../models/services/RunPluginServiceActions'
import runPluginServiceSelectors from '../../../models/services/RunPluginServiceSelectors'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'

/**
 * Plugin services container. It :
 * 1. resolves the 'global' services, using the current dataset context
 * 2. provides to component below the service related properties
 *   * selectionServices: list of services available for the current selection
 *   * onStartSelectionService: Handler to run when user started a service with current selection  (serviceWrapper) => ()
 * @author Raphaël Mechali
 */
export class PluginServicesContainer extends React.Component {

  /**
   * @param selectionMode current seletion mode
   * @param toggledElements toggled elements
   * @param pageMetadata page metadata
   * @return true if selection is empty
   */
  static isEmptySelection = (selectionMode, toggledElements, pageMetadata) => {
    const totalElements = (pageMetadata && pageMetadata.totalElements) || 0
    const selectionSize = keys(toggledElements).length

    return (selectionMode === TableSelectionModes.includeSelected && selectionSize === 0) ||
      (selectionMode === TableSelectionModes.excludeSelected && selectionSize === totalElements)
  }

  /**
   * Maps the possible results view types to equivalent entity type
   * @param {SearchResultsTargetsEnum} viewType view type, not null
   * @return {ENTITY_TYPES_ENUM} corresponding entity type for view type
   */
  static getEntityTypeForViewType = (viewType) => {
    switch (viewType) {
      case CatalogDomain.SearchResultsTargetsEnum.DATASET_RESULTS:
        return DamDomain.ENTITY_TYPES_ENUM.DATASET
      case CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS:
        return DamDomain.ENTITY_TYPES_ENUM.DATA
      // case CatalogDomain.SearchResultsTargetsEnum.DOCUMENT_RESULTS:
      //   return DamDomain.ENTITY_TYPES_ENUM.DOCUMENT
      default:
        throw new Error('Unknown results view type ', viewType)
    }
  }

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
   */
  static isUsableSelectionService({ content: { applicationModes, entityTypes } }, viewObjectType) {
    return applicationModes.includes(AccessDomain.applicationModes.MANY) &&
      entityTypes.includes(PluginServicesContainer.getEntityTypeForViewType(viewObjectType))
  }

  /**
   * Computes the selection services available
   * @param properties properties describing current selection state and global services
   * @return [{PluginService}] services available for current selection
   */
  static getSelectionServices = ({ selectionMode, toggledElements, pageMetadata, contextSelectionServices, viewObjectType, selectedDatasetIpId }) => {
    let selectionServices = []
    if (!PluginServicesContainer.isEmptySelection(selectionMode, toggledElements, pageMetadata)) {
      // 1 - recover context services
      if (contextSelectionServices) {
        // filter service for current context (only selection services, working with current objects type),
        // then remove 'content' wrapper to have basic services shapes
        selectionServices = filter(contextSelectionServices, service =>
          PluginServicesContainer.isUsableSelectionService(service, viewObjectType))
      }
      // 2 - Find every service that match all objects in selection
      // Notes: That operation cannot be performed when selection is exclusive. It is useless when
      // there is a dataset IP ID set ('MANY' services would then be in "contextSelectionServices")
      if (!selectedDatasetIpId && selectionMode === TableSelectionModes.includeSelected) {
        // compute first element services (pre: toggled elements cannot be empty here since we are in 'includeSelected' mode)
        // note: we remove doubles here to lower later complexity
        const [{ content: { services: allFirstEntityServices = [] } }, ...otherSelectedElements] = values(toggledElements)
        const filteredFirstEntityServices = allFirstEntityServices.filter(
          service => PluginServicesContainer.isUsableSelectionService(service, viewObjectType) &&
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

  static getSelectedDatasetIpId = (state, { initialDatasetIpId }) => {
    const datasetLevel = NavigationLevel.getDatasetLevel(navigationContextSelectors.getLevels(state))
    return (datasetLevel && datasetLevel.levelValue) || initialDatasetIpId
  }

  static mapStateToProps = (state, props) => ({
    // context related
    selectedDatasetIpId: PluginServicesContainer.getSelectedDatasetIpId(state, props),
    // seletion related
    selectionMode: TableClient.tableSelectors.getSelectionMode(state),
    toggledElements: TableClient.tableSelectors.getToggledElements(state),
    pageMetadata: searchSelectors.getMetaData(state),
    // fetched service related
    contextSelectionServices: pluginServiceSelectors.getResult(state),
    // running service related
    serviceRunModel: runPluginServiceSelectors.getServiceRunModel(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchFetchPluginServices: datasetIpId => dispatch(pluginServiceActions.fetchPluginServices(datasetIpId)),
    dispatchRunService: (service, serviceTarget) => dispatch(runPluginServiceActions.runService(service, serviceTarget)),
    dispatchCloseService: () => dispatch(runPluginServiceActions.closeService()),
  })

  static propTypes = {
    // context related
    viewObjectType: PropTypes.oneOf(values(CatalogDomain.SearchResultsTargetsEnum)).isRequired, // currently displayed entities type
    initialDatasetIpId: PropTypes.string, // initial dataset ip id or none
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired, // only used to build query
    openSearchQuery: PropTypes.string.isRequired,

    // from mapStateToProps
    // context related
    selectedDatasetIpId: PropTypes.string, // selected dataset ip id (none when not a single dataset)
    // selection related
    toggledElements: PropTypes.objectOf(AccessShapes.EntityWithServices).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // service related
    serviceRunModel: PropTypes.instanceOf(PluginServiceRunModel),
    contextSelectionServices: AccessShapes.PluginServiceWithContentArray,

    // from mapDispatchToProps
    dispatchFetchPluginServices: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
    dispatchCloseService: PropTypes.func.isRequired,

    // ...sub component properties
  }

  static DEFAULT_STATE = {
    // lists of gathered selection services
    selectionServices: [],
  }

  componentWillMount = () => this.onPropertiesChanged(this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps, this.props)

  /**
   * Updates the component on properties changes (starts fetching, converts data, update state...)
   * @param newProperties new REACT properties
   * @param oldProperties old REACT properties
   */
  onPropertiesChanged = (newProps, oldProps = {}) => {
    const oldState = this.state
    let newState = oldState ? { ...oldState } : PluginServicesContainer.DEFAULT_STATE

    // A - dataset changed or component was mounted, update global services
    if (!oldState || oldProps.selectedDatasetIpId !== newProps.selectedDatasetIpId) {
      newProps.dispatchFetchPluginServices(newProps.selectedDatasetIpId)
    }

    // B - global services, view object type or selection changed : update available selection services
    if (newProps.contextSelectionServices !== oldProps.contextSelectionServices || oldProps.selectionMode !== newProps.selectionMode ||
      oldProps.toggledElements !== newProps.toggledElements || oldProps.pageMetadata !== newProps.pageMetadata ||
      oldProps.viewObjectType !== newProps.viewObjectType) {
      newState = {
        selectionServices: PluginServicesContainer.getSelectionServices(newProps),
      }
    }

    if (!isEqual(oldState, newState)) {
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
      target.buildQueryTarget(openSearchQuery, PluginServicesContainer.getEntityTypeForViewType(viewObjectType), pageMetadata.totalElements, ipIdArray)
    // note : only service content is dipatched (see top methods conversion)
    dispatchRunService(new PluginServiceRunModel(service, serviceTarget))
  }

  render() {
    const { dispatchCloseService, serviceRunModel, ...otherProperties } = this.props
    const { selectionServices } = this.state
    // remove from sub component any property related to this container (only pass specific prop types through)
    const subComponentProps = omit(otherProperties, keys(PluginServicesContainer.PropTypes))
    return (
      <div >
        <ServiceContainer
          serviceRunModel={serviceRunModel} // running service display
          onQuit={dispatchCloseService}
        />
        <SearchResultsComponent // inject all services in search results component, and provide parent display properties
          selectionServices={selectionServices}
          onStartSelectionService={this.onStartSelectionService}
          {...subComponentProps} // add properties from parent results container
        />
      </div >
    )
  }

}

export default connect(PluginServicesContainer.mapStateToProps, PluginServicesContainer.mapDispatchToProps)(PluginServicesContainer)
