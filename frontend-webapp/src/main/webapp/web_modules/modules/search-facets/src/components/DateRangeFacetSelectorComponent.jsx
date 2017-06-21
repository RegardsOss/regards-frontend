/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import { DateRangeFacet } from '../model/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

const DATETIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

/**
* Range facet selector
*/
class DateRangeFacetSelectorComponent extends React.Component {

  static propTypes = {
    facet: DateRangeFacet.isRequired,
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
      (date, count) => formatMessage({ id: 'search.facets.filter.menu.date.after' }, { date, count }),
      (date, count) => formatMessage({ id: 'search.facets.filter.menu.date.before' }, { date, count }),
      (minDate, maxDate, count) => formatMessage({ id: 'search.facets.filter.menu.date.range' }, { minDate, maxDate, count }),
    )
  }

  formatFacetValueForFilter = (label, facet) => {
    const { intl: { formatMessage } } = this.context
    return this.formatFacetValue(facet,
      date => formatMessage({ id: 'search.facets.filter.chip.date.after' }, { label, date }),
      date => formatMessage({ id: 'search.facets.filter.chip.date.before' }, { label, date }),
      (minDate, maxDate) => formatMessage({ id: 'search.facets.filter.chip.date.range' }, { label, minDate, maxDate }),
    )
  }

  formatFacetValue = ({ lowerBound, upperBound, count }, lowerBoundFormatter, upperBoundFormatter, rangeFormatter) => {
    const { intl: { formatDate, formatNumber } } = this.context
    if (!upperBound) {
      if (lowerBound) {
        return lowerBoundFormatter(formatDate(lowerBound, DATETIME_OPTIONS), formatNumber(count))
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      return upperBoundFormatter(formatDate(upperBound, DATETIME_OPTIONS), formatNumber(count))
    }
    return rangeFormatter(formatDate(lowerBound, DATETIME_OPTIONS), formatDate(upperBound, DATETIME_OPTIONS), count)
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
export default DateRangeFacetSelectorComponent
