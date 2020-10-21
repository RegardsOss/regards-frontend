/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Measure } from '@regardsoss/adapters'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-utils'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { TableColumnConfiguration } from './content/columns/model/TableColumnConfiguration'
import Table from './content/Table'

import './styles/fixed-data-table-mui.css'

/** Exports default page size for inner use */
export const DEFAULT_PAGE_SIZE = 20

/**
 * Infinite table container:
 * Wraps fixed data table into regardsoss adapted component.
 * This component can either:
 * - Be used with pageable actions (or directly using PageableInfiniteTableContainer), to show pages one after the other
 * - Be used with a fixed list of entities (when entity list changes, the page index is considered as new list start index,
 * meaning entities can be inserted in list or replacing current list)
 *
 * Note: this component can be placed in a flex layout to grow automatically (not using min and max row count) or can have fixed height (using min AND/OR max row count)
 *
 * @author Sébastien Binda
 */
class InfiniteTableContainer extends React.Component {
  /**
   * pageSize : Optional, number of visible entity into the table. Default 20.
   */
  static propTypes = {
    // MAIN TABLE API

    // table configuration properties
    displayColumnsHeader: PropTypes.bool,
    lineHeight: PropTypes.number, // defaults to theme when not provided
    stripeRows: PropTypes.bool,
    // Min and max row count: when not specified, the table attempts to auto fit the available height
    minRowCount: PropTypes.number,
    maxRowCount: PropTypes.number,

    columns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,
    // configures when the loading should start when user scrolls in page: this is a number in ]0; 1[ standing for
    // "after half", "after 2/3" (default), ... Adapt it to your queryPageSize
    loadAtPagePoint: PropTypes.number,
    // Customize state display
    emptyComponent: PropTypes.element,

    // Request page size
    queryPageSize: PropTypes.number,

    // abstracted properties: result of a parent selector
    entities: PropTypes.arrayOf(PropTypes.any),
    // page index of entities in results (change it to handle next/previous pages)
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesPageIndex: PropTypes.number,
    entitiesFetching: PropTypes.bool,
    // total entities count, including those not yet fetched. When no provided, the table won't auto fetch next pages
    entitiesCount: PropTypes.number,

    // [Optional] server request end path parameters (sends undefined if not provided)
    pathParams: CommonShapes.RequestParameters,
    requestParams: CommonShapes.RequestParameters,
    bodyParams: CommonShapes.JSONObject,

    // INNER TABLE API (will be provided by adequate parents)

    // functions to fetch/flush entities and select them in redux store
    // fetch entities: (pageIndex:{number}, pageSize:{number}, pathParams: {from props}, requestParams: {from props}, bodyParams: {from props}}) => ()
    // when fetchEntities is not provided, table is considered as externally controlled
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func, // flush entities: () => ()
    // eslint-disable-next-line react/no-unused-prop-types
    flushSelection: PropTypes.func, // flush selection: () => ()

    // from map state to props

    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape, // authentication data, used to refetch on authentication change
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    loadAtPagePoint: 2 / 3,
    queryPageSize: 20,
    // by default we consider here that provided entities starts at 0
    entitiesPageIndex: 0,
    displayColumnsHeader: true,
  }

  static DEFAULT_STATE = {
    entities: [],
    entitiesCount: 0, // inhibits he pageable behavior
    allColumns: [],
    tableHeight: 1,
    measuredHeight: 1,
    tableWidth: 1,
  }

  /** Initialize state */
  componentWillMount = () => this.setState(InfiniteTableContainer.DEFAULT_STATE)

  /** Update state from props */
  componentDidMount = () => this.onPropertiesUpdate({}, this.props)

  /** Update state from props */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdate(this.props, nextProps)

  /**
   * Updates state and runs fetches required on properties change
   */
  onPropertiesUpdate = (previousProps, nextProps) => {
    const previousState = this.state
    const nextState = this.state ? { ...this.state } : { ...InfiniteTableContainer.DEFAULT_STATE } // initialize to previous state or use default one

    // initialization or authentication update: fetch the first page if table is dynamic
    const isAutoControlled = nextProps.fetchEntities
    if (isAutoControlled
      && (!isEqual(nextProps.requestParams, previousProps.requestParams)
        || !isEqual(nextProps.pathParams, previousProps.pathParams)
        || !isEqual(nextProps.bodyParams, previousProps.bodyParams)
        || !isEqual(nextProps.authentication, previousProps.authentication))) {
      // remove any previously fetched data
      nextState.entities = []
      // Remove entities in store CONSIDERING CURRENT STATE (and not next state fetch method)
      this.flushEntities()
      // Fetch new ones
      this.fetchEntityPage(nextProps)
    } else if (!isEqual(previousProps.entities, nextProps.entities) || nextState.entities.length < get(nextProps, 'entities.length', 0)) {
      // update row entities (add new one to previously known ones)
      const firstReloadingIndex = nextProps.entitiesPageIndex * nextProps.queryPageSize
      const oldEntities = (previousState.entities || []).slice()
      const restoredEntities = oldEntities.slice(0, Math.min(oldEntities.length, firstReloadingIndex))
      nextState.entities = [...restoredEntities, ...nextProps.entities]
    }

    // when min / max row count or entities total changes, update the table height (for not auto control cases)
    if (previousProps.minRowCount !== nextProps.minRowCount
      || previousProps.maxRowCount !== nextProps.maxRowCount
      || get(this.state, 'entities.length', 0) !== nextState.entities.length) {
      nextState.tableHeight = this.computeTableHeight(nextProps.minRowCount,
        nextProps.maxRowCount, nextState.measuredHeight, nextState.entities)
    }

    if (!isEqual(previousState, nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * After each scroll end retrieve missing entities
   * @param scrollStartOffset
   * @param scrollEndOffset
   */
  onScrollEnd = (scrollStartOffset, scrollEndOffset) => {
    const { entities } = this.state

    // Is table incomplete? (prevent fetching when already in progress)
    if (entities.length < this.getCurrentTotalEntities() && !this.props.entitiesFetching) {
      // The table is not yet complete, check if we should fetch
      // the scroll offset is the first element to fetch if it is missing

      // const defaultLineHeight = tableTheme.lineHeight
      const { queryPageSize, displayColumnsHeader } = this.props
      const lineHeight = this.getTableLineHeight()

      // when the last visible index is at 2/3 of the last loaded page, start loading next page
      const firstVisibleIndex = Math.floor(scrollEndOffset / lineHeight)
      const headerHeight = displayColumnsHeader ? this.context.muiTheme.components.infiniteTable.minHeaderRowHeight : 0
      const actualRowCount = (this.state.tableHeight - headerHeight) / lineHeight
      const lastVisibleIndex = firstVisibleIndex + actualRowCount
      const totalPages = Math.floor(entities.length / queryPageSize)

      // consider only the ratio on the last page
      const inPageIndex = lastVisibleIndex - ((totalPages - 1) * queryPageSize)
      const inPageRatio = inPageIndex / queryPageSize
      if (inPageRatio > this.props.loadAtPagePoint) {
        const nextPage = Math.ceil(lastVisibleIndex / queryPageSize)
        this.fetchEntityPage(this.props, nextPage)
      }
    }
  }

  /**
   * Called when component is resized, to force the inner table implementation at same width
   */
  onComponentResized = ({ measureDiv: { height, width } }) => {
    this.setState({
      measuredHeight: height,
      tableHeight: this.computeTableHeight(this.props.minRowCount, this.props.maxRowCount, height, this.state.entities),
      tableWidth: width,
    })
  }

  /**
   * @return {number} the number of entities to consider (subset of total or total itself)
   */
  getCurrentTotalEntities = () => Math.max(this.props.entitiesCount || 0, (this.props.entities || []).length)

  /** @return {number} line height to consider for table */
  getTableLineHeight = () => this.props.lineHeight || this.context.muiTheme.components.infiniteTable.lineHeight

  /** @return {number} table header height to consider for table */
  getTableHeaderHeight = () => this.props.displayColumnsHeader
    ? this.context.muiTheme.components.infiniteTable.minHeaderRowHeight : 0

  /** @return {number} fixed content margin bottom, from theme */
  getContentMarginBottom = () => this.context.muiTheme.components.infiniteTable.fixedContentMarginBottom

  /**
   * Computes table height
   * @param {number} minRowCount the min row count set (or none)
   * @param {number} minRowCount the min row count set (or none)
   * @param {number} measuredHeight measured height
   * @param {[*]} entities entities
   * @return table height, taking in account the driven mode (min / max lines provided) and the auto size mode
   */
  computeTableHeight = (minRowCount, maxRowCount, measuredHeight, entities) => {
    if (minRowCount || maxRowCount) {
      // Min / max rows mode
      const consideredMin = minRowCount || 1
      const consideredMax = maxRowCount || 20
      const consideredLinesCount = Math.min(Math.max(consideredMin, entities.length), consideredMax)
      const contentViewHeight = (consideredLinesCount * this.getTableLineHeight()) + this.getTableHeaderHeight()
      return contentViewHeight + this.getContentMarginBottom()
    }
    // Self measured mode
    if (this.state.tableHeight > measuredHeight) {
      // XXX-WORKAROUND forces quick dimensioning when sizing down the table (avoid 5-10 seconds waiting...)
      return measuredHeight - 100
    }
    return measuredHeight
  }

  /**
   * Flushes current entities and selection if such methods exist
   */
  flushEntities = () => {
    const { flushEntities, flushSelection } = this.props
    if (flushEntities) {
      flushEntities()
    }
    if (flushSelection) {
      flushSelection()
    }
  }

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   */
  fetchEntityPage = ({
    fetchEntities, queryPageSize, pathParams, requestParams, bodyParams,
  }, pageNumber = 0) => {
    if (fetchEntities) {
      fetchEntities(pageNumber, queryPageSize, pathParams, requestParams, bodyParams)
    }
  }


  render() {
    const {
      displayColumnsHeader, stripeRows, columns,
      emptyComponent, entitiesCount,
    } = this.props
    const { tableHeight, tableWidth = 0, entities } = this.state // cached render entities
    const { moduleTheme: { containerStyle } } = this.context
    const currentTotalEntities = this.getCurrentTotalEntities()
    return (
      <Measure bounds onMeasure={this.onComponentResized}>
        {
          ({ bind }) => (
            <div style={containerStyle} {...bind('measureDiv')}>
              <LoadableContentDisplayDecorator
                isEmpty={!currentTotalEntities}
                emptyComponent={emptyComponent}
              >
                <Table
                  stripeRows={stripeRows}
                  displayColumnsHeader={displayColumnsHeader}
                  lineHeight={this.getTableLineHeight()}
                  entities={entities}
                  entitiesCount={entitiesCount}
                  onScrollEnd={this.onScrollEnd}
                  columns={columns}
                  height={tableHeight}
                  width={tableWidth}
                />
              </LoadableContentDisplayDecorator>
            </div>)
        }
      </Measure>)
  }
}

const mapStateToProps = state => ({
  // authentication, mapped to reload entities on changes
  authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
})

export default connect(mapStateToProps)(InfiniteTableContainer)
