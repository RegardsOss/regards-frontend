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
    applyFilter: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  formatFacetValue = ({ lowerBound, upperBound, count }) => {
    const { intl: { formatDate, formatMessage, formatNumber } } = this.context
    if (!upperBound) {
      if (lowerBound) {
        return formatMessage({ id: 'search.facets.filter.date.after' }, {
          date: formatDate(lowerBound, DATETIME_OPTIONS),
          count: formatNumber(count),
        })
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      return formatMessage({ id: 'search.facets.filter.date.before' }, {
        date: formatDate(upperBound, DATETIME_OPTIONS),
        count: formatNumber(count),
      })
    }
    return formatMessage({ id: 'search.facets.filter.date.range' }, {
      minDate: formatDate(lowerBound, DATETIME_OPTIONS),
      maxDate: formatDate(upperBound, DATETIME_OPTIONS),
      count: formatNumber(count),
    })
  }

  render() {
    const { facet, applyFilter } = this.props
    return (
      <FacetSelectorComponent
        facetValueFormatter={this.formatFacetValue}
        facet={facet}
        applyFilter={applyFilter}
      />
    )
  }
}
export default DateRangeFacetSelectorComponent
