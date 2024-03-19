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
import root from 'window-or-global'
import { CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { RefreshPageableTableOption } from './RefreshPageableTableOption'
import { DEFAULT_PAGE_SIZE } from '../InfiniteTableContainer'

export const DEFAULT_REFRESH_TIME = 5000

/**
 * Auto refresh table content HOC. It has no graphics render. It fetches like following:
 * Wait for fetch to be performed (initial one is done by table container) then start timer on refreshTimeMS then
 * refresh complete table content.
 * You can switch on/off the auto refresh by using enableAutoRefresh prop.
 * Timer has an id that it is used to clear it when switching off the auto refresh. This prevent multiple network calls.
 *
 * @author Raphaël Mechali
 */
export class AutoRefreshPageableTableHOC extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pageableTableSelectors }) {
    return {
      isFetching: pageableTableSelectors.isFetching(state),
      pageMetadata: pageableTableSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, {
    pageableTableActions, pathParams, requestParams, bodyParams,
  }) {
    return {
      fetchEntities: (pageIndex, pageSize) => dispatch(pageableTableActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, requestParams)),
      fetchEntitiesByPost: (pageIndex, pageSize) => dispatch(pageableTableActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, requestParams, bodyParams)),
    }
  }

  static propTypes = {
    // should refetech all elements (or only first page)
    shouldRefetchAll: PropTypes.bool,
    // refresh time after previous fetch in milliseconds (see defaultProps for value)
    // eslint-disable-next-line react/no-unused-prop-types
    refreshTimeMS: PropTypes.number, // used in onPropertiesUpdated
    // page size, uses default page size when not provided
    pageSize: PropTypes.number,
    pathParams: CommonShapes.RequestParameters,
    requestParams: CommonShapes.RequestParameters,
    bodyParams: PropTypes.oneOfType([
      CommonShapes.RequestParameters,
      TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    ]),
    // eslint-disable-next-line react/no-unused-prop-types
    pageableTableActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // used in map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    pageableTableSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used in map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    enableAutoRefresh: PropTypes.bool,
    fetchUsingPostMethod: PropTypes.bool,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    isFetching: PropTypes.bool, // used in onPropertiesUpdated
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDispatchToProps
    fetchEntities: PropTypes.func.isRequired,
    fetchEntitiesByPost: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shouldRefetchAll: true,
    pageSize: DEFAULT_PAGE_SIZE,
    refreshTimeMS: DEFAULT_REFRESH_TIME,
    enableAutoRefresh: true,
    fetchUsingPostMethod: false,
  }

  /**
   * Lifecycle method: component did mount. Used here to start refresh loop
   */
  componentDidMount() {
    this.onPropertiesUpdate({}, this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdate(this.props, nextProps)
  }

  /**
   * Lifecycle method: component will unmount. Used here to stop refresh loop
   */
  componentWillUnmount() {
    this.stopRefreshing = true // simple marker to avoid sending next refresh
  }

  onPropertiesUpdate = (previousProps, nextProps) => {
    const { enableAutoRefresh } = nextProps
    if (previousProps.enableAutoRefresh !== enableAutoRefresh) {
      this.stopRefreshing = !enableAutoRefresh
      if (enableAutoRefresh) {
        this.onRefresh()
      } else {
        root.clearTimeout(this.timerId)
      }
    }
  }

  /**
   * Refreshes table
   */
  onRefresh = () => {
    if (!this.stopRefreshing) {
      const { refreshTimeMS } = this.props
      // 1 - start timer
      this.timerId = root.setTimeout(() => {
        // On timer end, evalute this properties, then...
        const {
          pageSize, shouldRefetchAll, pageMetadata, fetchEntities,
          isFetching, pathParams, requestParams, fetchUsingPostMethod, fetchEntitiesByPost,
          bodyParams,
        } = this.props
        // A - When not already fetching, start fetching and restart timer after fetch finished
        if (!isFetching && !this.stopRefreshing) {
          RefreshPageableTableOption.refreshTable(fetchUsingPostMethod ? fetchEntitiesByPost : fetchEntities, pageSize, shouldRefetchAll,
            pageMetadata, pathParams, requestParams, bodyParams).then(this.onRefresh)
        } else {
          // B - when already fetching, ignore event and just restart timer
          this.onRefresh()
        }
      }, refreshTimeMS)
    }
    // else: this component should simply dye as it was unmounted, do not restart timers
  }

  render() {
    return null
  }
}

export default connect(
  AutoRefreshPageableTableHOC.mapStateToProps,
  AutoRefreshPageableTableHOC.mapDispatchToProps,
)(AutoRefreshPageableTableHOC)
