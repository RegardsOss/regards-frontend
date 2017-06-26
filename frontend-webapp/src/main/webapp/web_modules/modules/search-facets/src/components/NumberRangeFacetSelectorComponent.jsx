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
    // eslint-disable-next-line
    facet: NumberRangeFacet.isRequired, // seriously eslint sux on PropTypes...
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: PropTypes.func.isRequired,
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
    if (!upperBound) {
      if (lowerBound) {
        return lowerBoundFormatter(lowerBound, count)
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      return upperBoundFormatter(upperBound, count)
    }
    return rangeFormatter(lowerBound, upperBound, count)
  }

  render() {
    const { facet, applyFilter } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatterForMenu={this.formatFacetValueForMenu}
        facetValueFormatterForFilter={this.formatFacetValueForFilter}
        applyFilter={applyFilter}
      />
    )
  }
}
export default NumberRangeFacetSelectorComponent
