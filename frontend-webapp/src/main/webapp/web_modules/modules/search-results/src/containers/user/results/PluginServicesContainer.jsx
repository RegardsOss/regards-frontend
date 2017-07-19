/**
* LICENSE_PLACEHOLDER
**/
import keys from 'lodash/keys'
import values from 'lodash/values'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { CatalogDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { ServiceContainer, PluginServiceConfigurationWrapper, targets } from '@regardsoss/entities-common'
import { TableSelectionModes } from '@regardsoss/components'
import { StringComparison } from '@regardsoss/form-utils'
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
   * Computes the selection services available and wraps them into a GUI usable object
   * @param properties properties describing current selection state and global services
   * @return the list of selection services available for current selection
   */
  static getSelectionServiceWrappers = ({ selectionMode, toggledElements, pageMetadata, globalServices }) => {
    if (PluginServicesContainer.isEmptySelection(selectionMode, toggledElements, pageMetadata)) {
      return []
    }

    const availableServices = [
      ...(globalServices ? : [])
    ]

  }

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
    runningService: runPluginServiceSelectors.getRunningService(state),
    target: runPluginServiceSelectors.getTarget(state),
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
    runningService: PropTypes.instanceOf(PluginServiceConfigurationWrapper),
    target: PropTypes.oneOfType([PropTypes.instanceOf(targets.OneElementTarget), PropTypes.instanceOf(targets.ManyElementsTarget)]),
    // selection related
    toggledElements: PropTypes.objectOf(AccessShapes.EntityWithServices).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // service related
    globalServices: AccessShapes.ContextPluginServices,

    // from mapDispatchToProps
    dispatchFetchGlobalPluginServices: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
    dispatchCloseService: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    selectionServices: [], // list of gathered selection services
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
    const newState = oldState ? { ...oldState } : PluginServicesContainer.DEFAULT_STATE

    // A - dataset changed, update global services
    if (oldProps.selectedDatasetIpId !== newProps.selectedDatasetIpId) {
      newProps.dispatchFetchGlobalPluginServices(newProps.selectedDatasetIpId)
    }

    // B - global services, view object type or selection changed : update available selection services
    if (!newProps.globalServices !== oldProps.globalServices || oldProps.selectionMode !== newProps.selectionMode ||
      oldProps.toggledElements !== newProps.toggledElements || oldProps.pageMetadata !== newProps.pageMetadata ||
      oldProps.viewObjectType !== newProps.viewObjectType) {
      newState.selectionServices = PluginServicesContainer.getAvailableServices(newProps)
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Handler: user ran a one dataobject service
   * @param service dataset service to run
   * @param element element to run service
   */

  onStartOneElementService = (service, element) => // dispatch to service run handler
    this.props.dispatchRunService(service, new targets.OneElementTarget(element))

  /**
   * Handler: user ran a many dataobject service
   * @param service selection service to run
   */
  onStartManyElementsServices = service => // dispatch to service run handler
    this.props.dispatchRunService(service,
      new targets.ManyElementsTarget(this.props.toggledElements, this.props.selectionMode))


  render() {
    const { dispatchCloseService, runningService, target, ...otherProperties } = this.props
    const { selectionServices } = this.state
    return (
      <div>
        <ServiceContainer // running service display
          serviceWrapper={runningService}
          target={target}
          onQuit={dispatchCloseService}
        />
        <SearchResultsComponent // inject all services in search results component, and provide parent display properties
          selectionServices={selectionServices}
          onStartOneElementService={this.onStartOneElementService}
          onStartSelectionService={this.onStartManyElementsServices}
          {...otherProperties} // add properties from parent resluts container
        />
      </div>
    )
  }

}

export default connect(PluginServicesContainer.mapStateToProps, PluginServicesContainer.mapDispatchToProps)(PluginServicesContainer)
