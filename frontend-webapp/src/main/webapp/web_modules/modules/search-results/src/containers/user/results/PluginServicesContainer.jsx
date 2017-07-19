/**
* LICENSE_PLACEHOLDER
**/
import keys from 'lodash/keys'
import values from 'lodash/values'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AccessDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { ServiceContainer, PluginServiceRunModel, targets } from '@regardsoss/entities-common'
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
 *   * onStartOneElementService: Handler to run when user started a service with current selection  (serviceWrapper) => ()
 *   * onStartSelectionService: Handler to run when user started a service for one element
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
      // TODO uncomment when available
      // case CatalogDomain.SearchResultsTargetsEnum.DOCUMENT_RESULTS:
      //   return DamDomain.ENTITY_TYPES_ENUM.DOCUMENT
      default:
        throw new Error('Unknown results view type ', viewType)
    }
  }

  /**
   * Filters services that are valid in context
   * @param services services
   * @param currentViewType current results view type
   * @return [{PluginService}] filtered array services working with MANY elements and the current entity type
   */
  static filterServices = (services = [], currentViewType) => services.filter(({ applicationModes, entityTypes }) =>
    applicationModes.includes(AccessDomain.applicationModes.MANY) &&
    entityTypes.includes(PluginServicesContainer.getEntityTypeForViewType(currentViewType)))

  /**
   * Retains plugin services that are present in both services list, by there configId
   * @param services1
   * @param services2
   * @return common plugin services to both lists (services list intersection)
   */
  static retainCommon = (services1 = [], services2 = []) =>
    services1.filter(({ configId: originId }) =>
      services2.some(({ configId: targetId }) => originId === targetId))

  /**
   * Computes the selection services available and returns services partitions
   * @param properties properties describing current selection state and global services
   * @return services available for current selection in an object like {
   *  uiServices: [{PluginService}]
   *  catalogServices: [{PluginService}]
   * }
   */
  static getSelectionServices = ({ selectionMode, toggledElements, pageMetadata, globalServices, viewObjectType, selectedDatasetIpId }) => {
    let uiServices = []
    let catalogServices = []
    if (!PluginServicesContainer.isEmptySelection(selectionMode, toggledElements, pageMetadata)) {
      // 1 - recover global services
      if (globalServices) {
        uiServices = PluginServicesContainer.filterServices(globalServices['ui-services'])
        catalogServices = PluginServicesContainer.filterServices(globalServices['catalog-services'])
      }
      // 2 - Find every service that match all objects in selection
      // Note A - that cannot be performed with exclusive selection)
      // Note B - that is useless when there is a current dataset IP ID (since all entities have the very same
      //          selection services, that were provided through globalServices)
      if (!selectedDatasetIpId && selectionMode === TableSelectionModes.includeSelected) {
        // retrieve first element services (toggled elements cannot be empty here, as selection is not)
        const [{ content: { services: initialServices } }, ...otherSelectedElements] = toggledElements
        // retain only common ones
        const retainedInSelection = otherSelectedElements.reduce(
          ({ selectionUIServices, selectionCatalogServices }, { content: { services = [] } }) => ({
            // retain only plugin services that are present in both (note: it is not required to filter entity services
            // as initial services were filtered and we are computing the intersection set here)
            selectionUIServices: PluginServicesContainer.retainCommon(selectionUIServices, services['ui-services']),
            selectionCatalogServices: PluginServicesContainer.retainCommon(selectionCatalogServices, services['catalog-services']),
          }), {
            // initial reduce value: first item
            selectionUIServices: PluginServicesContainer.filterServices(initialServices['ui-services']),
            selectionCatalogServices: PluginServicesContainer.filterServices(initialServices['catalog-services']),
          })
        uiServices = uiServices.concat(retainedInSelection.uiServices)
        catalogServices = catalogServices.concat(retainedInSelection.catalogServices)
      }
    }
    return { uiServices, catalogServices }
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
    globalServices: pluginServiceSelectors.getResult(state),
    // running service related
    serviceRunModel: runPluginServiceSelectors.getServiceRunModel(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchFetchGlobalPluginServices: datasetIpId => dispatch(pluginServiceActions.fetchPluginServices(datasetIpId)),
    dispatchRunService: (service, target) => dispatch(runPluginServiceActions.runService(service, target)),
    dispatchCloseService: () => dispatch(runPluginServiceActions.closeService()),
  })

  static propTypes = {
    // context related
    viewObjectType: PropTypes.oneOf(values(CatalogDomain.SearchResultsTargetsEnum)).isRequired, // currently displayed entities type
    initialDatasetIpId: PropTypes.string, // initial dataset ip id or none
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired, // only used to build query

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
    globalServices: AccessShapes.ContextPluginServices,

    // from mapDispatchToProps
    dispatchFetchGlobalPluginServices: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
    dispatchCloseService: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    // lists of gathered selection services
    uiServices: [],
    catalogServices: [],
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

    // A - dataset changed, update global services
    if (oldProps.selectedDatasetIpId !== newProps.selectedDatasetIpId) {
      newProps.dispatchFetchGlobalPluginServices(newProps.selectedDatasetIpId)
    }

    // B - global services, view object type or selection changed : update available selection services
    if (newProps.globalServices !== oldProps.globalServices || oldProps.selectionMode !== newProps.selectionMode ||
      oldProps.toggledElements !== newProps.toggledElements || oldProps.pageMetadata !== newProps.pageMetadata ||
      oldProps.viewObjectType !== newProps.viewObjectType) {
      newState = PluginServicesContainer.getSelectionServices(newProps)
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  onStartService = (type, service) => {
    const { dispatchRunService, selectionMode, toggledElements } = this.props
    dispatchRunService(
      new PluginServiceRunModel(service, type, new targets.ManyElementsTarget(toggledElements, selectionMode)))
  }

  /**
   * Handler: user started a catalog selection service
   * @param service service to run
   * @return handler, as partially applied onStartService method
   */
  onStartSelectionCatalogService = service => this.onStartService(this, PluginServiceRunModel.ServiceTypes.CATALOG_PLUGIN_SERVICE)

  /**
   * Handler: user started a catalog selection service
   * @param service service to run
   * @return handler, as partially applied onStartService method
   */
  onStartSelectionUIService = service => this.onStartService(this, PluginServiceRunModel.ServiceTypes.UI_PLUGIN_SERVICE)


  render() {
    const { dispatchCloseService, serviceRunModel, ...otherProperties } = this.props
    const { uiServices, catalogServices } = this.state
    return (
      <div >
        <ServiceContainer // running service display
          serviceRunModel={serviceRunModel}
          onQuit={dispatchCloseService}
        />
        <SearchResultsComponent // inject all services in search results component, and provide parent display properties
          selectionUIServices={uiServices}
          selectionCatalogServices={catalogServices}
          onStartSelectionCatalogService={this.onStartSelectionCatalogService}
          onStartSelectionUIService={this.onStartSelectionUIService}
          {...otherProperties} // add properties from parent resluts container
        />
      </div >
    )
  }

}

export default connect(PluginServicesContainer.mapStateToProps, PluginServicesContainer.mapDispatchToProps)(PluginServicesContainer)
