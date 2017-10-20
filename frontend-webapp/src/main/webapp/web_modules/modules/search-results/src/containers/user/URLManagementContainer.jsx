/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
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
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  /**
   * When component mounts: initialize redux state from URL parameters
   */
  componentWillMount = () => {
    // when mounting: not initialized
    this.setInitialized(false)
    this.onPropertiesUpdate({}, this.props)
  }

  /**
   * When redux state changes: report new state values to URL parameters.
   * Note that it is never performed initially (what is cool here!)
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdate(this.props, nextProps)

  /** Generic update method to synchronize module state with URL */
  onPropertiesUpdate = (previousProps, nextProps) => {
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
   * Sets this initialized state
   */
  setInitialized = (initialized) => {
    if (get(this.state, 'initialized') !== initialized) { // avoid updating after init
      this.setState({ initialized })
    }
  }

  /**
   * Dispatches initialization event and marks this container initialized if not performed before
   * @param {function} initialize initialize dispatch method
   * @param {*} viewObjectType initialization view object type
   * @param {*} displayMode display mode
   * @param {[string]} tags tags list (optional)
   * @return dispatch promise
   */
  dispatchInitEvent(initialize, viewObjectType, displayMode, tags) {
    // dispatch redux action
    return initialize(viewObjectType, displayMode, tags).then(() => this.setInitialized(true))
  }

  /**
    * Update module redux state when URL changes
    * @param nextProps next component properties
    */
  updateStateFromURL = (nextProps) => {
    // first load: parse tag and dataset from URL, then initialize the module store
    const { initialViewObjectType, initialDisplayMode, initialize, dispatchFetchEntity, currentQuery: query, displayDatasets } = nextProps

    // collect query parameters from URL
    const viewObjectType = displayDatasets ? (query[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType) :
      SearchResultsTargetsEnum.DATAOBJECT_RESULTS // object type: forbid dataset when they cannot be displayed
    const displayMode = query[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER] || initialDisplayMode
    const searchTags = Tag.fromURLParameterValue(query[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER])

    // compare previous and current tags values
    const hasAlreadySameTags = nextProps.levels.length === searchTags.length &&
      searchTags.reduce((acc, tagFromURL, index) => acc && (tagFromURL === nextProps.levels[index].searchKey), true)

    // when not initialized or any change, re initialize
    if (!get(this.state,"initialize",null) || nextProps.viewObjectType !== viewObjectType || nextProps.displayMode !== displayMode || !hasAlreadySameTags) {
      // initialize: build a promise to resolve all entities tags, remove tags when it could be resolved
      // (in both case, make sure to restove view mode and object type)
      Promise.all(searchTags.map(tag => Tag.getTagPromise(dispatchFetchEntity, tag)))
        // all entity tags (if any) were correctly resolved, initialize the store
        .then(tags => this.dispatchInitEvent(initialize, viewObjectType, displayMode, tags))
        // there was error, remove guilty tags in the store
        .catch(() => this.dispatchInitEvent(initialize, viewObjectType, displayMode))
    }
  }


  /**
   * Update URL from module redux state when state change
   * @param nextProps next component properties
   */
  updateURLFromState = (nextProps) => {
    const { initialViewObjectType, initialDisplayMode, viewObjectType, displayMode, levels, currentQuery, currentPath } = nextProps

    // Report new state properties in URL, if significant
    const nextBrowserQuery = { ...currentQuery }

    // 1 - View object type: compare the current state URL with the current state props (take in account default)
    const urlObjectType = currentQuery[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType
    const currentViewObjectType = viewObjectType || initialViewObjectType
    if (urlObjectType !== currentViewObjectType) {
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] = viewObjectType
    }

    // 2 - display mode
    const urlDisplayMode = currentQuery[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER] || initialDisplayMode
    const currentDisplayMode = displayMode || initialDisplayMode
    if (urlDisplayMode !== currentDisplayMode) {
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER] = displayMode
    }

    // 3 - search tag
    const urlTags = currentQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER] || ''
    const searchTagParameterValue = Tag.toURLParameterValue(levels) || ''
    if (searchTagParameterValue !== urlTags) {
      if (searchTagParameterValue) {
        nextBrowserQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER] = searchTagParameterValue
      } else { // clear the parameter
        delete nextBrowserQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]
      }
    }

    // 4 - Finally update the URL if any change was detected
    if (!isEqual(currentQuery, nextBrowserQuery)) {
      browserHistory.push({ pathname: currentPath, query: nextBrowserQuery })
    }
  }

  render() {
    const { children } = this.props
    const { initialized } = this.state
    // render only when initialized to block sub element requests
    if (initialized) {
      // XXX-V2 use the specific tool for that =)
      switch (children.length) {
        case 0:
          return null
        case 1:
          return children[0]
        default:
          return <div>{children}</div>
      }
    }
    return null
  }
}
export default connect(
  URLManagementContainer.mapStateToProps,
  URLManagementContainer.mapDispatchToProps)(URLManagementContainer)
