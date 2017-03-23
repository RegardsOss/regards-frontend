/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import { NumberRangeFacet } from '../model/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/**
* Range facet selector
*/
class NumberRangeFacetSelectorComponent extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    // eslint-disable-next-line
    facet: NumberRangeFacet.isRequired, // seriously eslint sux on PropTypes...
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  formatFacetValue = ({ lowerBound, upperBound, count }) => {
    const { intl: { formatNumber, formatMessage } } = this.context
    if (!upperBound) {
      if (lowerBound) {
        return formatMessage({ id: 'search.facets.filter.number.greater' }, {
          value: formatNumber(lowerBound),
          count: formatNumber(count),
        })
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      return formatMessage({ id: 'search.facets.filter.number.lower' }, {
        value: formatNumber(upperBound),
        count: formatNumber(count),
      })
    }
    return formatMessage({ id: 'search.facets.filter.number.range' }, {
      minValue: formatNumber(lowerBound),
      maxValue: formatNumber(upperBound),
      count: formatNumber(count),
    })
  }

  render() {
    const { label, facet, applyFilter } = this.props
    return (
      <FacetSelectorComponent
        label={label}
        facetValueFormatter={this.formatFacetValue}
        facet={facet}
        applyFilter={applyFilter}
      />
    )
  }
}
export default NumberRangeFacetSelectorComponent
