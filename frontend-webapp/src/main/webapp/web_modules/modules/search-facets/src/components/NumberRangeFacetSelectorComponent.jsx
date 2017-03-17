/**
* LICENSE_PLACEHOLDER
**/
import { NumberRangeFacet } from '../model/FacetShape'
import RangeFacetSelectorComponent from './RangeFacetSelectorComponent'

/**
* Range facet selector
*/
class NumberRangeFacetSelectorComponent extends React.Component {

  static propTypes = {
    // eslint-disable-next-line
    facet: NumberRangeFacet.isRequired, // seriously eslint sux on PropTypes...
  }

  render() {
    return (
      <RangeFacetSelectorComponent
        {...this.props}
      />
    )
  }
}
export default NumberRangeFacetSelectorComponent
