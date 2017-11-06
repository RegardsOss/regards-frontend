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
import flow from 'lodash/flow'
import get from 'lodash/get'
import map from 'lodash/map'
import fill from 'lodash/fill'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-manager'
import { withI18n } from '@regardsoss/i18n'
import TableResponsiveManager from './TableResponsiveManager'
import TableSelectionModes from './model/TableSelectionModes'
import TableConfigurationModel from './content/model/TableConfigurationModel'
import ColumnConfigurationModel from './content/columns/model/ColumnConfiguration'
import TableActions from './model/TableActions' // class for prop type
import { TableSelectors } from './model/TableSelectors' // class for prop type
import { PAGE_SIZE_MULTIPLICATOR } from './model/TableConstant'
import styles from './styles/styles'
import './styles/fixed-data-table-mui.css'
import messages from './i18n'

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
    // table configuration
    tableConfiguration: PropTypes.shape(TableConfigurationModel).isRequired,
    // [Optional] Size of a given table page. Default is 20 visible items in the table.
    pageSize: PropTypes.number,
    // [Optional] Columns configurations. see ColumnConfigurationModel
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.arrayOf(ColumnConfigurationModel), // used in states updates

    // Table selection connectors (optionals)
    // eslint-disable-next-line react/no-unused-prop-types
    tableActions: PropTypes.instanceOf(TableActions), // Table actions instance, used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    tableSelectors: PropTypes.instanceOf(TableSelectors), // Table selectors instance, used in onPropertiesUpdate

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

    // functions to fetch/flush entities and select them in redux store
    // fetch entities: (pageIndex:{number}, pageSize:{number}, requestParams:{object, as provided to this component}) => ()
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired, // used in onPropertiesUpdate
    // flush entities: () => ()
    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired, // used in onPropertiesUpdate
    // [Optional] server request parameters as query params or path params defined in the PageActions given.
    // eslint-disable-next-line
    requestParams: PropTypes.object, // used in onPropertiesUpdate, uknown shape, depends on consumer

    // from map state to props
    // authentication data
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape,
    // selection data
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,

    // from map dispatch to props

    // selection
    toggleRowSelection: PropTypes.func.isRequired,
    dispatchSelectAll: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
    // Customize
    emptyComponent: PropTypes.element,

  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    pageSize: 20,
  }

  static DEFAULT_STATE = {
    entities: [],
    allColumns: [],
    allSelected: false,
    fetchedPages: [],
  }

  static MAX_NB_ENTITIES = STATIC_CONF.CATALOG_MAX_NUMBER_OF_ENTITIES || 10000
  static EMPTY_ENTITY_VALUE = {}

  constructor(props) {
    super(props)
    this.nbEntitiesByPage = this.props.pageSize * PAGE_SIZE_MULTIPLICATOR
    this.state = InfiniteTableContainer.DEFAULT_STATE
    // TODO-V2 update when 10 000 limit is removed
    this.lastPageAvailable = Math.floor(InfiniteTableContainer.MAX_NB_ENTITIES / this.nbEntitiesByPage)
    if (((this.lastPageAvailable * this.nbEntitiesByPage) + this.nbEntitiesByPage) > InfiniteTableContainer.MAX_NB_ENTITIES) {
      this.lastPageAvailable = this.lastPageAvailable - 1
    }
    this.maxRowCounts = this.lastPageAvailable * this.nbEntitiesByPage
    this.fetchedPages = []
  }

  componentDidMount = () => this.onPropertiesUpdate({}, this.props)

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
      // Remove index of fectced pages
      this.fetchedPages = []
      // clear selection (if there is a selection model)
      nextProps.flushSelection()
      // Remove entities in store
      this.flushEntityPages(nextProps)
      // Fetch new ones
      this.fetchEntityPages(nextProps)
    }


    // New entities retrieved
    if (!isEqual(previousProps.entities, nextProps.entities) || !isEqual(previousProps.pageMetadata, nextProps.pageMetadata)) {
      // 1 - update row entities
      if (nextProps.pageMetadata) {
        const previousElements = previousState.entities
        const previousEltsCount = previousElements ? previousState.entities.length : 0
        // The page
        const firstPageElementIndex = nextProps.pageMetadata.number * nextProps.pageMetadata.size
        const lastKeepedElementIndex = Math.min(firstPageElementIndex, previousEltsCount)
        // convert received page
        const newElementsTotalCount = this.getTotalNumberOfResults(nextProps)
        // the number of elements that we'll throw away
        const numberOfResetElements = newElementsTotalCount - (lastKeepedElementIndex + nextProps.entities.length)

        nextState.entities = [
          // recover elements from the previous state (less the one removed)
          ...(previousElements || []).slice(0, lastKeepedElementIndex),

          // We add the current page elements
          ...nextProps.entities,

          // clear all following elements (suppression may shift next pages ) after the current page :
          // ==> these elements will be reloaded on scroll
          ...fill(Array(numberOfResetElements), InfiniteTableContainer.EMPTY_ENTITY_VALUE),
        ]
      }
      // 2 - build columns for state
      nextState.allColumns = this.computeAllColumns(nextProps, nextState.entities)
    } else if (!isEqual(previousProps.columns, nextProps.columns)) {
      nextState.allColumns = this.computeAllColumns(nextProps, nextState.entities)
    }
    // always update the all selected state
    nextState.allSelected = this.computeAllSelected(nextProps)

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
    const { tableConfiguration: { lineHeight = defaultLineHeight } } = this.props
    const originalIndex = scrollEndOffset / lineHeight
    const index = Math.floor(originalIndex)

    const HALF_FETCHED = (PAGE_SIZE_MULTIPLICATOR - 1) / 2

    const pageNumber = Math.round(index / this.nbEntitiesByPage)

    const firstIndexToRetrieve = index - (this.props.pageSize * HALF_FETCHED)
    const lastIndexToRetrieve = index + (this.props.pageSize * HALF_FETCHED)

    const firstIndexFetched = pageNumber * this.nbEntitiesByPage
    const lastIndexFetched = firstIndexFetched + this.nbEntitiesByPage

    // Compute the pages to fetch
    const pages = []
    if (pageNumber > this.lastPageAvailable) {
      pages.push(this.lastPageAvailable)
    } else {
      pages.push(pageNumber)
      if ((index < firstIndexFetched || firstIndexFetched < firstIndexToRetrieve) && pageNumber > 0) {
        pages.push(pageNumber - 1)
      } else if ((index > lastIndexFetched) || (lastIndexToRetrieve > lastIndexFetched)) {
        if (pageNumber < this.lastPageAvailable) {
          pages.push(pageNumber + 1)
        }
      }
    }
    this.fetchEntityPages(this.props, pages)
  }


  /**
   * On user row selection (switches selection state for row index)
   * @param rowIndex row index
   */
  onToggleRowSelection = (rowIndex) => {
    // retrieve entity by its index in state
    const { entities } = this.state
    const { toggleRowSelection } = this.props
    if (entities.length > rowIndex) { // silent errors here, as the component can be currently refetching
      toggleRowSelection(rowIndex, entities[rowIndex])
    }
  }

  /**
   * On user toggled select all / unselect all
   */
  onToggleSelectAll = () => {
    const { dispatchSelectAll, dispatchUnselectAll } = this.props
    if (this.state.allSelected) {
      dispatchUnselectAll()
    } else {
      dispatchSelectAll()
    }
  }

  getTotalNumberOfResults = (props) => {
    const total = get(props || this.props, 'pageMetadata.totalElements') || 0
    return total > InfiniteTableContainer.MAX_NB_ENTITIES ? InfiniteTableContainer.MAX_NB_ENTITIES : total
  }

  /**
   * Flushes entities using property method
   * @param {flushEntities:{func}} props component props to use
   */
  flushEntityPages = ({ flushEntities }) => {
    this.fetchedPages = []
    flushEntities()
  }

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {[number]} pageNumbers number of each page to fetch
   */
  fetchEntityPages = ({ fetchEntities, requestParams }, pageNumbers = [0]) => {
    pageNumbers.forEach((pageIndex) => {
      if (!this.fetchedPages.includes(pageIndex)) {
        this.fetchedPages.push(pageIndex)
        fetchEntities(pageIndex, this.nbEntitiesByPage, requestParams)
      }
    })
  }

  /**
   * Return columns to use (cached in state)
   * @param properties properties to consider
   * @param entities state entities to consider
   * @returns {Array}
   */
  computeAllColumns = (properties, entities) => {
    // predefined columns
    const { columns } = properties
    if (columns && columns.length > 0) {
      return columns
    }

    // compute dynamic columns
    if (entities && entities.length) {
      const entity = entities[0]
      return map(entity.content, (attr, key) => ({ attributes: [key], label: key }))
    }
    return []
  }

  /**
   * Are all rows selected?  (cached in state)
   * @param properties
   * @return true if all rows are selected
   */
  computeAllSelected = (properties) => {
    const { selectionMode, toggledElements } = properties
    const totalElements = this.getTotalNumberOfResults(properties)
    const selectionSize = keys(toggledElements).length
    // selectionSize > 0 blocks initial fetching case
    return (selectionMode === TableSelectionModes.includeSelected && selectionSize === totalElements && selectionSize > 0) ||
      (selectionMode === TableSelectionModes.excludeSelected && selectionSize === 0)
  }


  render() {
    const defaultLineHeight = this.context.muiTheme['components:infinite-table'].lineHeight
    const { entitiesFetching, pageSize, pageMetadata, toggledElements, selectionMode,
      tableConfiguration: { lineHeight = defaultLineHeight, ...tableConfiguration },
      emptyComponent,
    } = this.props
    const { entities, allSelected, allColumns } = this.state // cached render data

    // pre render table data (the responsive manager doesn't need that knowledge)
    const tableData = {
      allSelected,
      pageSize,
      onScrollEnd: this.onScrollEnd,
      columns: allColumns,
      entities,
      lineHeight,
      maxRowCounts: this.maxRowCounts,
      selectionMode,
      toggledElements,
      // from user API
      ...tableConfiguration,
      // callbacks
      onToggleRowSelection: this.onToggleRowSelection,
      onToggleSelectAll: this.onToggleSelectAll,
    }


    return (
      <TableResponsiveManager
        entitiesFetching={entitiesFetching}
        resultsCount={pageMetadata ? pageMetadata.totalElements : 0}
        emptyComponent={emptyComponent}
        tableData={tableData}
      />)
  }
}

const mapStateToProps = (state, { pageSelectors, tableSelectors }) => ({
  // authentication, mapped to reload on changes
  authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
  // selection
  toggledElements: tableSelectors ? tableSelectors.getToggledElements(state) : {},
  selectionMode: tableSelectors ? tableSelectors.getSelectionMode(state) : TableSelectionModes.includeSelected,
})

const mapDispatchToProps = (dispatch, { pageActions, tableActions }) => ({
  // keep optional callbacks but stub them when the client is not provided
  toggleRowSelection: (rowIndex, entity) => tableActions && dispatch(tableActions.toggleElement(rowIndex, entity)),
  dispatchSelectAll: () => tableActions && dispatch(tableActions.selectAll()),
  dispatchUnselectAll: () => tableActions && dispatch(tableActions.unselectAll()),
  flushSelection: () => tableActions && dispatch(tableActions.unselectAll()),
})

export default flow(
  withModuleStyle({ styles }),
  withI18n(messages),
  connect(mapStateToProps, mapDispatchToProps),
)(InfiniteTableContainer)

