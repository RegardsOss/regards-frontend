/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CatalogDomain, DamDomain } from '@regardsoss/domain'
import { HOCUtils } from '@regardsoss/display-control'
import { Tag } from '../../models/navigation/Tag'
import navigationContextActions from '../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../models/navigation/NavigationContextSelectors'
import { actions as searchEntityActions } from '../../clients/SearchEntityClient'
import { TableDisplayModeValues } from '../../models/navigation/TableDisplayModeEnum'

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
    TABLE_DISPLAY_MODE_PARAMETER: 'd',
  }


  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    tableDisplayMode: navigationContextSelectors.getDisplayMode(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchFetchEntity: datasetId => dispatch(searchEntityActions.getEntity(datasetId)),
    initialize: ((viewObjectType, tableDisplayMode, initialContextTags, tags) => dispatch(navigationContextActions.initialize(viewObjectType, tableDisplayMode, initialContextTags, tags))),
  })

  static propTypes = {
    // Is this component externally driven? (when it is, it will ignore a part of the URL)
    isExternallyDriven: PropTypes.bool.isRequired,
    // context initial view mode
    initialViewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    // context initial display mode
    initialTableDisplayMode: PropTypes.oneOf(TableDisplayModeValues).isRequired,
    // context initial tags (not yet expressed as Tag)
    initialContextTags: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(values(CatalogDomain.TagTypes)).isRequired,
      label: PropTypes.string.isRequired,
      searchKey: PropTypes.string.isRequired,
    })),
    // from mapStateToProps
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    // Display mode
    tableDisplayMode: PropTypes.oneOf(TableDisplayModeValues),
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired,
    // from mapDispatchToProps
    initialize: PropTypes.func.isRequired,
    dispatchFetchEntity: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  /**
   * When component mounts: mark not initialized
   */
  componentWillMount = () => {
    // when mounting: not initialized
    this.setInitialized(false)
  }

  /**
   * When component mounted: resolve initial context: From URL when not externally driven, from  module parameters otherwise
   */
  componentDidMount() {
    // 1 - collect URL data
    const { query } = browserHistory.getCurrentLocation()

    const {
      isExternallyDriven, initialViewObjectType, initialTableDisplayMode, dispatchFetchEntity,
    } = this.props

    // collect all parameters from URL except tags (tags may be externally driven)
    const viewObjectType = query[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType
    const tableDisplayMode = query[URLManagementContainer.ModuleURLParameters.TABLE_DISPLAY_MODE_PARAMETER] || initialTableDisplayMode

    if (isExternallyDriven) {
      // 2 - initialize tags from external driving properties
      this.dispatchInitEvent(viewObjectType, tableDisplayMode, this.props.initialContextTags, [])
    } else {
      // 3 - (internal control) initialize tags from URL (we need to retrieve the entities label)
      const searchTagsFromURL = Tag.fromURLParameterValue(query[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER])
      Promise.all(searchTagsFromURL.map(tag => Tag.getTagPromise(dispatchFetchEntity, tag)))
        // all entity tags (if any) were correctly resolved, initialize the store
        .then(tags => this.dispatchInitEvent(viewObjectType, tableDisplayMode, [], tags))
        // there was error, remove guilty tags in the store
        .catch(() => this.dispatchInitEvent(viewObjectType, tableDisplayMode))
    }
  }


  /**
   * When redux state changes: report new state values to URL parameters.
   * Note that it is never performed initially (what is cool here!)
   */
  componentWillReceiveProps = (nextProps) => {
    const { initialViewObjectType, initialTableDisplayMode } = this.props
    const { pathname, query } = browserHistory.getCurrentLocation()
    if (this.props.initialContextTags !== nextProps.initialContextTags) { // externally driving componenent changed this context state: reset
      // 1 - External driving component changed this module context, update redux state
      // 1.a - collect URL data
      const viewObjectType = query[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] || initialViewObjectType
      const tableDisplayMode = query[URLManagementContainer.ModuleURLParameters.TABLE_DISPLAY_MODE_PARAMETER] || initialTableDisplayMode
      // 1.b - dispatch re-init
      this.dispatchInitEvent(viewObjectType, tableDisplayMode, nextProps.initialContextTags, [])
    } else if (!isEqual(this.props.levels, nextProps.levels)
      || !isEqual(this.props.viewObjectType, nextProps.viewObjectType)
      || !isEqual(this.props.tableDisplayMode, nextProps.tableDisplayMode)) {
      // 2 - The component state was updated (by user or by driving module): update URL to reflect changes
      // 2.a - a restore query simple parameters
      const nextBrowserQuery = { ...query }
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER] = nextProps.viewObjectType || initialViewObjectType
      nextBrowserQuery[URLManagementContainer.ModuleURLParameters.TABLE_DISPLAY_MODE_PARAMETER] = nextProps.tableDisplayMode || initialTableDisplayMode
      // 2.b - tag parameter: set up the value or remove it if undefined
      const searchTagParameterValue = Tag.toURLParameterValue(nextProps.levels) || ''
      if (searchTagParameterValue) {
        nextBrowserQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER] = searchTagParameterValue
      } else { // clear the parameter
        delete nextBrowserQuery[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]
      }
      // 2.c - update browser query (do not push)
      browserHistory.replace({ pathname, query: nextBrowserQuery })
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
   * @param {*} tableDisplayMode display mode
   * @param {string} initialContextTags initial context tags if any
   * @param {[string]} tags tags list (optional)
   * @return dispatch promise
   */
  dispatchInitEvent(viewObjectType, tableDisplayMode, initialContextTags = [], tags = []) {
    const { initialize } = this.props
    //convert configuration tags into tags models (provide class methods)
    const initialTagsAsClass = (initialContextTags || []).map(tag => new Tag(tag.type, tag.label, tag.searchKey))
    // dispatch redux action
    return initialize(viewObjectType, tableDisplayMode, initialTagsAsClass, tags).then(() => this.setInitialized(true))
  }


  render() {
    const { children } = this.props
    const { initialized } = this.state
    // render only when initialized to block sub element requests
    if (initialized) {
      return HOCUtils.renderChildren(children)
    }
    return null
  }
}
export default connect(
  URLManagementContainer.mapStateToProps,
  URLManagementContainer.mapDispatchToProps,
)(URLManagementContainer)
