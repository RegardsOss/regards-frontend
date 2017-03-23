/**
 * LICENSE_PLACEHOLDER
 **/
import filter from 'lodash/filter'
import { ShowableAtRender } from '@regardsoss/components'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import ModuleContentContainer from './ModuleContentContainer'

/**
 * Display the search facets content (mount / unmount children as the show property changes,
 * but alway stays mounted to keep a valid historical state)
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    appName: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: React.PropTypes.string,
    moduleConf: React.PropTypes.shape({
      show: React.PropTypes.bool.isRequired,
      resultsSelectors: React.PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    }),
  }

  componentWillMount = () => {
    // initialize filters
    this.setState({
      filters: [],
    })
  }

  getFiltersWithout = filterKey => filter(this.state.filters, ({ filterKey: currentFilterKey }) => currentFilterKey !== filterKey)


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
    // TODO call open search API after collecting new filters
    this.setState({ filters })
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { moduleConf: { show, resultsSelectors } } = this.props
    const { filters } = this.state
    // onApplyFacet={this.applyFacet}
    return (
      <ShowableAtRender show={show}>
        <ModuleContentContainer
          filters={filters}
          resultsSelectors={resultsSelectors}
          applyFilter={this.applyFilter}
          deleteFilter={this.deleteFilter}
        />
      </ShowableAtRender>
    )
  }
}

export default ModuleContainer
