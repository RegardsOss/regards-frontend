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
import { NumberRangeFacet } from '../../../../models/facets/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/** Const for no unit */
const NO_UNIT = 'unitless'

/**
 * Number facet selector
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

  /** Messages for facet chip label */
  static CHIP_MESSAGES = {
    greaterThan: 'search.facets.filter.chip.number.greater',
    lowerThan: 'search.facets.filter.chip.number.lower',
    inRange: 'search.facets.filter.chip.number.range',
    equal: 'search.facets.filter.chip.number.value',
  }


  /** Messages for facet menu label */
  static MENU_MESSAGES = {
    greaterThan: 'search.facets.filter.menu.number.greater',
    lowerThan: 'search.facets.filter.menu.number.lower',
    inRange: 'search.facets.filter.menu.number.range',
    equal: 'search.facets.filter.menu.number.value',
  }

  /**
   * Formats a value
   * @return {string} formatted value
   */
  formatValue = (value) => {
    const { unit } = this.props.facet
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
   * Formats facet value to display it in menu
   * @return {string} formatted facet value for menu display
   */
  formatFacetValueForMenu = (label, facet) =>
    this.formatFacetValue(label, facet, NumberRangeFacetSelectorComponent.MENU_MESSAGES)

  /**
   * Formats facet value to display it as a chip
   * @return {string} formatted facet value for chip display
   */
  formatFacetValueForFilter = (label, facet) =>
    this.formatFacetValue(label, facet, NumberRangeFacetSelectorComponent.CHIP_MESSAGES)

  /**
   * Formats a facet value using facet label, bounds values, count and messages pool (messages parameters MUST be
   * label / value / count or label / minValue / maxValue / count for a range)
   * @param {string} label facet label
   * @param {*} facet facet value to format
   * @param {*} messages messages pool with keys 'greaterThan', 'lowerThan', 'inRange' and 'equal. See comment above for
   * allowed parameters in messages
   * @return {string} formatted label
   */
  formatFacetValue = (label, { lowerBound, upperBound, count },
    {
      greaterThan, lowerThan, inRange, equal,
    }) => {
    const { intl: { formatMessage } } = this.context
    const minValue = this.formatValue(lowerBound)
    const maxValue = this.formatValue(upperBound)
    if (!maxValue) {
      if (minValue) {
        return formatMessage({ id: greaterThan }, { label, value: minValue, count })
      }
      return '' // infinite range...
    }
    if (!minValue) {
      return formatMessage({ id: lowerThan }, { label, value: maxValue, count })
    }
    if (minValue === maxValue) {
      return formatMessage({ id: equal }, { label, value: minValue, count })
    }
    return formatMessage({ id: inRange }, {
      label, minValue, maxValue, count,
    })
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
