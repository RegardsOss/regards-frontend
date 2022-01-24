/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { RefreshPageableTableOption } from './RefreshPageableTableOption'
import { DEFAULT_PAGE_SIZE } from '../InfiniteTableContainer'

export const DEFAULT_REFRESH_TIME = 5000

/**
 * Auto refresh table content HOC. It has no graphics render. It fetches like following:
 * Wait for fetch to be performed (initial one is done by table container) then start timer on refreshTimeMS then
 * refresh complete table content
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
  static mapDispatchToProps(dispatch, { pageableTableActions, pathParams, requestParams }) {
    return {
      fetchEntities: (pageIndex, pageSize) => dispatch(pageableTableActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, requestParams)),
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
    // eslint-disable-next-line react/no-unused-prop-types
    pageableTableActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // used in map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    pageableTableSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used in map state to props
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
  }

  static defaultProps = {
    shouldRefetchAll: true,
    pageSize: DEFAULT_PAGE_SIZE,
    refreshTimeMS: DEFAULT_REFRESH_TIME,
  }

  /**
   * Lifecycle method: component did mount. Used here to start refresh loop
   */
  componentDidMount() {
    this.stopRefreshing = false
    this.onRefresh()
  }

  /**
     * Lifecycle method: component will unmount. Used here to stop refresh loop
     */
  componentWillUnmount() {
    this.stopRefreshing = true // simple marker to avoid sending next refresh
  }

  /**
   * Refreshes table
   */
  onRefresh = () => {
    if (!this.stopRefreshing) {
      const { refreshTimeMS } = this.props
      // 1 - start timer
      root.setTimeout(() => {
        // On timer end, evalute this properties, then...
        const {
          pageSize, shouldRefetchAll, pageMetadata, fetchEntities,
          isFetching, pathParams, requestParams,
        } = this.props
        // A - When not already fetching, start fetching and restart timer after fetch finished
        if (!isFetching && !this.stopRefreshing) {
          RefreshPageableTableOption.refreshTable(fetchEntities, pageSize, shouldRefetchAll,
            pageMetadata, pathParams, requestParams).then(this.onRefresh)
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
