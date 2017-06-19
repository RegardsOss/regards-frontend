/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from '../../models/navigation/NavigationLevel'
import navigationContextActions from '../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../models/navigation/NavigationContextSelectors'
import DisplayModeEnum from '../../models/navigation/DisplayModeEnum'
import { actions as findDatasetActions } from '../../clients/FindDatasetClient'


/**
 * module URL parameters
 */
const ModuleURLParameters = {
  TARGET_PARAMETER: 't',
  DATASET_IPID_PARAMETER: 'ds',
  SEARCH_TAG_PARAMETER: 'tag',
  DISPLAY_MODE_PARAMETER: 'd',
}

/**
* URL management container: reflects the current module state into URL, intialize module from URL (no graphics view)
*/
export class URLManagementContainer extends React.Component {

  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    displayMode: navigationContextSelectors.getDisplayMode(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchFetchDataset: datasetIpId => dispatch(findDatasetActions.findDataset(datasetIpId)),
    initialize: ((viewObjectType, displayMode, rootContextLabel, searchTag, dataset) =>
      dispatch(navigationContextActions.initialize(viewObjectType, displayMode, rootContextLabel, searchTag, dataset))),
  })

  static propTypes = {
    // initial context label, configures root navigation element
    initialContextLabel: PropTypes.string,
    // context initial view mode
    initialViewObjectType: PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
    // context initial display mode
    initialDisplayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]).isRequired,
    // current URL query information, used to detect browsing
    currentPath: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    currentQuery: PropTypes.object.isRequired,
    // Is displaying dataset allowed?
    displayDatasets: PropTypes.bool.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    viewObjectType: PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
    // Display mode
    displayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]),
    // eslint-disable-next-line react/no-unused-prop-types
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired,
    // from mapDispatchToProps
    initialize: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchDataset: PropTypes.func.isRequired,
  }

  /**
   * When component mounts: initialize redux state from URL parameters
   */
  componentWillMount = () => this.update({}, this.props)

  /**
   * When redux state changes: report new state values to URL parameters.
   * Note that it is never performed initially (what is cool here!)
   */
  componentWillReceiveProps = nextProps => this.update(this.props, nextProps)

  /**
   * Returns a promise to resolve dataset for ipId as parameter
   * @param ipId search dataset IP ID or null / undefined if none
   * @param dispatchFetchDataset function to fectch the dataset (ipId: string) => Promise() => action like {payload: DatasetModel}
   */
  getDataset = (datasetIpId, dispatchFetchDataset) => {
    if (!datasetIpId) {
      return Promise.resolve({}) // return object where payload is undefined
    }
    return dispatchFetchDataset(datasetIpId)
  }

  /** Generic update method to synchronize module state with URL */
  update = (previousProps, nextProps) => {
    if (!isEqual(previousProps.currentQuery, nextProps.currentQuery)) {
      // URL changed, remap the state
      this.updateStateFromURL(nextProps)
    } else if (!isEqual(previousProps.levels, nextProps.levels) ||
      !isEqual(previousProps.viewObjectType, nextProps.viewObjectType) ||
        !isEqual(previousProps.displayMode, nextProps.displayMode)) {
      this.updateURLFromState(nextProps)
    }
  }

  /**
   * Update module redux state when URL changes
   * @param nextProps next component properties
   */
  updateStateFromURL = (nextProps) => {
    // first load: parse tag and dataset from URL, then initialize the module store
    const { initialViewObjectType, initialDisplayMode, initialContextLabel, initialize, currentQuery: query, displayDatasets } = nextProps

    // collect query parameters from URL

    const viewObjectType = displayDatasets ? (query[ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType) :
      SearchResultsTargetsEnum.DATAOBJECT_RESULTS // object type: forbid dataset when they cannot be displayed
    const searchTag = query[ModuleURLParameters.SEARCH_TAG_PARAMETER]
    const datasetIpId = query[ModuleURLParameters.DATASET_IPID_PARAMETER]
    const displayMode = query[ModuleURLParameters.DISPLAY_MODE_PARAMETER] || initialDisplayMode

    // do not update if already equivalent
    const getLevelValue = level => level && level.levelValue // return level value or undefined, to compare with URL parameters

    // when not initialized or any change, re initialize
    if (!nextProps.levels.length || nextProps.viewObjectType !== viewObjectType ||
      getLevelValue(NavigationLevel.getDatasetLevel(nextProps.levels)) !== datasetIpId ||
      getLevelValue(NavigationLevel.getSearchTagLevel(nextProps.levels)) !== searchTag) {
      // initialize
      this.getDataset(datasetIpId, nextProps.dispatchFetchDataset)
        .then(({ payload: dataset }) => initialize(viewObjectType, displayMode, initialContextLabel, searchTag, dataset))
        .catch(initialize(viewObjectType, displayMode, initialContextLabel, searchTag))
    }
  }

  /**
   * Update URL from module redux state when state change
   * @param nextProps next component properties
   */
  updateURLFromState = (nextProps) => {
    const { viewObjectType, displayMode, levels, currentQuery, currentPath } = nextProps

    // Report new state properties in URL, if significant
    const nextBrowserQuery = { ...currentQuery }

    // 1 - View object type (do not update default URL when in default mode, ie no update when the parameter is missing, while the
    // mode is dataobject)
    const urlObjectType = currentQuery[ModuleURLParameters.TARGET_PARAMETER]
    if (viewObjectType !== SearchResultsTargetsEnum.DATAOBJECT_RESULTS || urlObjectType) {
      nextBrowserQuery[ModuleURLParameters.TARGET_PARAMETER] = viewObjectType
    }

    const urlDisplayMode = currentQuery[ModuleURLParameters.DISPLAY_MODE_PARAMETER]
    if (displayMode !== urlDisplayMode || this.props.initialDisplayMode) {
      nextBrowserQuery[ModuleURLParameters.DISPLAY_MODE_PARAMETER] = displayMode
    }

    // 2 - search tag
    const { levelValue: searchTag } = NavigationLevel.getSearchTagLevel(levels) || {}
    if (searchTag) {
      nextBrowserQuery[ModuleURLParameters.SEARCH_TAG_PARAMETER] = searchTag
    } else {
      delete nextBrowserQuery[ModuleURLParameters.SEARCH_TAG_PARAMETER]
    }

    // 3 - dataset
    const { levelValue: datasetIpId } = NavigationLevel.getDatasetLevel(levels) || {}
    if (datasetIpId) {
      nextBrowserQuery[ModuleURLParameters.DATASET_IPID_PARAMETER] = datasetIpId
    } else {
      delete nextBrowserQuery[ModuleURLParameters.DATASET_IPID_PARAMETER]
    }

    // 4 - Finally update the URL if any change was detected
    if (!isEqual(currentQuery, nextBrowserQuery)) {
      browserHistory.push({ pathname: currentPath, query: nextBrowserQuery })
    }
  }

  render() {
    return null
  }
}
export default connect(
  URLManagementContainer.mapStateToProps,
  URLManagementContainer.mapDispatchToProps)(URLManagementContainer)
