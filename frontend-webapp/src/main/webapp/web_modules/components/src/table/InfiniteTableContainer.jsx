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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import Measure from 'react-measure'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-manager'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import TableColumnConfiguration from './content/columns/model/TableColumnConfiguration'
import TableContentLoadingComponent from './content/TableContentLoadingComponent'
import Table from './content/Table'

import './styles/fixed-data-table-mui.css'

/** Exports default page size for inner use */
export const DEFAULT_PAGE_SIZE = 20

const allWidthStyles = { width: '100%' }

/**
 * Infinite table container:
 * Wraps fixed data table into regardsoss adapted component.
 * This component can either:
 * - Be used with pageable actions (or directly using PageableInfiniteTableContainer), to show pages one after the other
 * - Be used with a fixed list of entities (when entity list changes, the page index is considered as new list start index,
 * meaning entities can be inserted in list or replacing current list)
 *
 * Please note that the component changes sub components context to provides his fetch method: this allows any sub element (including
 * cells) to use through context the TableContext elements
 *
 * @author Sébastien Binda
 */
class InfiniteTableContainer extends React.Component {
  /**
   * PageActions : BasicPageableActions of the entities to manage
   * PageSelector : BasicPageableSelectors of the entities to manage
   * pageSize : Optional, number of visible entity into the table. Default 20.
   */
  static propTypes = {
    // MAIN TABLE API

    // table configuration properties
    displayColumnsHeader: PropTypes.bool,
    lineHeight: PropTypes.number, // defaults to theme when not provided
    displayedRowsCount: PropTypes.number, // default to theme when not provided
    columns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,
    // configures when the loading should start when user scrolls in page: this is a number in ]0; 1[ standing for
    // "after half", "after 2/3" (default), ... Adapt it to your queryPageSize
    loadAtPagePoint: PropTypes.number,
    // Customize state display
    emptyComponent: PropTypes.element,
    loadingComponent: PropTypes.element,

    // Request page size
    queryPageSize: PropTypes.number,

    // abstracted properties: result of a parent selector
    entities: PropTypes.arrayOf(PropTypes.object),
    // page index of entities in results (change it to handle next/previous pages)
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesPageIndex: PropTypes.number,
    entitiesFetching: PropTypes.bool,
    // total entities count, including those not yet fetched. When no provided, the table won't auto fetch next pages
    entitiesCount: PropTypes.number,

    // [Optional] server request end path parameters (sends undefined if not provided)
    // eslint-disable-next-line
    requestParams: PropTypes.object, // used in onPropertiesUpdate, uknown shape, depends on consumer
    // eslint-disable-next-line
    pathParams: PropTypes.object, // used in onPropertiesUpdate, uknown shape, depends on consumer

    // INNER TABLE API (will be provided by adequate parents)

    // functions to fetch/flush entities and select them in redux store
    // fetch entities: (pageIndex:{number}, pageSize:{number}, pathParams: {from props}, requestParams: {from props}) => ()
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
    loadingComponent: <TableContentLoadingComponent />,
    // by default we consider here that provided entities starts at 0
    entitiesPageIndex: 0,
  }

  static DEFAULT_STATE = {
    entities: [],
    entitiesCount: 0, // inhibits he pageable behavior
    allColumns: [],
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
    if (isAutoControlled &&
      (!isEqual(nextProps.requestParams, previousProps.requestParams) ||
        !isEqual(nextProps.pathParams, previousProps.pathParams) ||
        !isEqual(nextProps.authentication, previousProps.authentication))) {
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
      const defaultLineHeight = this.context.muiTheme['components:infinite-table'].lineHeight
      const { lineHeight = defaultLineHeight, queryPageSize } = this.props

      // when the last visible index is at 2/3 of the last loaded page, start loading next page
      const firstVisibleIndex = Math.floor(scrollEndOffset / lineHeight)
      const actualRowCount = this.props.displayedRowsCount || this.context.muiTheme['components:infinite-table'].rowCount
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
  onComponentResized = ({ width }) => {
    this.setState({ tableWidth: width })
  }

  /**
   * @return the number of entities to consider (subset of total or total itself)
   */
  getCurrentTotalEntities = () => Math.max(this.props.entitiesCount || 0, (this.props.entities || []).length)

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
    fetchEntities, pathParams, requestParams, queryPageSize,
  }, pageNumber = 0) => {
    if (fetchEntities) {
      fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)
    }
  }

  render() {
    const {
      displayColumnsHeader, lineHeight, displayedRowsCount, columns, entitiesFetching,
      loadingComponent, emptyComponent,
    } = this.props
    const { tableWidth = 0, entities } = this.state // cached render entities
    const actualLineHeight = lineHeight || this.context.muiTheme['components:infinite-table'].lineHeight
    const actualRowCount = displayedRowsCount || this.context.muiTheme['components:infinite-table'].rowCount

    const currentTotalEntities = this.getCurrentTotalEntities()
    return (
      <Measure onMeasure={this.onComponentResized}>
        <div style={allWidthStyles}>
          <LoadableContentDisplayDecorator
            isLoading={!currentTotalEntities && entitiesFetching} // Display only the initial loading state to avoid resetting user scroll
            loadingComponent={loadingComponent}
            isEmpty={!currentTotalEntities}
            emptyComponent={emptyComponent}
          >
            <Table
              displayColumnsHeader={displayColumnsHeader}
              lineHeight={actualLineHeight}
              displayedRowsCount={actualRowCount}

              entities={entities}
              onScrollEnd={this.onScrollEnd}
              columns={columns}
              width={tableWidth}
            />
          </LoadableContentDisplayDecorator>
        </div >
      </Measure >
    )
  }
}

const mapStateToProps = (state, { pageSelectors }) => ({
  // authentication, mapped to reload entities on changes
  authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
})

export default connect(mapStateToProps)(InfiniteTableContainer)

