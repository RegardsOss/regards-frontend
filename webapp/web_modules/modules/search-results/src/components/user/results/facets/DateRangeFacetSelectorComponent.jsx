/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIFacet } from '../../../../models/facets/FacetShape'
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
    facet: UIFacet.isRequired, // granted to be a date range UI facet
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats facet value
   * @param {FacetValue} facetValue as returned by the backend
   * @return {string} value label
   */
  formatFacetValue = ({ lowerBound, upperBound, count }) => {
    const { intl: { formatMessage, formatDate, formatNumber } } = this.context
    if (!upperBound) {
      if (lowerBound) {
        // positive half infinite range
        return formatMessage({ id: 'search.facets.filter.menu.date.after' }, {
          date: formatDate(lowerBound, DATETIME_OPTIONS),
          count: formatNumber(count),
        })
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      // negative half infinite range
      return formatMessage({ id: 'search.facets.filter.menu.date.before' }, {
        date: formatDate(upperBound, DATETIME_OPTIONS),
        count: formatNumber(count),
      })
    }
    // bounded range
    if (lowerBound !== upperBound) {
      return formatMessage({ id: 'search.facets.filter.menu.date.range' }, {
        minDate: formatDate(lowerBound, DATETIME_OPTIONS),
        maxDate: formatDate(upperBound, DATETIME_OPTIONS),
        count: formatNumber(count),
      })
    }
    // single value
    return formatMessage({ id: 'search.facets.filter.menu.date.value' }, {
      date: formatDate(lowerBound, DATETIME_OPTIONS),
      count: formatNumber(count),
    })
  }

  render() {
    const { facet, onSelectFacet } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatter={this.formatFacetValue}
        onSelectFacet={onSelectFacet}
      />
    )
  }
}

export default DateRangeFacetSelectorComponent
