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

/**
 * module URL parameters
 */
const ModuleURLParameters = {
  TARGET_PARAMETER: 't',
  DATASET_IPID_PARAMETER: 'ds',
  SEARCH_TAG_PARAMETER: 'tag',
}

/**
* URL management container: reflects the current module state into URL, intialize module from URL (no graphics view)
*/
class URLManagementContainer extends React.Component {

  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
  })

  static mapDispatchToProps = dispatch => ({
    initialize: ((viewObjectType, rootContextLabel, searchTag, dataset) =>
      dispatch(navigationContextActions.initialize(viewObjectType, rootContextLabel, searchTag, dataset))),
  })

  static propTypes = {
    // initial context label, configures root navigation element
    initialContextLabel: React.PropTypes.string,
    // context initial view mode
    initialViewObjectType: React.PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
    // current URL query information, used to detect browsing
    currentPath: React.PropTypes.string.isRequired,
    currentQuery: React.PropTypes.object.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    viewObjectType: React.PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    levels: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NavigationLevel)).isRequired,
    // from mapDispatchToProps
    initialize: React.PropTypes.func.isRequired,
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

  /** Generic update method to synchronize module state with URL */
  update = (previousProps, nextProps) => {
    if (!isEqual(previousProps.currentQuery, nextProps.currentQuery)) {
      // URL changed, remap the state
      this.updateStateFromURL(nextProps)
    } else {
      this.updateURLFromState(nextProps)
    }
  }

  updateStateFromURL = (nextProps) => {
    // first load: parse tag and dataset from URL, then initialize the module store
    const { initialViewObjectType, initialContextLabel, initialize, currentQuery: query } = nextProps

    // collect query parameters from URL
    const viewObjectType = query[ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType
    const searchTag = query[ModuleURLParameters.SEARCH_TAG_PARAMETER]
    const datasetIpId = query[ModuleURLParameters.DATASET_IPID_PARAMETER]

    // TODO fetch the dataset if required, resolve it correctly (and not that hack x.x)
    initialize(viewObjectType, initialContextLabel, searchTag, datasetIpId && { content: { ipId: datasetIpId, label: datasetIpId } })
  }

  updateURLFromState = (nextProps) => {
    const { viewObjectType, levels, currentQuery, currentPath } = nextProps

    // Report new state properties in URL, if significant
    const nextBrowserQuery = { ...currentQuery }

    // 1 - View object type (do not update default URL when in default mode, ie no update when the parameter is missing, while the
    // mode is dataobject)
    const urlObjectType = currentQuery[ModuleURLParameters.TARGET_PARAMETER]
    if (viewObjectType !== SearchResultsTargetsEnum.DATAOBJECT_RESULTS || urlObjectType) {
      nextBrowserQuery[ModuleURLParameters.TARGET_PARAMETER] = viewObjectType
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
