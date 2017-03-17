/**
* LICENSE_PLACEHOLDER
**/
import { DateRangeFacet } from '../model/FacetShape'
import RangeFacetSelectorComponent from './RangeFacetSelectorComponent'

/**
* Range facet selector
*/
class DateRangeFacetSelectorComponent extends React.Component {

  static propTypes = {
    // eslint-disable-next-line
    facet: DateRangeFacet.isRequired, // seriously eslint sux on PropTypes...
  }

  render() {
    return (
      <RangeFacetSelectorComponent
        {...this.props}
      />
    )
  }
}
export default DateRangeFacetSelectorComponent
