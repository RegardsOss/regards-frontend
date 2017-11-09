/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { DateRangeFacet } from '../../../../models/facets/FacetShape'
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
* @author Raphaël Mechali
*/
class DateRangeFacetSelectorComponent extends React.Component {

  static propTypes = {
    facet: DateRangeFacet.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
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
      (minDate, maxDate, count) => {
        if (minDate !== maxDate) {
          return formatMessage({ id: 'search.facets.filter.menu.date.range' }, { minDate, maxDate, count })
        }
        return formatMessage({ id: 'search.facets.filter.menu.date.value' }, { date: minDate, count })
      },
    )
  }

  formatFacetValueForFilter = (label, facet) => {
    const { intl: { formatMessage } } = this.context
    return this.formatFacetValue(facet,
      date => formatMessage({ id: 'search.facets.filter.chip.date.after' }, { label, date }),
      date => formatMessage({ id: 'search.facets.filter.chip.date.before' }, { label, date }),
      (minDate, maxDate) => {
        if (minDate !== maxDate) {
          return formatMessage({ id: 'search.facets.filter.chip.date.range' }, { label, minDate, maxDate })
        }
        return formatMessage({ id: 'search.facets.filter.chip.date.value' }, { label, date: minDate })
      },
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
    const { facet, onSelectFacet } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatterForMenu={this.formatFacetValueForMenu}
        facetValueFormatterForFilter={this.formatFacetValueForFilter}
        onSelectFacet={onSelectFacet}
      />
    )
  }
}

export default DateRangeFacetSelectorComponent
