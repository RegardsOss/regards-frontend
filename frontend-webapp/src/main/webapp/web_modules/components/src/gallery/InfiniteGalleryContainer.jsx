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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-manager'
import TableContentLoadingComponent from '../table/content/TableContentLoadingComponent'
import InfiniteGalleryComponent from './InfiniteGalleryComponent'

/**
 * @author Léo Mieulet
 */
class InfiniteGalleryContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pageSelectors }) {
    return {
      // results entities
      entities: pageSelectors.getOrderedList(state),
      pageMetadata: pageSelectors.getMetaData(state),
      entitiesFetching: pageSelectors.isFetching(state),
      // authentication, mapped to reload entities on changes
      authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pageActions, tableActions }) {
    return {
      flushEntities: () => dispatch(pageActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage, pathParam, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, pathParam, requestParams)),
    }
  }

  static propTypes = {
    // Table settings
    itemComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    columnWidth: PropTypes.number,
    columnGutter: PropTypes.number,
    loadingComponent: PropTypes.element,
    emptyComponent: PropTypes.element,
    // eslint-disable-next-line react/no-unused-prop-types
    queryPageSize: PropTypes.number,

    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store

    // see InfiniteTableContainer for the other properties required (note that the fetch / flush method are
    // already provided by this component, just fill in the other ones =)

    // from map state to props

    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesFetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    pageMetadata: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    itemProps: PropTypes.object,

    // from map dispatch to props

    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape, // authentication data, used to refetch on authentication change
  }

  /** List of properties that should not be reported to children */
  static PROPS_TO_OMIT = ['pageActions', 'pageSelectors', 'pageMetadata']

  static DEFAULT_STATE = {
    entities: [],
  }

  static defaultProps = {
    queryPageSize: 20,
    loadingComponent: <TableContentLoadingComponent />,
  }


  /** Initialize state */
  componentWillMount = () => this.setState(InfiniteGalleryContainer.DEFAULT_STATE)

  /** Update state from props */
  componentDidMount = () => this.onPropertiesUpdate({}, this.props)

  /**
   * Lifecycle method: component will receive props. Used here to update state for properties, avoid new references
   * at render time
   * @param nextProps next component properties values
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdate(this.props, nextProps)

  /**
   * Updates state and runs fetches required on properties change
   */
  onPropertiesUpdate = (previousProps, nextProps) => {
    const previousState = this.state
    const nextState = this.state ? { ...this.state } : { ...InfiniteGalleryContainer.DEFAULT_STATE } // initialize to previous state or use default one
    // initialization or authentication update: fetch the first page
    if (!isEqual(nextProps.requestParams, previousProps.requestParams) ||
      !isEqual(nextProps.pathParams, previousProps.pathParams) ||
      !isEqual(nextProps.authentication, previousProps.authentication)) {
      // remove any previously fetched data
      nextState.entities = []
      // Remove entities in store
      this.props.flushEntities()
      // Fetch new ones
      this.fetchEntityPage(nextProps)
    } else if (!isEqual(previousProps.entities, nextProps.entities) || nextState.entities.length < get(nextProps, 'entities.length', 0)) {
      // update row entities (add new one to previously known ones)
      const entitiesPageIndex = get(nextProps.pageMetadata, 'number', 0)
      const firstReloadingIndex = entitiesPageIndex * nextProps.queryPageSize
      const oldEntities = (previousState.entities || []).slice()
      const restoredEntities = oldEntities.slice(0, Math.min(oldEntities.length, firstReloadingIndex))
      nextState.entities = [...restoredEntities, ...nextProps.entities]
    }

    if (!isEqual(previousState, nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * @return the number of entities to consider (subset of total or total itself)
   */
  getCurrentTotalEntities = () => {
    const entitiesCount = get(this.props.pageMetadata, 'totalElements', 0)
    return Math.max(entitiesCount || 0, (this.props.entities || []).length)
  }


  getItemState = () => ({})

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   */
  fetchEntityPage = ({
    fetchEntities, pathParams, requestParams, queryPageSize,
  }, pageNumber = 0) => {
    fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)
  }

  fetchMoreEntities = () => {
    // Is table incomplete? (prevent fetching when already in progress)
    if (this.hasMoreEntities() && !this.props.entitiesFetching) {
      const nextPage = get(this.props.pageMetadata, 'number', 0) + 1
      this.fetchEntityPage(this.props, nextPage)
    }
  }

  hasMoreEntities = () => this.state.entities.length < this.getCurrentTotalEntities()

  render() {
    // except actions / selectors, we need all properties through
    const { entities } = this.state
    const {
      itemComponent, columnWidth, columnGutter, entitiesFetching, loadingComponent, emptyComponent, itemProps,
    } = this.props
    const currentTotalEntities = this.getCurrentTotalEntities()
    return (
      <LoadableContentDisplayDecorator
        isLoading={!currentTotalEntities && entitiesFetching} // Display only the initial loading state to avoid resetting user scroll
        loadingComponent={loadingComponent}
        isEmpty={!currentTotalEntities}
        emptyComponent={emptyComponent}
      >
        <InfiniteGalleryComponent
          items={entities}
          itemComponent={itemComponent}
          itemProps={itemProps}
          columnWidth={columnWidth}
          columnGutter={columnGutter}

          hasMore
          isLoading={false}
          alignCenter
          onInfiniteLoad={this.fetchMoreEntities}
          getState={this.getItemState}
          containerClassName="masonry"
          layoutClassName="masonry-view"
          pageClassName="masonry-page"
          loadingElement={loadingComponent}
        />
      </LoadableContentDisplayDecorator>)
  }
}


export default connect(
  InfiniteGalleryContainer.mapStateToProps,
  InfiniteGalleryContainer.mapDispatchToProps,
)(InfiniteGalleryContainer)
