/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { SearchResultsTargetsEnum } from '@regardsoss/domain/catalog'
import { Tag } from '../../models/navigation/Tag'
import navigationContextActions from '../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../models/navigation/NavigationContextSelectors'
import { actions as searchEntityActions } from '../../clients/SearchEntityClient'
import DisplayModeEnum from '../../models/navigation/DisplayModeEnum'

/**
* URL management container: reflects the current module state into URL, intialize module from URL (no graphics view)
*/
export class URLManagementContainer extends React.Component {

  /**
 * module URL parameters
 */
  static ModuleURLParameters = {
    TARGET_PARAMETER: 't',
    SEARCH_TAGS_PARAMETER: 'tags',
    DISPLAY_MODE_PARAMETER: 'd',
  }


  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    displayMode: navigationContextSelectors.getDisplayMode(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchFetchEntity: datasetIpId => dispatch(searchEntityActions.getEntity(datasetIpId)),
    initialize: ((viewObjectType, displayMode, rootContextLabel, searchTag, dataset) =>
      dispatch(navigationContextActions.initialize(viewObjectType, displayMode, rootContextLabel, searchTag, dataset))),
  })

  static propTypes = {
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
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired,
    // from mapDispatchToProps
    initialize: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchEntity: PropTypes.func.isRequired,
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
    const { initialViewObjectType, initialDisplayMode, initialize, currentQuery: query, displayDatasets } = nextProps

    // collect query parameters from URL
    const viewObjectType = displayDatasets ? (query[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType) :
      SearchResultsTargetsEnum.DATAOBJECT_RESULTS // object type: forbid dataset when they cannot be displayed
    const displayMode = query[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER] || initialDisplayMode
    const searchTags = Tag.fromURLParameterValue(query[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER])

    // compare previous and current tags values
    const hasAlreadySameTags = nextProps.levels.length === searchTags.length &&
      searchTags.reduce((acc, tagFromURL, index) => acc && (tagFromURL === nextProps.levels[index].searchKey), true)

    // when not initialized or any change, re initialize
    if (nextProps.viewObjectType !== viewObjectType || nextProps.displayMode !== displayMode || !hasAlreadySameTags) {
      // initialize: build a promise to resolve all entities tags, remove tags when it could be resolved
      // (in both case, make sure to restove view mode and object type)
      Promise.all(searchTags.map(tag => Tag.getTagPromise(nextProps.dispatchFetchEntity, tag)))
        // all entity tags (if any) were correctly resolved, initialize the store
        .then(tags => initialize(viewObjectType, displayMode, tags))
        // there was error, remove guilty tags in the store
        .catch(initialize(viewObjectType, displayMode))
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
    const urlObjectType = currentQuery[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER]
    if (viewObjectType !== SearchResultsTargetsEnum.DATAOBJECT_RESULTS || urlObjectType) {
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] = viewObjectType
    }

    const urlDisplayMode = currentQuery[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER]
    if (displayMode !== urlDisplayMode || this.props.initialDisplayMode) {
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER] = displayMode
    }

    // 2 - search tag
    const searchTagParameterValue = Tag.toURLParameterValue(levels)
    if (searchTagParameterValue) {
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER] = searchTagParameterValue
    } else {
      delete nextBrowserQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]
    }

    // 3 - Finally update the URL if any change was detected
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
