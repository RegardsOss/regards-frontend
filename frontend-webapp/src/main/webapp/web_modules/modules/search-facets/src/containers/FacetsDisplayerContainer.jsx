/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { FacetArray } from '../model/FacetShape'
import FacetsDisplayerComponent from '../components/FacetsDisplayerComponent'

/**
* Displays whole module content, but this react component can be unmounted when
* switching views, while module container should never be
*/
export class FacetsDisplayerContainer extends React.Component {

  static propTypes = {
    // results facets selectors (used in mapStateToProps)
    // eslint-disable-next-line react/no-unused-prop-types
    resultsSelectors: React.PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    // from map state to props
    facets: FacetArray,
  }

  static defaultProps = {}

  render() {
    const { facets } = this.props
    // TODO
    return (
      <FacetsDisplayerComponent
        facets={facets}
      />
    )
  }
}

const mapStateToProps = (state, { resultsSelectors }) => ({
  facets: resultsSelectors.getFacets(state),
})

export default connect(mapStateToProps)(FacetsDisplayerContainer)
