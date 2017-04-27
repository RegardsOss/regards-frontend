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

  /**
   * Formats facet value to display it in menu
   */
  formatFacetValueForMenu = (label, facet) => {
    const { intl: { formatMessage } } = this.context
    return this.formatFacetValue(facet,
      (value, count) => formatMessage({ id: 'search.facets.filter.menu.number.greater' }, { value, count }),
      (value, count) => formatMessage({ id: 'search.facets.filter.menu.number.lower' }, { value, count }),
      (minValue, maxValue, count) => formatMessage({ id: 'search.facets.filter.menu.number.range' }, { minValue, maxValue, count }),
    )
  }

  formatFacetValueForFilter = (label, facet) => {
    const { intl: { formatMessage } } = this.context
    return this.formatFacetValue(facet,
      value => formatMessage({ id: 'search.facets.filter.chip.number.greater' }, { label, value }),
      value => formatMessage({ id: 'search.facets.filter.chip.number.lower' }, { label, value }),
      (minValue, maxValue) => formatMessage({ id: 'search.facets.filter.chip.number.range' }, { label, minValue, maxValue }),
    )
  }


  formatFacetValue = ({ lowerBound, upperBound, count }, lowerBoundFormatter, upperBoundFormatter, rangeFormatter) => {
    const { intl: { formatNumber } } = this.context
    if (!upperBound) {
      if (lowerBound) {
        return lowerBoundFormatter(formatNumber(lowerBound), formatNumber(count))
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      return upperBoundFormatter(formatNumber(upperBound), formatNumber(count))
    }
    return rangeFormatter(formatNumber(lowerBound), formatNumber(upperBound), count)
  }

  render() {
    const { label, facet, applyFilter } = this.props
    return (
      <FacetSelectorComponent
        label={label}
        facet={facet}
        facetValueFormatterForMenu={this.formatFacetValueForMenu}
        facetValueFormatterForFilter={this.formatFacetValueForFilter}
        applyFilter={applyFilter}
      />
    )
  }
}
export default NumberRangeFacetSelectorComponent
