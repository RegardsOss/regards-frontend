/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { FacetArray } from '../model/FacetShape'
import { filterListShape } from '../model/FilterShape'
import ModuleContentComponent from '../components/ModuleContentComponent'

/**
* Displays whole module content, but this react component can be unmounted when
* switching views, while module container should never be
*/
export class ModuleContentContainer extends React.Component {

  static propTypes = {

    // results facets selectors (used in mapStateToProps)
    // eslint-disable-next-line react/no-unused-prop-types
    resultsSelectors: React.PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: React.PropTypes.func.isRequired,
    // deletes a current filter (key:string)
    deleteFilter: React.PropTypes.func.isRequired,
    // from map state to props
    facets: FacetArray,
  }

  render() {
    const { facets, filters, applyFilter, deleteFilter } = this.props
    return (
      <ModuleContentComponent
        facets={facets}
        filters={filters}
        applyFilter={applyFilter}
        deleteFilter={deleteFilter}
      />
    )
  }
}

const mapStateToProps = (state, { resultsSelectors }) => ({
  facets: resultsSelectors.getFacets(state),

})

export default connect(mapStateToProps)(ModuleContentContainer)
