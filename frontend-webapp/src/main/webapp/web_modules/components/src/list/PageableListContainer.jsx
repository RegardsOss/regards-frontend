/**
 * LICENSE_PLACEHOLDER
 **/
import Infinite from 'react-infinite'
import { map, merge, concat, forEach, findIndex, debounce } from 'lodash'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import TextField from 'material-ui/TextField'
import LineComponent from './LineComponent'
import ListHeaderComponent from './ListHeaderComponent'
import ShowableAtRender from '../cards/ShowableAtRender'

/**
 * React component to handle paginated list of elements.
 * Each element is rendered with a custom given React component.
 * Properties
 * lineComponent : React component to render a entity line. The entity to display is passed as a prop.
 * nbEntityByPage : Number used to load a page of entities.
 * entitiesActions : Store Actions class derived from BasicPageableActions
 * entitiesSelector : Store Selectors class derived from BasicPageableSelector
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
class PageableListContainer extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    entityIdentifier: React.PropTypes.string.isRequired,
    lineComponent: React.PropTypes.func.isRequired,
    nbEntityByPage: React.PropTypes.number.isRequired,
    entitiesActions: React.PropTypes.instanceOf(BasicPageableActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesSelector: React.PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    selectedEntities: React.PropTypes.arrayOf(React.PropTypes.object),
    searchIdentifier: React.PropTypes.string,
    searchText: React.PropTypes.node,
    displayCheckbox: React.PropTypes.bool,
    disableActions: React.PropTypes.bool,
    onEntityCheck: React.PropTypes.func,
    onUnselectAll: React.PropTypes.func,
    onReset: React.PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    additionalPropToLineComponent: React.PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    style: React.PropTypes.object,
    // Set by redux store connection
    pageMetadata: React.PropTypes.shape({
      number: React.PropTypes.number,
      size: React.PropTypes.number,
      totalElements: React.PropTypes.number,
    }),
    fetchEntities: React.PropTypes.func,
    entitiesFetching: React.PropTypes.bool,
  }

  static defaultProps = {
    selectedEntities: [],
    displayCheckbox: true,
    disableActions: false,
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      lineHeight: 40,
      autoLoadOffset: 160,
      loadedEntities: [],
      lastIndexReached: false,
      searchValue: '',
    }
  }

  /**
   * When a page is fetched, this method is called and then we add the elements to the list
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.entitiesFetching === false && this.props.entitiesFetching === true) {
      const newEntities = []
      forEach(nextProps.entities, entity => newEntities.push(entity))
      const newStateEntities = concat([], this.state.loadedEntities, newEntities)
      this.setState({
        loadedEntities: newStateEntities,
        lastIndexReached: nextProps.pageMetadata.totalElements <= newStateEntities.length,
      })
    }
  }

  /**
   * Handle the action of loading new entities after a scroll
   */
  handleInfiniteLoad = () => {
    if (!this.state.lastIndexReached && !this.props.entitiesFetching) {
      const index = this.state.loadedEntities ? this.state.loadedEntities.length : 0
      return this.handleFetch(index, this.state.searchValue)
    }
  }

  /**
   * Fetch new list of result
   * @param index
   * @param searchValue
   */
  handleFetch = (index, searchValue) => {
    const urlParams = this.props.searchIdentifier && searchValue.length > 0 ? { [this.props.searchIdentifier]: searchValue } : undefined
    this.props.fetchEntities(index, this.props.nbEntityByPage, urlParams)
  }

  debouncedHandleFetch = debounce(this.handleFetch, 300)

  /**
   * Display the loading element
   * @returns {*}
   */
  elementInfiniteLoad = (fetching) => {
    const style = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    }
    return (
      <div className="infinite-list-item" style={style.container}>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status="loading"
          style={style.refresh}
        />
      </div>
    )
  }

  /**
   * Allow to disable the infinite scroll action when the last index is reached
   * @returns {*}
   */
  calculateOffset = () => {
    if (this.state.lastIndexReached) {
      return undefined
    }
    return this.state.autoLoadOffset
  }

  onSearchUpdate = (event, value) => {
    this.setState({
      searchValue: value,
      loadedEntities: [],
      lastIndexReached: 0,
    })
    this.props.onReset()
    this.debouncedHandleFetch(0, value)
  }

  onReset = () => {
    this.setState({
      searchValue: '',
    })
    this.handleFetch(0, '')
    this.props.onReset()
  }

  render() {
    const { searchValue } = this.state
    let containerSize = this.props.nbEntityByPage - 2
    if (this.props.pageMetadata && this.props.pageMetadata.totalElements < this.props.nbEntityByPage) {
      containerSize = this.props.pageMetadata.totalElements === 0 ? 10 : this.props.nbEntityByPage
    }
    return (
      <div style={merge({}, this.props.style)}>
        <ListHeaderComponent
          title={this.props.title}
          onUnselecteddAll={this.props.onUnselectAll}
          onReset={this.onReset}
        />
        <ShowableAtRender show={typeof this.props.searchIdentifier === 'string'}>
          <TextField
            name="searchfield"
            onChange={this.onSearchUpdate}
            floatingLabelText={this.props.searchText}
            value={searchValue}
            fullWidth
          />
        </ShowableAtRender>
        <Infinite
          elementHeight={this.state.lineHeight}
          containerHeight={containerSize * this.state.lineHeight}
          infiniteLoadBeginEdgeOffset={this.calculateOffset()}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.props.entitiesFetching}
        >
          {map(this.state.loadedEntities, (entity) => {
            const selected = findIndex(this.props.selectedEntities,
                selectedEntity => selectedEntity[this.props.entityIdentifier] === entity.content[this.props.entityIdentifier],
              ) >= 0
            return (
              <LineComponent
                key={entity.content[this.props.entityIdentifier]}
                entity={entity}
                displayCheckbox={this.props.displayCheckbox}
                disabled={this.props.disableActions}
                lineComponent={this.props.lineComponent}
                onEntityCheck={this.props.onEntityCheck}
                isSelected={selected}
                additionalPropToLineComponent={this.props.additionalPropToLineComponent}
              />
            )
          })}
        </Infinite>
      </div>
    )
  }
}

PageableListContainer.defaultProps = {
  displayCheckbox: false,
  selectedEntities: [],
  additionalPropToLineComponent: {},
}

const mapStateToProps = (state, ownProps) => ({
  entities: ownProps.entitiesSelector.getList(state),
  pageMetadata: ownProps.entitiesSelector.getMetaData(state),
  entitiesFetching: ownProps.entitiesSelector.isFetching(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEntities: (index, nbEntityByPage, queryParams) => dispatch(ownProps.entitiesActions.fetchPagedEntityList(index, nbEntityByPage, {}, queryParams)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageableListContainer)
