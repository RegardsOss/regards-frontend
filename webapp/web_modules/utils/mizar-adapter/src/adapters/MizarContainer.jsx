import get from 'lodash/get'
import map from 'lodash/map'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import MizarAdapter from './MizarAdapter'

export class SearchResultsContainer extends React.Component {
  static mapStateToProps(state, { pageSelectors }) {
    return {
      // results entities
      entities: pageSelectors.getOrderedList(state),
      pageMetadata: pageSelectors.getMetaData(state),
      entitiesFetching: pageSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { pageActions, tableActions }) {
    return {
      flushEntities: () => dispatch(pageActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage, pathParam, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, pathParam, requestParams)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    queryPageSize: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types,react/forbid-prop-types
    requestParams: PropTypes.any,

    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store

    // see InfiniteTableContainer for the other properties required (note that the fetch / flush method are
    // already provided by this component, just fill in the other ones =)

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
    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.fetchEntityPage(this.props)
  }

  componentWillReceiveProps = nextProps => this.onPropertiesUpdate(this.props, nextProps)

  /**
   * Updates state and runs fetches required on properties change
   */
  onPropertiesUpdate = (previousProps, nextProps) => {
    // initialization or authentication update: fetch the first page
    if (!isEqual(nextProps.requestParams, previousProps.requestParams)) {
      console.error('update !',previousProps,nextProps)
      this.props.flushEntities()
      // Fetch new ones
      this.fetchEntityPage(nextProps)
    }
  }


  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   */
  fetchEntityPage = ({
    pathParams, requestParams, queryPageSize,
  }, pageNumber = 0) => {
    console.error('fetch ....')
    this.props.fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)
  }

  fetchMoreEntities = () => {
    // Is table incomplete? (prevent fetching when already in progress)
    if (this.hasMoreEntities() && !this.props.entitiesFetching) {
      const nextPage = get(this.props.pageMetadata, 'number', 0) + 1
      this.fetchEntityPage(this.props, nextPage)
    }
  }

  applyGeoParameter = (geometry) => {
    console.error('Apply geo param')
    this.props.flushEntities()
    // Fetch new ones
    const props = cloneDeep(this.props)
    props.requestParams.g = geometry
    this.fetchEntityPage(props)
    console.error('Apply geo param done')
  }

  getFeatures = () => ({
    type: 'FeatureCollection',
    features: map(this.props.entities, entity => entity.content),
  })

  render() {
    return (
      <MizarAdapter
        entities={this.getFeatures()}
        applyGeoParameter={this.applyGeoParameter}
      />)
  }
}

export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps,
)(SearchResultsContainer)
