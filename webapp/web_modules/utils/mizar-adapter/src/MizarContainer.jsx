
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { CatalogShapes } from '@regardsoss/shape'
import MizarAdapter from './adapters/MizarAdapter'

export class MizarContainer extends React.Component {
  static mapStateToProps(state, { pageSelectors }) {
    return {
      // results entities
      entities: pageSelectors.getOrderedList(state),
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
    backgroundLayerUrl: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    queryPageSize: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types,react/forbid-prop-types
    requestParams: PropTypes.any,

    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store

    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,

    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired,
  }

  /**
   * Builds GeoJson features collections from regards catalog entities as parameter.
   * Removes entities with null geometry
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

  componentDidMount() {
    this.fetchEntityPage(this.props).then(() => {
      this.setState({ featuresCollection: MizarContainer.buildGeoJSONFeatureCollection(this.props.entities) })
    })
  }

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   */
  fetchEntityPage = ({
    pathParams, requestParams, queryPageSize,
  }, pageNumber = 0) => this.props.fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)

  onApplyGeoParameter = (feature) => {
    // 1. Flush existing entities from store
    this.props.flushEntities()
    // 2. Create geometry search criterion
    const coord = feature.geometry.coordinates
    const wkt = `POLYGON((${coord[0][0][0]} ${coord[0][0][1]},${coord[0][1][0]} ${coord[0][1][1]},${coord[0][2][0]} ${coord[0][2][1]},${coord[0][0][0]} ${coord[0][0][1]}))`
    // 3. Add the geometry criterion to the common search context
    // TODO
  }

  render() {
    const { featuresCollection } = this.state
    const { backgroundLayerUrl, backgroundLayerType } = this.props
    return (
      <MizarAdapter
        backgroundLayerUrl={backgroundLayerUrl}
        backgroundLayerType={backgroundLayerType}
        featuresCollection={featuresCollection}
        drawMode={false}
      />)
  }
}

export default connect(
  MizarContainer.mapStateToProps,
  MizarContainer.mapDispatchToProps,
)(MizarContainer)
