/**
 * LICENSE_PLACEHOLDER
 **/
import { concat, keys, isEqual } from 'lodash'
import { Table, Column } from 'fixed-data-table'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import './fixed-data-table-mui.css'
import FixedTableCell from './FixedTableCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'

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
 */
class FixedTable extends React.Component {

  /**
   * PageActions : BasicPageableActions of the entities to manage
   * PageSelector : BasicPageableSelectors of the entities to manage
   * pageSize : Optional, number of visible entity into the table. Default 20.
   * @type {{PageActions: *, PageSelector: *, pageSize: *, requestParams: *, entities: *, pageMetadata: *, fetchEntities: *, entitiesFetching: *}}
   */
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    PageActions: React.PropTypes.instanceOf(BasicPageableActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    PageSelector: React.PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    pageSize: React.PropTypes.number,
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
    const defaultLineHeight = 40
    // 20 + 1 for header line
    const defaultPageSize = 21
    const defaultNbEntitiesByPage = defaultPageSize * 3
    const defaultHeight = defaultPageSize * defaultLineHeight
    // +1 for header row
    const height = this.props.pageSize ? defaultLineHeight * (this.props.pageSize + 1) : defaultHeight
    const width = window.innerWidth - 60
    this.state = {
      rowHeight: defaultLineHeight,
      pageSize: this.props.pageSize ? this.props.pageSize : defaultPageSize,
      nbEntitiesByPage: this.props.pageSize ? this.props.pageSize * 3 : defaultNbEntitiesByPage,
      entities: [],
      height,
      width,
      columnWidths: {
        label: width / 3,
        format: width / 3,
        language: width / 3,
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
    const index = Math.floor(scrollEndOffset / 50)

    // Search for first missing key in viewport
    if (index > this.state.pageSize) {
      let i = 0
      for (i = index - this.state.pageSize; i < index + (2 * this.state.pageSize); i += 1) {
        if (keys(this.state.entities[i]).length === 0) {
          this.props.fetchEntities(i, this.state.nbEntitiesByPage, this.props.requestParams)
          break
        }
      }
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
   * Render the loading to inform user thaht entities are fetching
   * @param height
   * @returns {*}
   */
  renderLoadingFilter = (height) => {
    if (this.props.entitiesFetching) {
      return (
        <div
          style={{
            bottom: '0px',
            position: 'absolute',
            width: '100%',
            height: this.state.rowHeight,
            backgroundColor: this.context.muiTheme.palette.primary1Color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0.5',
            zIndex: '1000',
          }}
        >
          <LoadingComponent />
        </div>
      )
    }
    return null
  }

  render() {
    if (this.props.pageMetadata && this.props.pageMetadata.totalElements > 0) {
      const totalNumberOfEntities = this.props.pageMetadata.totalElements
      const { columnWidths, width, height, entities } = this.state

      return (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.renderLoadingFilter(height)}
          <Table
            rowHeight={this.state.rowHeight}
            headerHeight={this.state.rowHeight}
            rowsCount={totalNumberOfEntities}
            onColumnResizeEndCallback={this.onColumnResizeEndCallback}
            isColumnResizing={false}
            onScrollEnd={this.onScrollEnd}
            width={width}
            height={height}
            {...this.props}
          >
            <Column
              columnKey="label"
              header={<FixedTableHeaderCell label="label" />}
              cell={<FixedTableCell data={entities} col="label" />}
              fixed
              width={columnWidths.label}
              felxgrow={1}
              isResizable
            />
            <Column
              columnKey="format"
              header={<FixedTableHeaderCell label="format" />}
              cell={<FixedTableCell data={entities} col="format" />}
              fixed
              width={columnWidths.format}
              felxgrow={1}
              isResizable
            />
            <Column
              columnKey="language"
              header={<FixedTableHeaderCell label="language" />}
              cell={<FixedTableCell data={entities} col="language" />}
              fixed
              width={columnWidths.language}
              flexGrow={1}
              isResizable
            />
          </Table>
        </div>
      )
    }
    return null
  }
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
