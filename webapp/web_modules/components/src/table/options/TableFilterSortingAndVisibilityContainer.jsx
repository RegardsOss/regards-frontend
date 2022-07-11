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
import reduce from 'lodash/reduce'
import pick from 'lodash/pick'
import map from 'lodash/map'
import clone from 'lodash/clone'
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { CommonDomain } from '@regardsoss/domain'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import TableSelectionModes from '../model/TableSelectionModes'

/**
 * Container that provides table sorting, column visiblity & filters management
 * @author Théo
 * @author Léo
 */
export class TableFilterSortingAndVisibilityContainer extends React.Component {
  static propTypes = {
    // components children as a function, where this container will inject select all related properties
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // eslint-disable-next-line react/forbid-prop-types
    onApplyRefreshRequestParameters: PropTypes.func.isRequired,
    isPagePostFetching: PropTypes.bool,
    // from mapStateToProps
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDispatchToProps
    fetchPagedEntityList: PropTypes.func.isRequired,
    fetchPagedEntityListByPost: PropTypes.func.isRequired,

    // Others properties must be functions
    // This component will proxyfy them to inject the local onRefresh function as the last param
    // onSmthing: (param1) => {}
    // becomes for the children comp
    // onSmthing: (param1, onRefresh) => {}
  }

  static defaultProps = {
    isPagePostFetching: false,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE

  static COMPONENT_TYPE = {
    FILTER: 'FILTER',
    COMPONENT: 'COMPONENT',
  }

  /** List of locally consumed properties, others properties will be proxyfied to inject onRefresh function as the last param */
  static NON_REPORTED_PROPS = ['children', 'pageActions', 'pageSelectors', 'defaultFiltersState', 'pageMeta', 'fetchPagedEntityList', 'i18n', 'theme']

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  // eslint-disable-next-line react/forbid-prop-types
  static REQUEST_PARAMETERS_PROP_TYPE = PropTypes.object

  // eslint-disable-next-line react/forbid-prop-types
  static BODY_PARAMETERS_PROP_TYPE = PropTypes.object.isRequired

  // eslint-disable-next-line react/forbid-prop-types
  static COLUMN_VISIBILITY_PROP_TYPE = PropTypes.object

  // eslint-disable-next-line react/forbid-prop-types
  static FILTERS_PROP_TYPE = PropTypes.object.isRequired

  static DEFAULT_DATES_RESTRICTION_STATE = {
    [CommonDomain.REQUEST_PARAMETERS.AFTER]: null,
    [CommonDomain.REQUEST_PARAMETERS.BEFORE]: null,
  }

  static DEFAULT_VALUES_RESTRICTION_STATE = {
    [CommonDomain.REQUEST_PARAMETERS.MODE]: TableSelectionModes.INCLUDE,
    [CommonDomain.REQUEST_PARAMETERS.VALUES]: [],
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pageSelectors }) {
    return {
      pageMeta: pageSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { pageActions }) {
    return {
      fetchPagedEntityList: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(pageActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
      fetchPagedEntityListByPost: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(pageActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    }
  }

  state = {
    requestParameters: {},
    columnsSorting: [],
    /** columns visibility map (no assertion on child columns keys) */
    columnsVisibility: {}, // note: empty by default, when column isn't found it should be considered visible
  }

  getProxyfiedFunc = (newPropsToProxy) => (
    reduce(newPropsToProxy, (acc, newProp, key) => {
      acc[key] = (...params) => newProp(...params, this.onRefresh)
      return acc
    }, {})
  )

  onRefresh = () => {
    const { isPagePostFetching } = this.props
    const { requestParameters } = this.state
    const {
      pageMeta, fetchPagedEntityList, fetchPagedEntityListByPost,
    } = this.props
    const lastPage = (pageMeta && pageMeta.number) || 0
    const fetchPageSize = TableFilterSortingAndVisibilityContainer.PAGE_SIZE * (lastPage + 1)
    if (isPagePostFetching) {
      fetchPagedEntityListByPost(0, fetchPageSize, {}, { ...pick(requestParameters, 'sort') }, { ...omit(requestParameters, 'sort') })
    } else {
      fetchPagedEntityList(0, fetchPageSize, {}, { ...requestParameters })
    }
  }

  /**
   * User callbacker: user updated columns visibility (this container considers only columns keys)
   * @param {[{key, visible}]} updatedColumns updated columns
   */
  onChangeColumnsVisibility = (updatedColumns) => {
    this.setState({
      // map: associate each column key with its visible stae
      columnsVisibility: updatedColumns.reduce((acc, { key, visible }) => ({
        ...acc,
        [key]: visible,
      }), {}),
    })
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  buildSortURL = (columnsSorting) => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${TableFilterSortingAndVisibilityContainer.COLUMN_ORDER_TO_QUERY[order]}`)

  onSort = (columnSortKey, order) => {
    const { columnsSorting, requestParameters } = this.state

    const columnIndex = columnsSorting.findIndex(({ columnKey }) => columnSortKey === columnKey)
    const newColumnSorting = clone(columnsSorting)
    if (order === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
      newColumnSorting.splice(columnIndex, 1)
    } else if (columnIndex === -1) {
      newColumnSorting.push({ columnKey: columnSortKey, order })
    } else {
      newColumnSorting.splice(columnIndex, 1, { columnKey: columnSortKey, order })
    }
    const newSort = this.buildSortURL(newColumnSorting)
    const newState = {
      columnsSorting: newColumnSorting,
      requestParameters: {
        ...requestParameters,
        sort: newSort,
      },
    }
    this.setState(newState)
    this.buildExternalRefreshParameters(newState.requestParameters)
  }

  updateRequestParameters = (filters) => {
    const { requestParameters } = this.state
    const newRequestParameters = {
      ...pick(requestParameters, 'sort'),
      ...filters,
    }
    const newState = {
      requestParameters: newRequestParameters,
    }
    this.setState(newState)
    this.buildExternalRefreshParameters(newState.requestParameters)
  }

  /**
   * Enable to propagate requestParameters to upper component in order to use refresh functionnality
   * @param {*} sort
   * @param {*} filters
   */
  buildExternalRefreshParameters = (requestParameters) => {
    const { onApplyRefreshRequestParameters } = this.props
    onApplyRefreshRequestParameters(requestParameters)
  }

  render() {
    const { children, isPagePostFetching } = this.props
    const {
      requestParameters,
      columnsVisibility,
    } = this.state
    const newPropsToProxy = omit(this.props, TableFilterSortingAndVisibilityContainer.NON_REPORTED_PROPS)
    // render only the childrens
    return (
      React.Children.map(children, (child) => {
        if (child.key === TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT) {
          return React.cloneElement(child, {
            ...child.props,
            ...this.getProxyfiedFunc(newPropsToProxy),
            onRefresh: this.onRefresh,
            onChangeColumnsVisibility: this.onChangeColumnsVisibility,
            getColumnSortingData: this.getColumnSortingData,
            onSort: this.onSort,
            pageSize: TableFilterSortingAndVisibilityContainer.PAGE_SIZE,
            requestParameters: isPagePostFetching ? pick(requestParameters, 'sort') : requestParameters,
            bodyParameters: isPagePostFetching ? omit(requestParameters, 'sort') : {},
            columnsVisibility,
          })
        } if (child.key === TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER) {
          return React.cloneElement(child, {
            ...child.props,
            updateRequestParameters: this.updateRequestParameters,
          })
        }
        return null
      })
    )
  }
}
export default connect(
  TableFilterSortingAndVisibilityContainer.mapStateToProps, TableFilterSortingAndVisibilityContainer.mapDispatchToProps,
)(TableFilterSortingAndVisibilityContainer)
