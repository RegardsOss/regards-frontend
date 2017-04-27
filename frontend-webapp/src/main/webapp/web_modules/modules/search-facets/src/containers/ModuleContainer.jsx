/**
 * LICENSE_PLACEHOLDER
 **/
import filter from 'lodash/filter'
import { connect } from '@regardsoss/redux'
import { ShowableAtRender } from '@regardsoss/components'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { AttributeModel, AttributeModelController } from '@regardsoss/model'
import ModuleContentComponent from '../components/ModuleContentComponent'
import { FacetArray } from '../model/FacetShape'
import { filterListShape } from '../model/FilterShape'

/**
 * Display the search facets content (mount / unmount children as the show property changes,
 * but alway stays mounted to keep a valid historical state)
 */
export class ModuleContainer extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    appName: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: React.PropTypes.string,
    moduleConf: React.PropTypes.shape({
      onFiltersChanged: React.PropTypes.func.isRequired,
      filters: filterListShape.isRequired,
      show: React.PropTypes.bool.isRequired,
      resultsSelectors: React.PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
      attributeModels: React.PropTypes.objectOf(AttributeModel).isRequired,
    }).isRequired,
    // from map state to props
    facets: FacetArray.isRequired,
    facetLabels: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  }

  componentWillMount = () => {
    // initialize filters
    this.setState({
      filters: [],
    })
  }

  getFiltersWithout = filterKey => filter(this.props.moduleConf.filters, ({ filterKey: currentFilterKey }) => currentFilterKey !== filterKey)


  /**
   * Apply a new facet filter to current search (adds or repliace it in current filters list)
   */
  applyFilter = (filterKey, filterLabel, openSearchQuery) => this.updateFilters([...this.getFiltersWithout(filterKey), { filterKey, filterLabel, openSearchQuery }])

  /**
   * Deletes a facet
   */
  deleteFilter = filterKey => this.updateFilters(this.getFiltersWithout(filterKey))

  /**
   * Updates filters list
   */
  updateFilters = (filters) => {
    // dispatch to table
    this.props.moduleConf.onFiltersChanged(filters)
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { facets, facetLabels, moduleConf: { show, filters } } = this.props
    return (
      <ShowableAtRender show={show}>
        <ModuleContentComponent
          facets={facets}
          filters={filters}
          facetLabels={facetLabels}
          applyFilter={this.applyFilter}
          deleteFilter={this.deleteFilter}
        />
      </ShowableAtRender>
    )
  }
}

const mapStateToProps = (state, { moduleConf: { resultsSelectors, facets, facetLabels, attributeModels } }) => {
  const nextFacets = resultsSelectors.getFacets(state) || []
  if (nextFacets === facets) {
    // no change store, avoid updating references
    return { facets, facetLabels }
  }

  // build facet labels list
  return {
    facets: nextFacets,
    facetLabels: nextFacets.reduce((labelsAcc, { attributeName }) => ({
      [attributeName]: AttributeModelController.findLabelFromAttributeFullyQualifiedName(attributeName, attributeModels),
      ...labelsAcc,
    }), {}),
  }
}

export default connect(mapStateToProps)(ModuleContainer)
