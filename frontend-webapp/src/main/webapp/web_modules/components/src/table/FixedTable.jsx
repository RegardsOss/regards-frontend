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
 * and infinite scroll functionnality
 */
class FixedTable extends React.Component {

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
    // const height = window.innerHeight - 400
    const defaultLineHeight = 50
    const defaultPageSize = 10
    const defaultNbEntitiesByPage = 30
    const defaultHeight = 500
    const height = this.props.pageSize ? defaultLineHeight * this.props.pageSize : defaultHeight
    const width = window.innerWidth - 60
    this.state = {
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

  componentWillMount() {
    this.props.fetchEntities(0, this.state.nbEntitiesByPage, this.props.requestParams)
  }

  componentWillReceiveProps(nextProps) {
    // If request changed, run new search
    if (isEqual(nextProps.requestParams, this.props.requestParams) === false) {
      this.setState({
        entities: [],
      })
      this.props.fetchEntities(0, this.state.nbEntitiesByPage, nextProps.requestParams)
    }

    let entities = null
    if (this.state.entities.length === 0 && nextProps.pageMetadata && nextProps.entities) {
      // First page retrieved
      // Create the list of entities in the cache by adding fetched entity at the right index in the list
      entities = Array(nextProps.pageMetadata.totalElements).fill({})
    } else if (nextProps.pageMetadata && nextProps.entities) {
      // Update entities with retrieved page
      entities = concat([], this.state.entities)
    }

    if (entities !== null && nextProps.entities) {
      let i = 0
      for (i = 0; i < keys(nextProps.entities).length; i += 1) {
        entities[nextProps.pageMetadata.number + i] = nextProps.entities[keys(nextProps.entities)[i]]
      }
      this.setState({
        entities,
      })
    }
  }

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


  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }))
  }

  renderLoadingFilter = (height) => {
    if (this.props.entitiesFetching) {
      return (
        <div
          style={{
            bottom: '0px',
            position: 'absolute',
            width: '100%',
            height: '40px',
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
            rowHeight={50}
            headerHeight={40}
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

FixedTable.defaultProps = {
  nbEntityByPage: 20,
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
