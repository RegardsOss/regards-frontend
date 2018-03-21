/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { RefreshPageableTableOption } from './RefreshPageableTableOption'
import { DEFAULT_PAGE_SIZE } from '../InfiniteTableContainer'

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
   * @return {*} list of component properties extracted from redux state
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
    // eslint-disable-next-line
    pathParams: PropTypes.object, // used in mapDispatchToProps, used as a map by fetch method
    // eslint-disable-next-line
    requestParams: PropTypes.object, // used in mapDispatchToProps, used as a map by fetch method
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
    refreshTimeMS: 2500,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Lifecycle method: component will unmount. Used here to clear any running timer
   */
  componentWillUnmount() {
    if (this.timerID) {
      root.clearTimeout(this.timerID)
    }
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (oldProps.isFetching && !newProps.isFetching) {
      this.timerID = root.setTimeout(this.onRefresh, newProps.refreshTimeMS)
    }
  }

  /**
   * Refreshes table
   */
  onRefresh = () => {
    const {
      pageSize, shouldRefetchAll, pageMetadata, fetchEntities,
    } = this.props
    RefreshPageableTableOption.refreshTable(pageSize, shouldRefetchAll, pageMetadata, fetchEntities)
  }

  render() {
    return null
  }
}

export default connect(
  AutoRefreshPageableTableHOC.mapStateToProps,
  AutoRefreshPageableTableHOC.mapDispatchToProps,
)(AutoRefreshPageableTableHOC)
