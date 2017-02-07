/**
 * LICENSE_PLACEHOLDER
 **/
import { concat, forEach, isEqual, keys, map, filter } from 'lodash'
import { Table, Column } from 'fixed-data-table'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import './fixed-data-table-mui.css'
import FixedTableCell from './FixedTableCell'
import FixedTableCheckBoxCell from './FixedTableCheckBoxCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'
import Styles from './FixedTableStyles'

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
class FixedTable extends React.Component {

  /**
   * PageActions : BasicPageableActions of the entities to manage
   * PageSelector : BasicPageableSelectors of the entities to manage
   * pageSize : Optional, number of visible entity into the table. Default 20.
   * lineHeight: Optional, default 40px
   * @type {{PageActions: *, PageSelector: *, pageSize: *, requestParams: *, entities: *, pageMetadata: *, fetchEntities: *, entitiesFetching: *}}
   */
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    PageActions: React.PropTypes.instanceOf(BasicPageableActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    PageSelector: React.PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    pageSize: React.PropTypes.number,
    lineHeight: React.PropTypes.number,
    displayCheckbox: React.PropTypes.bool,
    onSelectionChange: React.PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    requestParams: React.PropTypes.object,
    // Set by redux store connection
    // eslint-disable-next-line react/no-unused-prop-types
    entities: React.PropTypes.objectOf(React.PropTypes.object),
    pageMetadata: React.PropTypes.shape({
      number: React.PropTypes.number,
      size: React.PropTypes.number,
      totalElements: React.PropTypes.number,
    }),
    fetchEntities: React.PropTypes.func,
    entitiesFetching: React.PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    const nbEntitiesByPage = this.props.pageSize * 3
    // +1 for header row
    const height = this.props.lineHeight * (this.props.pageSize + 1)
    const width = window.innerWidth
    const columnsWidth = width - 40
    this.state = {
      nbEntitiesByPage,
      entities: [],
      height,
      width,
      columnWidths: {
        label: columnsWidth / 3,
        format: columnsWidth / 3,
        language: columnsWidth / 3,
      },
    }
  }

  /**
   * First, run a search from index 0 to initiliaz first search results
   */
  componentWillMount() {
    this.props.fetchEntities(0, this.state.nbEntitiesByPage, this.props.requestParams)
  }

  /**
   * Update retrieved entities into the state.entities
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // If request changed, run new search and reset the entities stored in the state
    if (isEqual(nextProps.requestParams, this.props.requestParams) === false) {
      this.setState({
        entities: [],
      })
      this.props.fetchEntities(0, this.state.nbEntitiesByPage, nextProps.requestParams)
    }

    // If there is no entities in the state, so we have to initialize the entities with empty objects.
    // One empty object per possbile result of the current request. The number of possible result of
    // a request is the totalElements in the page metadata provded with the server response.
    let entities = null
    if (this.state.entities.length === 0 && nextProps.pageMetadata && nextProps.entities) {
      entities = Array(nextProps.pageMetadata.totalElements).fill({})
    } else if (nextProps.pageMetadata && nextProps.entities) {
      // Entities are already initialize in the state, juste duplicate the list to update it if necessary
      // with the new entities fetched from server
      entities = concat([], this.state.entities)
    }

    // If new entities has been retrieved, then add them to th right index in the state.entities list.
    if (nextProps.entities &&
      (!this.props.entities || !isEqual(keys(this.props.entities), keys(nextProps.entities)))) {
      let i = 0
      // Add each nex entity retrieved at the right index in the state.entities list
      for (i = 0; i < keys(nextProps.entities).length; i += 1) {
        entities[nextProps.pageMetadata.number + i] = nextProps.entities[keys(nextProps.entities)[i]]
      }
      this.setState({
        entities,
      })
    }
  }

  /**
   * After each scroll end retrieve missing entities
   * @param scrollStartOffset
   * @param scrollEndOffset
   */
  onScrollEnd = (scrollStartOffset, scrollEndOffset) => {
    // the scroll offset is the first element to fetch if it is missing

    const index = Math.floor(scrollEndOffset / this.props.lineHeight)

    // Search for first missing key in viewport
    let firstIndexToFetch = null
    if (index > this.props.pageSize) {
      let i = 0
      for (i = index - this.props.pageSize; i < (index + (2 * this.props.pageSize)) && i < this.state.entities.length; i += 1) {
        if (keys(this.state.entities[i]).length === 0) {
          firstIndexToFetch = i
          // Init pending information in the current state for fetching missing entities.
          // The pending information allow not to run a new request for an already fetching entity
          // An entity is fetch only if the entity is an empty object in the cache object state.entities
          const entities = concat([], this.state.entities)
          let j = 0
          for (j = firstIndexToFetch; j < this.state.nbEntitiesByPage; j += 1) {
            if (keys(entities[j]).length === 0) {
              entities[j] = { pending: true }
            }
          }
          this.setState({
            entities,
          })
          break
        }
      }
    }

    // Run search
    if (firstIndexToFetch !== null) {
      this.props.fetchEntities(firstIndexToFetch, this.state.nbEntitiesByPage, this.props.requestParams)
    }
  }


  /**
   * Resize column
   * @param newColumnWidth
   * @param columnKey
   */
  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }))
  }

  /**
   * Return a cell content value with the rox index and the column name.
   * @param rowIndex
   * @param column
   * @returns {string}
   */
  getCellValue = (rowIndex, column) => {
    let value = ''
    const entity = this.state.entities[rowIndex].content
    if (entity) {
      let i = 0
      for (i = 0; i < column.attributes.length; i += 1) {
        if (entity[column.attributes[i]]) {
          value += ` ${entity[column.attributes[i]]}`
        } else {
          value += ` ${entity.attributes[column.attributes[i]]}`
        }
      }
    }
    return value
  }

  /**
   * Return columns form first result entity attributes
   * @returns {Array}
   */
  getAllColumns = () => {
    const entity = this.state.entities[0]
    const columns = []
    // Add default attributes
    if (entity.content && entity.content.label) {
      columns.push({ attributes: ['label'], label: 'label' })
    }
    forEach(entity.content.attributes, (attr, key) => {
      columns.push({ attributes: [key], label: key })
    })

    return columns
  }

  /**
   * Callback to select a row on checkbox click
   * @param rowIndex
   */
  selectRow = (rowIndex) => {
    const entities = concat([], this.state.entities)
    const selectedRowIndex = Object.assign(entities[rowIndex])
    selectedRowIndex.selected = selectedRowIndex.selected ? !selectedRowIndex.selected : true
    entities[rowIndex] = selectedRowIndex
    const selectedEntities = filter(entities, entity => entity.selected)
    this.setState({
      entities,
    })
    this.props.onSelectionChange(selectedEntities)
  }

  /**
   * Render the first column with a checkbox inside to allow line selection
   * @returns {*}
   */
  renderCheckBoxColumn = () => {
    if (this.props.displayCheckbox) {
      return (
        <Column
          key={'checkbox'}
          columnKey={'checkbox'}
          header={<FixedTableHeaderCell lineHeight={this.props.lineHeight} fixed />}
          cell={<FixedTableCheckBoxCell
            selectRow={this.selectRow}
            isSelected={idx => this.state.entities[idx].selected}
          />}
          fixed
          width={40}
        />
      )
    }
    return null
  }

  /**
   * Render the loading to inform user thaht entities are fetching
   * @param height
   * @returns {*}
   */
  renderLoadingFilter = (height) => {
    if (this.props.entitiesFetching) {
      const styles = Styles(this.context.muiTheme).loadingFilter
      styles.height = this.props.lineHeight
      styles.headerHeight = this.props.lineHeight
      return (
        <div style={styles}>
          <LoadingComponent />
        </div>
      )
    }
    return null
  }

  render() {
    const { columnWidths, width, height } = this.state
    const styles = Styles(this.context.muiTheme)
    if (this.props.pageMetadata && this.props.pageMetadata.totalElements > 0 && this.state.entities.length > 0) {
      const totalNumberOfEntities = this.props.pageMetadata.totalElements
      return (
        <div
          style={styles.table}
        >
          {this.renderLoadingFilter(height)}
          <Table
            rowHeight={this.props.lineHeight}
            headerHeight={this.props.lineHeight}
            rowsCount={totalNumberOfEntities}
            onColumnResizeEndCallback={this.onColumnResizeEndCallback}
            isColumnResizing={false}
            onScrollEnd={this.onScrollEnd}
            width={width}
            height={height}
            {...this.props}
          >
            {this.renderCheckBoxColumn()}
            {map(this.getAllColumns(), (column, idx) => (
              <Column
                key={idx}
                columnKey={column.label}
                header={<FixedTableHeaderCell label={column.label} lineHeight={this.props.lineHeight} />}
                cell={<FixedTableCell getCellValue={(rowIndex, col) => this.getCellValue(rowIndex, col)} col={column} />}
                fixed
                width={columnWidths.label}
                felxgrow={1}
                isResizable
              />))}
          </Table>
        </div>
      )
    }
    return null
  }
}

/**
 * FixedTable default props
 * @type {{pageSize: number, lineHeight: number, displayCheckbox: boolean}}
 */
FixedTable.defaultProps = {
  pageSize: 20,
  lineHeight: 42,
  displayCheckbox: false,
}

const mapStateToProps = (state, ownProps) => ({
  entities: ownProps.PageSelector.getList(state),
  pageMetadata: ownProps.PageSelector.getMetaData(state),
  entitiesFetching: ownProps.PageSelector.isFetching(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEntities: (index, nbEntitiesByPage, requestParams) => dispatch(ownProps.PageActions.fetchPagedEntityList(index, nbEntitiesByPage, requestParams)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FixedTable)
