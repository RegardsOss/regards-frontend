/**
* LICENSE_PLACEHOLDER
**/
import { allRangeFacets } from '../model/FacetShape'

/**
* Range facet selector
*/
class RangeFacetSelectorComponent extends React.Component {

  static propTypes = {
    facet: React.PropTypes.oneOfType(allRangeFacets).isRequired,
  }

  render() {
    const { facet } = this.props
    return (
      <div />
    )
  }
}
export default RangeFacetSelectorComponent
