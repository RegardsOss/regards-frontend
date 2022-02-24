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
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { DEFAULT_PAGE_SIZE } from '../InfiniteTableContainer'
import RefreshButtonComponent from './RefreshButtonComponent'

/**
* Refresh table option adapted to pagable endpont (container and component, made to be embedded within table header )
* @author Raphaël Mechali
*/
export class RefreshPageableTableOption extends React.Component {
  /**
   * Refresh table method (static to be share with other components)
   * @param {*} pageSize table page size
   * @param {*} shouldRefetchAll should refetch all table elements?
   * @param {*} pageMetadata page metadata
   * @param {*} fetchEntities fetch entities method
   * @param {*} pathParams path parameters if any
   * @param {*} requestParams request parameters if any
   * @return {Promise} dispatched promise
   */
  static refreshTable(fetchEntities, pageSize, shouldRefetchAll, pageMetadata, pathParams = null, requestParams = null, bodyParams = null) {
    let fetchPageSize = pageSize
    if (shouldRefetchAll) {
      // compute page size to refresh all current entities in the table
      const lastPage = (pageMetadata && pageMetadata.number) || 0
      fetchPageSize = pageSize * (lastPage + 1)
    }
    return fetchEntities(0, fetchPageSize, pathParams, requestParams, bodyParams)
  }

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
  static mapDispatchToProps(dispatch, { pageableTableActions }) {
    return {
      fetchEntities: (pageIndex, pageSize, pathParams, requestParams) => dispatch(pageableTableActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, requestParams)),
    }
  }

  static propTypes = {
    // should refetech all elements (or only first page)
    shouldRefetchAll: PropTypes.bool,
    // page size, uses default page size when not provided
    pageSize: PropTypes.number,
    pathParams: CommonShapes.RequestParameters,
    requestParams: CommonShapes.RequestParameters,
    // eslint-disable-next-line react/no-unused-prop-types
    pageableTableActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // used in map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    pageableTableSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used in map state to props
    // from mapStateToProps
    isFetching: PropTypes.bool,
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
  }

  /**
 * Refreshes table up to the current last page
 */
  onRefresh = () => {
    const {
      pageSize, shouldRefetchAll, pageMetadata, fetchEntities, pathParams, requestParams,
    } = this.props
    RefreshPageableTableOption.refreshTable(fetchEntities, pageSize, shouldRefetchAll,
      pageMetadata, pathParams, requestParams)
  }

  render() {
    const { isFetching } = this.props
    return (
      <RefreshButtonComponent
        canFetch={!isFetching}
        onRefresh={this.onRefresh}
      />
    )
  }
}
const connected = connect(
  RefreshPageableTableOption.mapStateToProps,
  RefreshPageableTableOption.mapDispatchToProps,
)(RefreshPageableTableOption)
connected.refreshTable = RefreshPageableTableOption.refreshTable
export default connected
