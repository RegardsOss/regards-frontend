/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Infinite from 'react-infinite'
import map from 'lodash/map'
import values from 'lodash/values'
import merge from 'lodash/merge'
import concat from 'lodash/concat'
import some from 'lodash/some'
import isString from 'lodash/isString'
import debounce from 'lodash/debounce'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import TextField from 'material-ui/TextField'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { ShowableAtRender } from '@regardsoss/display-control'
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
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
class PageableListContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    entityIdentifier: PropTypes.string.isRequired,
    lineComponent: PropTypes.func.isRequired,
    nbEntityByPage: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    queryParams: PropTypes.objectOf(PropTypes.string),
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesSelector: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    selectedEntities: PropTypes.arrayOf(PropTypes.object),
    searchIdentifier: PropTypes.string,
    searchText: PropTypes.node,
    displayCheckbox: PropTypes.bool,
    disableActions: PropTypes.bool,
    onEntityCheck: PropTypes.func,
    onUnselectAll: PropTypes.func,
    onReset: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    additionalPropToLineComponent: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // Set by redux store connection
    // eslint-disable-next-line react/forbid-prop-types
    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.objectOf(PropTypes.object),
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    fetchEntities: PropTypes.func,
    entitiesFetching: PropTypes.bool,
  }

  static defaultProps = {
    displayCheckbox: true,
    selectedEntities: [],
    additionalPropToLineComponent: {},
    queryParams: {},
    disableActions: false,
    style: {},
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state, props) => ({
    entities: props.entitiesSelector.getList(state),
    pageMetadata: props.entitiesSelector.getMetaData(state),
    entitiesFetching: props.entitiesSelector.isFetching(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = (dispatch, props) => ({
    fetchEntities: (index, nbEntityByPage, pathParams, queryParams) => dispatch(props.entitiesActions.fetchPagedEntityList(index, nbEntityByPage, pathParams, queryParams)),
  })

  state = {
    lineHeight: 40,
    autoLoadOffset: 160,
    loadedEntities: [],
    lastIndexReached: false,
    searchValue: '',
  }

  /**
   * When a page is fetched, this method is called and then we add the elements to the list
   * @param nextProps
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.entitiesFetching === false && this.props.entitiesFetching === true) {
      const newEntities = values(nextProps.entities)
      const newStateEntities = concat([], this.state.loadedEntities, newEntities)
      this.setState({
        loadedEntities: newStateEntities,
        lastIndexReached: nextProps.pageMetadata.totalElements <= newStateEntities.length,
      })
    }
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
   * Fetch new list of result
   * @param index
   * @param searchValue
   */
  handleFetch = (index, searchValue) => {
    const idQueryParam = this.props.searchIdentifier && searchValue.length > 0 ? { [this.props.searchIdentifier]: searchValue } : {}
    const pageNumber = index ? index / this.props.nbEntityByPage : 0
    this.props.fetchEntities(pageNumber, this.props.nbEntityByPage, {}, { ...idQueryParam, ...this.props.queryParams })
  }

  // eslint-disable-next-line react/sort-comp
  debouncedHandleFetch = debounce(this.handleFetch, 300)

  /**
   * Handle the action of loading new entities after a scroll
   */
  handleInfiniteLoad = () => {
    if (!this.state.lastIndexReached && !this.props.entitiesFetching) {
      const index = this.state.loadedEntities ? this.state.loadedEntities.length : 0
      this.handleFetch(index, this.state.searchValue)
    }
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
        <ShowableAtRender show={isString(this.props.searchIdentifier)}>
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
            const selected = some(
              this.props.selectedEntities,
              (selectedEntity) => selectedEntity[this.props.entityIdentifier] === entity.content[this.props.entityIdentifier],
            )
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

export default connect(
  PageableListContainer.mapStateToProps,
  PageableListContainer.mapDispatchToProps)(PageableListContainer)
