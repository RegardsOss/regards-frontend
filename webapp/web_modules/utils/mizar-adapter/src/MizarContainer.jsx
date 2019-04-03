import get from 'lodash/get'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { CatalogShapes, CommonShapes } from '@regardsoss/shape'
import MizarAdapter from './adapters/MizarAdapter'

export class MizarContainer extends React.Component {
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
    requestParams: CommonShapes.RequestParameters,

    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store

    // see InfiniteTableContainer for the other properties required (note that the fetch / flush method are
    // already provided by this component, just fill in the other ones =)

    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
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

  /**
   * Builds GeoJson features collections from regards catalog entities as parameter
   * @param {*} entities
   */
  static buildGeoJSONFeatureCollection(entities = []) {
    return {
      // REGARDS entities are features withing content field. Filter entities without geometry
      features: map(entities, entity => entity.content).filter(e => !isNil(e.geometry)),
      type: 'FeatureCollection',
    }
  }

  /** Initial state */
  state = {
    featuresCollection: MizarContainer.buildGeoJSONFeatureCollection(),
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  componentDidMount() {
    this.fetchEntityPage(this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
  * Lifecycle method: component will mount. Used here to detect first properties change and update local state
  */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { requestParams, entities } = newProps
    // initialization or authentication update: fetch the first page
    if (!isEqual(newProps.requestParams, requestParams)) {
      this.props.flushEntities()
      // Fetch new ones
      this.fetchEntityPage(newProps)
      // TODO that should clear the local buffer if we keep it separated of the quicklook displayer!
    }
    if (!isEqual(oldProps.entities, entities)) {
      // Update feture collection expect by MizarAdapter
      // TODO should  we append here? so that component below can always clear... to design!
      this.setState({ featuresCollection: MizarContainer.buildGeoJSONFeatureCollection(entities) })
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
    this.props.fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)
  }

  fetchMoreEntities = () => {
    // Is table incomplete? (prevent fetching when already in progress)
    if (this.hasMoreEntities() && !this.props.entitiesFetching) {
      const nextPage = get(this.props.pageMetadata, 'number', 0) + 1
      this.fetchEntityPage(this.props, nextPage)
    }
  }

  onApplyGeoParameter = (geometry) => {
    this.props.flushEntities() // TODO: not when it will be a common parameter
    // Fetch new ones
    const props = cloneDeep(this.props)
    props.requestParams.g = geometry
    this.fetchEntityPage(props)
  }

  render() {
    const { featuresCollection } = this.state
    return (
      <MizarAdapter
        featuresCollection={featuresCollection}
        applyGeoParameter={this.onApplyGeoParameter} // TODO should not be in Mizar!
      />)
  }
}

export default connect(
  MizarContainer.mapStateToProps,
  MizarContainer.mapDispatchToProps,
)(MizarContainer)
