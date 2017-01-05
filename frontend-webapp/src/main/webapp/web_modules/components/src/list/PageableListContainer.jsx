/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import Infinite from 'react-infinite'
import { map, merge, concat, isEqual, forEach, findIndex } from 'lodash'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import LineComponent from './LineComponent'
import ListHeaderComponent from './ListHeaderComponent'

/**
 * React component to handle paginated list of elements.
 * Each element is rendered with a custom given React component.
 * Properties
 * lineComponent : React component to render a entity line. The entity to display is passed as a prop.
 * nbEntityByPage : Number used to load a page of entities.
 * entitiesActions : Store Actions class derived from BasicPageableActions
 * entitiesSelector : Store Selectors class derived from BasicPageableSelector
 */
class PageableListContainer extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    entityIdentifier: React.PropTypes.string.isRequired,
    lineComponent: React.PropTypes.func.isRequired,
    nbEntityByPage: React.PropTypes.number.isRequired,
    entitiesActions: React.PropTypes.any.isRequired,
    entitiesSelector: React.PropTypes.any.isRequired,
    selectedEntities: React.PropTypes.array,
    displayCheckbox: React.PropTypes.bool,
    onEntityCheck: React.PropTypes.func,
    onUnselectAll: React.PropTypes.func,
    onReset: React.PropTypes.func,
    // Set by redux store connection
    fetchEntities: React.PropTypes.func,
    entitiesFetching: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      lineHeight: 40,
      autoLoadOffset: 160,
      loadedEntities: [],
      lastIndexReached: false,
    }
  }

  /**
   * When a page is fetched, this method is called and then we add the elements to the list
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    //if (!isEqual(this.props.entities, nextProps.entities)) {
    console.log(this.props, nextProps)
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
      const that = this
      const index = that.state.loadedEntities ? that.state.loadedEntities.length : 0
      that.props.fetchEntities(index)
    }
  }


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
    } else {
      return this.state.autoLoadOffset
    }
  }

  render() {
    let containerSize = this.props.nbEntityByPage - 2
    if (this.props.pageMetadata && this.props.pageMetadata.totalElements < this.props.nbEntityByPage) {
      containerSize = this.props.pageMetadata.totalElements === 0 ? 0 : this.props.nbEntityByPage
    }
    return (
      <div style={merge({}, this.props.style)}>
        <ListHeaderComponent
          title={this.props.title}
          onUnselecteddAll={this.props.onUnselectAll}
          onReset={this.props.onReset}
        />
        <Infinite
          elementHeight={this.state.lineHeight}
          containerHeight={containerSize * this.state.lineHeight}
          infiniteLoadBeginEdgeOffset={this.calculateOffset()}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.props.entitiesFetching}
        >
          {map(this.state.loadedEntities, (entity, idx) => {
            const selected = findIndex(this.props.selectedEntities,
                selectedEntity => selectedEntity.content[this.props.entityIdentifier] === entity.content[this.props.entityIdentifier],
              ) >= 0
            return (
              <LineComponent
                key={idx}
                entity={entity}
                displayCheckbox={this.props.displayCheckbox}
                lineComponent={this.props.lineComponent}
                onEntityCheck={this.props.onEntityCheck}
                isSelected={selected}
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
}

const mapStateToProps = (state, ownProps) => ({
  entities: ownProps.entitiesSelector.getList(state),
  pageMetadata: ownProps.entitiesSelector.getMetaData(state),
  entitiesFetching: ownProps.entitiesSelector.isFetching(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEntities: index => dispatch(ownProps.entitiesActions.fetchPagedEntityList(dispatch, index, ownProps.nbEntityByPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageableListContainer)
