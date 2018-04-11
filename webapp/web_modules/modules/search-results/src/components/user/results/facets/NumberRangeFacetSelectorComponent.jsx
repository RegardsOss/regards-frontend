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
import { NumberRangeFacet } from '../../../../models/facets/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/**
* Range facet selector
*/
class NumberRangeFacetSelectorComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line
    facet: NumberRangeFacet.isRequired, // seriously eslint sux on PropTypes...
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
    return this.formatFacetValue(
      facet,
      (value, count) => formatMessage({ id: 'search.facets.filter.menu.number.greater' }, { value, count }),
      (value, count) => formatMessage({ id: 'search.facets.filter.menu.number.lower' }, { value, count }),
      (minValue, maxValue, count) => {
        if (minValue !== maxValue) {
          return formatMessage({ id: 'search.facets.filter.menu.number.range' }, { minValue, maxValue, count })
        }
        return formatMessage({ id: 'search.facets.filter.menu.number.value' }, { value: minValue, count })
      },
    )
  }

  formatFacetValueForFilter = (label, facet) => {
    const { intl: { formatMessage } } = this.context
    return this.formatFacetValue(
      facet,
      value => formatMessage({ id: 'search.facets.filter.chip.number.greater' }, { label, value }),
      value => formatMessage({ id: 'search.facets.filter.chip.number.lower' }, { label, value }),
      (minValue, maxValue) => {
        if (minValue !== maxValue) {
          return formatMessage({ id: 'search.facets.filter.chip.number.range' }, { label, minValue, maxValue })
        }
        return formatMessage({ id: 'search.facets.filter.chip.number.value' }, { label, value: minValue })
      },
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
export default NumberRangeFacetSelectorComponent
