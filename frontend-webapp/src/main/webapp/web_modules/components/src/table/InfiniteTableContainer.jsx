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
import fill from 'lodash/fill'
import isEmpty from 'lodash/isEmpty'
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

const allWidthStyles = { width: '100%' }

/**
 * Fixed data table from facebook library integrated with material ui theme
 * and infinite scroll functionality.
 * Should be integrated in a TableLayout component for UI uniformity
 *
 * The FixedDataTable from facebook library, use an array with all elements to display.
 * If X is the number of elements visible in the table, so 3*X elements are present in the DOM.
 * There is X elements cached before the first visible element and X elements cached after the last
 * visible element.
 *
 * To manage the infinite scroll:
 * 1. Initialize an array with empty objects with N empty objects where N=total number of elements.
 * 2. Initialize first search by running a request to the server from index 0 with 3*X elements per page. Where
 * X is the number of visible elements in the table. (Configurable with the pagesize props).
 * 3. After each scroll end, this class run a request to the server
 * to retrieve 3*X elements after the first missing entity index around the current first visible index.
 * 4. FixedDataTable, display the object from the array with the current visible indexes
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

    // Customize state display
    emptyComponent: PropTypes.element,
    loadingComponent: PropTypes.element,

    // Request page size
    queryPageSize: PropTypes.number,

    // abstracted properties: result of a parent selector
    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.arrayOf(PropTypes.object),
    entitiesFetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    pageMetadata: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

    // [Optional] server request parameters as query params or path params defined in the PageActions given.
    // eslint-disable-next-line
    requestParams: PropTypes.object, // used in onPropertiesUpdate, uknown shape, depends on consumer

    // INNER TABLE API (will be provided by adequate parents)

    // functions to fetch/flush entities and select them in redux store
    // fetch entities: (pageIndex:{number}, pageSize:{number}, requestParams:{object, as provided to this component}) => ()
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired, // flush entities: () => ()
    // eslint-disable-next-line react/no-unused-prop-types
    flushSelection: PropTypes.func.isRequired, // flush selection: () => ()

    // from map state to props

    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape, // authentication data, used to refetch on authentication change
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    queryPageSize: 20,
    loadingComponent: <TableContentLoadingComponent />,
  }

  static DEFAULT_STATE = {
    entities: [],
    allColumns: [],
    tableWidth: 0,
  }

  static MAX_NB_ENTITIES = 10000 //TODO-V2 remove when catalog limit gets removed

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

    // initialization or authentication update: fetch the first page
    if (!isEqual(nextProps.requestParams, previousProps.requestParams) ||
      !isEqual(nextProps.authentication, previousProps.authentication)) {
      // remove any previously fetched data
      nextState.entities = []
      // Remove entities in store
      this.flushEntities(nextProps)
      // Fetch new ones
      this.fetchEntityPage(nextProps)
    }


    // New entities retrieved
    if (!isEqual(previousProps.entities, nextProps.entities) || !isEqual(previousProps.pageMetadata, nextProps.pageMetadata)) {
      // 1 - update row entities
      if (nextProps.pageMetadata) {
        const totalCountOfElements = this.getTotalNumberOfResults(nextProps)
        // 1.A - build page index in entities
        const firstPageElementIndex = nextProps.pageMetadata.number * nextProps.pageMetadata.size
        const lastPageElementIndex = firstPageElementIndex + nextProps.entities.length
        // 1.B - rebuild elements before page, saving all defined elements
        let entitiesElementsBeforePage = []
        const oldEntities = (previousState.entities || [])
        if (firstPageElementIndex > 0) {
          const restoredCount = Math.min(oldEntities.length, firstPageElementIndex)
          const unexistingCount = firstPageElementIndex - restoredCount
          entitiesElementsBeforePage = [
            ...(restoredCount ? oldEntities.slice(0, restoredCount) : []),
            ...fill(Array(unexistingCount), InfiniteTableContainer.EMPTY_OBJECT),
          ]
        }
        // 1.C - rebuild elements after page, except when page total count changed (that marks some items were deleted)
        const oldTotalCountOfElements = previousProps ? this.getTotalNumberOfResults(previousProps) : 0
        let entitiesElementsAfterPage
        if (totalCountOfElements !== oldTotalCountOfElements) {
          // rebuilt to erase old fetch (check total elements are not less than one page)
          const missingCount = Math.max(totalCountOfElements - lastPageElementIndex, 0)
          entitiesElementsAfterPage = fill(Array(missingCount), InfiniteTableContainer.EMPTY_OBJECT)
        } else {
          // extracted (as much as possible).
          entitiesElementsAfterPage = oldEntities.slice(lastPageElementIndex, totalCountOfElements)
        }

        // 1.D - build new entities buffer from previous elements. Always clear following elements to handle the suppression cases
        // Invariant: those elements must always have a length of totalCountOfElements
        nextState.entities = [
          ...entitiesElementsBeforePage,
          // page
          ...nextProps.entities,
          ...entitiesElementsAfterPage,
        ]

        // 1.E - clear transient pages loading states
        this.onReceivePageFetch(nextProps.pageMetadata.number, nextProps.pageMetadata.size)
      }
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
    // the scroll offset is the first element to fetch if it is missing
    const defaultLineHeight = this.context.muiTheme['components:infinite-table'].lineHeight
    const { lineHeight = defaultLineHeight, queryPageSize, displayedRowsCount } = this.props
    const { entities } = this.state
    // create or extract the loading state transient value on instance: this is used to avoid fetching multiple times
    // entities that are  currently fetched
    const firstVisibleIndex = Math.floor(scrollEndOffset / lineHeight)
    // cut any request that could be outside the entities range
    if (firstVisibleIndex >= entities.length) {
      return
    }
    // build last page / visible page index, ensure it will still be in results range
    const consideredPageSize = Math.max(displayedRowsCount || this.context.muiTheme['components:infinite-table'].rowCount, queryPageSize)
    const lastVisibleIndex = Math.min(firstVisibleIndex + consideredPageSize, entities.length - 1)

    // compute missing index in entities
    let firstMissingIndex = null
    let lastMissingIndex = null
    for (let index = firstVisibleIndex; index <= lastVisibleIndex; index += 1) {
      const isMissing = isEmpty(entities[index])
      if (isMissing) {
        firstMissingIndex = firstMissingIndex || index // min index: change only on first time
        lastMissingIndex = index // max: use max undefined found
      }
    }
    if (firstMissingIndex) {
      // there are missing elements, prepare custom fetch data (fetch a right page size here)
      const firstPageNumber = Math.floor(firstMissingIndex / consideredPageSize)
      const lastPageNumber = Math.floor(lastMissingIndex / consideredPageSize)
      const pageSize = (lastPageNumber - firstPageNumber + 1) * consideredPageSize
      this.fetchEntityPage(this.props, firstPageNumber, pageSize)
    }
  }

  /**
   * Called when component is resized, to force the inner table implementation at same width
   */
  onComponentResized = ({ width }) => {
    this.setState({ tableWidth: width })
  }

  /**
   * Returns true if page fetch can be startstarts a page fetch or retu
   * @param pageNumber page number
   * @param pageSize  page size
   * @return true if page can be fetched
   */
  onStartPageFetch = (pageNumber, pageSize) => {
    const previousFetchingPages = this.fetchingPages || []
    this.fetchingPages = [...previousFetchingPages]
    const realPagesCount = pageSize / this.props.queryPageSize

    // mark pages as fetching
    for (let page = pageNumber; page < pageNumber + realPagesCount; page += 1) {
      if (!this.fetchingPages.includes(page)) {
        this.fetchingPages.push(page)
      }
    }
    // if the pages were modified, then we can update it and let fetch be performed (we added new pages)
    return !isEqual(this.fetchingPages, previousFetchingPages)
  }

  /**
   * Marks a page was fetched (removes loading state)
   * @param pageNumber page number
   * @param pageSize  page size
   */
  onReceivePageFetch = (pageNumber, pageSize) => {
    const realPagesCount = pageSize / this.props.queryPageSize
    this.fetchingPages = (this.fetchingPages || []).filter(n => n < pageNumber || n > pageNumber + realPagesCount)
  }

  /**
   * Returns total number of results from page metadata as props
   * @param props component properties
   */
  getTotalNumberOfResults = (props) => {
    const total = get(props || this.props, 'pageMetadata.totalElements') || 0
    return Math.min(InfiniteTableContainer.MAX_NB_ENTITIES, total)
  }

  /**
   selection if any data)
   * @param {flushEntities:{func}} props component props to use
   */
  flushEntities = ({ flushEntities, flushSelection }) => {
    flushEntities()
    // clear selection (if there is a selection model)
    flushSelection()
  }

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   * @param {number} customPageSize custom page size or undefined (optional, defaults to queryPageSize)
   */
  fetchEntityPage = ({ fetchEntities, requestParams, queryPageSize }, pageNumber = 0, customPageSize) => {
    const actualPageSize = customPageSize || queryPageSize
    if (this.onStartPageFetch(pageNumber, actualPageSize)) {
      fetchEntities(pageNumber, actualPageSize, requestParams)
    }
  }

  render() {
    const { displayColumnsHeader, lineHeight, displayedRowsCount, columns, entitiesFetching,
      loadingComponent, emptyComponent } = this.props
    const { tableWidth, entities } = this.state // cached render entities
    const actualLineHeight = lineHeight || this.context.muiTheme['components:infinite-table'].lineHeight
    const actualRowCount = displayedRowsCount || this.context.muiTheme['components:infinite-table'].rowCount
    const totalElements = this.getTotalNumberOfResults()

    return (
      <Measure onMeasure={this.onComponentResized}>
        <div style={allWidthStyles}>
          <LoadableContentDisplayDecorator
            isLoading={!totalElements && entitiesFetching} // Display only the initial loading state to avoid resetting user scroll
            loadingComponent={loadingComponent}
            isEmpty={!totalElements}
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

