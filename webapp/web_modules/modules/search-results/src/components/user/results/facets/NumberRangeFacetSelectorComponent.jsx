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
import isNil from 'lodash/isNil'
import { i18nContextType } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { UIFacet } from '../../../../models/facets/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/** Const for no unit */
const NO_UNIT = 'unitless'

/**
 * Number facet selector
 * @author Raphaël Mechali
 */
class NumberRangeFacetSelectorComponent extends React.Component {
  static propTypes = {
    facet: UIFacet.isRequired, // granted to be a number range UI facet
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats a value
   * @return {string} formatted value
   */
  formatValue = (value) => {
    const { facet: { unit } } = this.props
    const { intl: { formatMessage, formatNumber } } = this.context
    // has both a value and a unit?
    if (unit && unit !== NO_UNIT && !isNil(value)) {
      // this value has a unit: show value and unit
      const storageUnit = storage.StorageUnitScale.getMatchingUnit(unit)
      if (storageUnit) { // storage unit: scale and showyes
        const valueWithUnit = new storage.StorageCapacity(value, storageUnit).scaleAndConvert(storageUnit.scale)
        return storage.formatStorageCapacity(formatMessage, formatNumber, valueWithUnit)
      }
      // unhandled unit type: show directly
      return `${value}${unit}`
    }
    // no: return value (undefined if it is, number otherwise)
    return value
  }


  /**
   * Formats facet value
   * @param {FacetValue} facetValue as returned by the backend
   * @return {string} value label
   */
  formatFacetValue = ({ lowerBound, upperBound, count }) => {
    const { intl: { formatMessage } } = this.context
    const minValue = this.formatValue(lowerBound)
    const maxValue = this.formatValue(upperBound)
    if (!maxValue) {
      if (minValue) {
        return formatMessage({ id: 'search.facets.filter.menu.number.greater' }, { value: minValue, count })
      }
      return '' // infinite range...
    }
    if (!minValue) {
      return formatMessage({ id: 'search.facets.filter.menu.number.lower' }, { value: maxValue, count })
    }
    if (minValue === maxValue) {
      return formatMessage({ id: 'search.facets.filter.menu.number.value' }, { value: minValue, count })
    }
    return formatMessage({ id: 'search.facets.filter.menu.number.range' }, { minValue, maxValue, count })
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
export default NumberRangeFacetSelectorComponent
