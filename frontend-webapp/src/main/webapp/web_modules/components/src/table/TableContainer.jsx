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
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { withModuleStyle } from '@regardsoss/theme'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-manager'
import { withI18n } from '@regardsoss/i18n'
import TablePane from './TablePane'
import TableSelectionModes from './model/TableSelectionModes'
import TablePaneConfigurationModel from './model/TablePaneConfigurationModel'
import TableConfigurationModel from './content/model/TableConfigurationModel'
import ColumnConfigurationModel from './content/columns/model/ColumnConfiguration'
import TableActions from './model/TableActions' // class for prop type
import { TableSelectors } from './model/TableSelectors' // class for prop type
import { PAGE_SIZE_MULTIPLICATOR } from './model/TableConstant'
import styles from './styles/styles'
import './styles/fixed-data-table-mui.css'
import messages from './i18n'

const defaultLineHeight = 42

/**
 * Fixed data table from facebook library integrated with material ui theme
 * and infinite scroll functionality.
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
class TableContainer extends React.Component {

  /**
   * PageActions : BasicPageableActions of the entities to manage
   * PageSelector : BasicPageableSelectors of the entities to manage
   * pageSize : Optional, number of visible entity into the table. Default 20.
   */
  static propTypes = {
    // table configuration
    tableConfiguration: PropTypes.shape(TableConfigurationModel).isRequired,
    // table pane configuration
    tablePaneConfiguration: PropTypes.shape(TablePaneConfigurationModel).isRequired,
    // [Optional] Size of a given table page. Default is 20 visible items in the table.
    pageSize: PropTypes.number,
    // [Optional] Default 0, number of minimum lines to display in the table
    minRowCounts: PropTypes.number,
    // [Optional] Columns configurations. Default all attributes of entities are displayed as column.
    // An column configuration is an object with
    // - label : Displayed label of the column in the Header line
    // - attributes : Array of String. Each element is an entity attribute to display in the column. It is also
    //                possible to define deep attributes like user.login
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.arrayOf(ColumnConfigurationModel),
    // [Optional] server request parameters as query params or path params defined in the PageActions given.
    // eslint-disable-next-line react/forbid-prop-types
    requestParams: PropTypes.object,

    // actions and selectors to share table state
    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // eslint-disable-next-line react/no-unused-prop-types
    tableActions: PropTypes.instanceOf(TableActions), // Table actions instance
    // eslint-disable-next-line react/no-unused-prop-types
    tableSelectors: PropTypes.instanceOf(TableSelectors), // Table selectors instance

    // from map state to props
    // page data
    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.arrayOf(PropTypes.object),
    entitiesFetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    pageMetadata: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // authentication data
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape,
    // selection data
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,

    // from map dispatch to props
    // page
    fetchEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    flushSelection: PropTypes.func.isRequired,

    // selection
    toggleRowSelection: PropTypes.func.isRequired,
    dispatchSelectAll: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
    // Customize
    emptyComponent: PropTypes.element,
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
    this.state = TableContainer.DEFAULT_STATE
    this.lastPageAvailable = Math.floor(TableContainer.MAX_NB_ENTITIES / this.nbEntitiesByPage)
    if (((this.lastPageAvailable * this.nbEntitiesByPage) + this.nbEntitiesByPage) > TableContainer.MAX_NB_ENTITIES) {
      this.lastPageAvailable = this.lastPageAvailable - 1
    }
    this.maxRowCounts = this.lastPageAvailable * this.nbEntitiesByPage
  }

  componentDidMount = () => this.onPropertiesUpdate({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesUpdate(this.props, nextProps)


  /**
   * Updates state and runs fetches required on properties change
   */
  onPropertiesUpdate = (previousProps, nextProps) => {
    const previousState = this.state
    const nextState = this.state ? { ...this.state } : { ...TableContainer.DEFAULT_STATE } // initialize to previous state or use default one

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
      nextProps.flushEntities()
      // Fetch the first page results
      nextProps.fetchEntities(0, this.nbEntitiesByPage, nextProps.requestParams)
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
          ...fill(Array(numberOfResetElements), TableContainer.EMPTY_ENTITY_VALUE),
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
    const { tableConfiguration: { lineHeight = defaultLineHeight } } = this.props
    const originalIndex = scrollEndOffset / lineHeight
    const index = Math.floor(originalIndex)

    const HALF_FETCHED = (PAGE_SIZE_MULTIPLICATOR - 1) / 2

    const pageNumber = Math.round(index / this.nbEntitiesByPage)

    const firstIndexToRetrieve = index - (this.props.pageSize * HALF_FETCHED)
    const lastIndexToRetrieve = index + (this.props.pageSize * HALF_FETCHED)

    const firstIndexFetched = pageNumber * this.nbEntitiesByPage
    const lastIndexFetched = firstIndexFetched + this.nbEntitiesByPage

    // Check if it is the last accessible page
    if (pageNumber > this.lastPageAvailable) {
      this.fetchEntities(this.lastPageAvailable)
    } else {
      this.fetchEntities(pageNumber)
      if ((index < firstIndexFetched || firstIndexFetched < firstIndexToRetrieve) && pageNumber > 0) {
        this.fetchEntities(pageNumber - 1)
      } else if ((index > lastIndexFetched) || (lastIndexToRetrieve > lastIndexFetched)) {
        if (pageNumber < this.lastPageAvailable) {
          this.fetchEntities(pageNumber + 1)
        }
      }
    }
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
    return total > TableContainer.MAX_NB_ENTITIES ? TableContainer.MAX_NB_ENTITIES : total
  }

  fetchEntities = (pageNumber) => {
    if (!this.fetchedPages.includes(pageNumber)) {
      this.props.fetchEntities(pageNumber, this.nbEntitiesByPage, this.props.requestParams)
      this.fetchedPages.push(pageNumber)
    }
  }


  /**
   * Pages index already fetched
   * @type {Array}
   */
  fetchedPages = []

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
    const {
      entitiesFetching, pageSize, pageMetadata, tablePaneConfiguration,
      toggledElements, selectionMode, tableConfiguration: { lineHeight = defaultLineHeight, ...tableConfiguration },
      emptyComponent,
    } = this.props
    const { entities, allSelected, allColumns } = this.state // cached render data

    const tableData = {
      pageSize,
      onScrollEnd: this.onScrollEnd,
      entities,
      lineHeight,
      ...tableConfiguration,
    }

    return (
      <TablePane
        tableData={tableData}
        columns={allColumns}
        entitiesFetching={entitiesFetching}
        maxRowCounts={this.maxRowCounts}
        minRowCounts={this.props.minRowCounts}
        resultsCount={pageMetadata ? pageMetadata.totalElements : 0}
        allSelected={allSelected}
        toggledElements={toggledElements}
        selectionMode={selectionMode}
        onToggleRowSelection={this.onToggleRowSelection}
        onToggleSelectAll={this.onToggleSelectAll}
        emptyComponent={emptyComponent}
        {...tablePaneConfiguration}
      />
    )
  }
}

const mapStateToProps = (state, { pageSelectors, tableSelectors }) => ({
  // results entities
  entities: pageSelectors.getOrderedList(state),
  pageMetadata: pageSelectors.getMetaData(state),
  entitiesFetching: pageSelectors.isFetching(state),
  // authentication
  authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
  // selection
  toggledElements: tableSelectors ? tableSelectors.getToggledElements(state) : {},
  selectionMode: tableSelectors ? tableSelectors.getSelectionMode(state) : TableSelectionModes.includeSelected,
})

const mapDispatchToProps = (dispatch, { pageActions, tableActions }) => ({
  flushEntities: () => dispatch(pageActions.flush()),
  fetchEntities: (pageNumber, nbEntitiesByPage, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, requestParams)),
  toggleRowSelection: (rowIndex, entity) => dispatch(tableActions.toggleElement(rowIndex, entity)),
  // keep optional callbacks but stub them when the client is not provided
  dispatchSelectAll: () => tableActions && dispatch(tableActions.selectAll()),
  dispatchUnselectAll: () => tableActions && dispatch(tableActions.unselectAll()),
  flushSelection: () => tableActions && dispatch(tableActions.unselectAll()),
})

export default flow(
  withModuleStyle({ styles }),
  withI18n(messages),
  connect(mapStateToProps, mapDispatchToProps),
)(TableContainer)

