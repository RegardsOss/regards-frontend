/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { MeasureResultProvider } from '@regardsoss/display-control'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-utils'
import InfiniteGalleryComponent from './InfiniteGalleryComponent'
import GalleryLoadingComponent from './GalleryLoadingComponent'

/**
 * Gallery display container, designed to be easily put into a flex layout
 * @author Léo Mieulet
 */
export class InfiniteGalleryContainer extends React.Component {
  static propTypes = {
    // Table settings
    itemComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    loadedEntities: PropTypes.arrayOf(PropTypes.object),
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
    flush: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape, // authentication data, used to refetch on authentication change

    itemOfInterestPicked: PropTypes.number,
    isItemOfInterest: PropTypes.func,
  }

  static defaultProps = {
    queryPageSize: 20,
    loadingComponent: (<GalleryLoadingComponent />),
  }

  /** List of properties that should not be reported to children */
  static PROPS_TO_OMIT = ['pageActions', 'pageSelectors', 'pageMetadata']

  /** Root div style to span all */
  static SPAN_ALL_STYLE = { minHeight: 0, flexGrow: 1, flexShrink: 1 }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pageSelectors }) {
    return {
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
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { pageActions }) {
    return {
      flush: () => dispatch(pageActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage, pathParam, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, pathParam, requestParams)),
    }
  }

  /**
   * Flushes current entities
   * @param {*} props -
   */
  static flush({ flush }) {
    return flush()
  }

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   */
  static fetchEntityPage({
    fetchEntities, pathParams, requestParams, queryPageSize,
  }, pageNumber = 0) {
    fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)
  }

  /** Initialize state */
  UNSAFE_componentWillMount = () => this.setState({
    ...InfiniteGalleryContainer.DEFAULT_STATE,
  })

  /** Update state from props */
  componentDidMount = () => this.onPropertiesUpdate({}, this.props)

  /**
   * Lifecycle method: component will receive props. Used here to update state for properties, avoid new references
   * at render time
   * @param nextProps next component properties values
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdate(this.props, nextProps)

  /**
   * Updates state and runs fetches required on properties change
   */
  onPropertiesUpdate = (previousProps, nextProps) => {
    const previousState = this.state
    const nextState = this.state ? { ...this.state } : { ...InfiniteGalleryContainer.DEFAULT_STATE } // initialize to previous state or use default one
    // initialization or authentication update: fetch the first page
    if (!isEqual(nextProps.requestParams, previousProps.requestParams)
      || !isEqual(nextProps.pathParams, previousProps.pathParams)
      || !isEqual(nextProps.authentication, previousProps.authentication)) {
      // Fetch new ones (clear store first)
      InfiniteGalleryContainer.flush(nextProps)
      InfiniteGalleryContainer.fetchEntityPage(nextProps)
      // Entities stored is managed outside this container. After fetching, we receive
      // the new full list of items inside the loadedEntities props
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
    return Math.max(entitiesCount || 0, (this.props.loadedEntities || []).length)
  }

  fetchMoreEntities = () => {
    const { entitiesFetching, pageMetadata } = this.props
    // Is table incomplete? (prevent fetching when already in progress)
    if (this.hasMoreEntities() && !entitiesFetching) {
      const nextPage = get(pageMetadata, 'number', 0) + 1
      InfiniteGalleryContainer.fetchEntityPage(this.props, nextPage)
    }
  }

  hasMoreEntities = () => this.props.loadedEntities.length < this.getCurrentTotalEntities()

  render() {
    // except actions / selectors, we need all properties through
    const {
      itemComponent, columnWidth, columnGutter, entitiesFetching, loadingComponent, emptyComponent, itemProps, itemOfInterestPicked,
      isItemOfInterest, loadedEntities,
    } = this.props
    const currentTotalEntities = this.getCurrentTotalEntities()

    return (
      <MeasureResultProvider style={InfiniteGalleryContainer.SPAN_ALL_STYLE} targetPropertyName="componentSize">
        <InfiniteGalleryComponent
          items={loadedEntities}
          itemComponent={itemComponent}
          itemProps={itemProps}
          columnWidth={columnWidth}
          columnGutter={columnGutter}
          isEmpty={!currentTotalEntities}
          isLoading={entitiesFetching}
          loadingComponent={loadingComponent}
          emptyComponent={emptyComponent}
          alignCenter
          onInfiniteLoad={this.fetchMoreEntities}
          itemOfInterestPicked={itemOfInterestPicked}
          isItemOfInterest={isItemOfInterest}
        />
      </MeasureResultProvider>
    )
  }
}

export default connect(
  InfiniteGalleryContainer.mapStateToProps,
  InfiniteGalleryContainer.mapDispatchToProps,
)(InfiniteGalleryContainer)
