/**
 * LICENSE_PLACEHOLDER
 **/
import { concat, forEach, isEqual, keys, filter } from 'lodash'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import './fixed-data-table-mui.css'
import FixedTable from './FixedTable'


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
class FixedTableContainer extends React.Component {

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
    // Set by @regardsoss/redux connect
    theme: React.PropTypes.string,
    locale: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    const nbEntitiesByPage = this.props.pageSize * 3
    // +1 for header row
    const height = this.props.lineHeight * (this.props.pageSize + 1)
    const width = window.innerWidth
    this.state = {
      nbEntitiesByPage,
      entities: null,
      height,
      width,
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
    if (!this.state.entities && nextProps.pageMetadata && nextProps.entities) {
      entities = Array(nextProps.pageMetadata.totalElements).fill({})
    } else if (nextProps.pageMetadata && nextProps.entities && (nextProps.entities !== this.props.entities)) {
      // Entities are already initialize in the state, juste duplicate the list to update it if necessary
      // with the new entities fetched from server
      entities = concat([], this.state.entities)
    }

    // If new entities has been retrieved, then add them to th right index in the state.entities list.
    if (entities !== null && nextProps.entities &&
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

  shouldComponentUpdate(nextProps) {
    let update = isEqual(nextProps.requestParams, this.props.requestParams) === false
    update = update || isEqual(nextProps.entities, this.props.entities) === false
    update = update || nextProps.theme !== this.props.theme
    update = update || nextProps.entitiesFetching !== this.props.entitiesFetching
    update = update || nextProps.locale !== this.props.locale
    return update
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

  render() {
    if (this.props.pageMetadata &&
      this.props.pageMetadata.totalElements > 0 &&
      this.state.entities !== null &&
      this.state.entities.length > 0) {
      return (
        <div>
          <FixedTable
            entities={this.state.entities}
            entitiesFetching={this.props.entitiesFetching}
            lineHeight={this.props.lineHeight}
            pageSize={this.props.pageSize}
            onScrollEnd={this.onScrollEnd}
            columns={this.getAllColumns()}
            displayCheckbox={this.props.displayCheckbox}
            onRowSelection={this.selectRow}
          />
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
FixedTableContainer.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FixedTableContainer)
