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
import { SelectedNumberRangeFacet } from '../../../../../models/facets/FacetShape'
import SelectedFacetComponent from './SelectedFacetComponent'

const NO_UNIT = 'unitless'

/**
 * Selected boolean facet display component
 * @author Raphaël Mechali
 */
class SelectedNumberRangeFacetComponent extends React.Component {
  static propTypes = {
    selectedFacet: SelectedNumberRangeFacet.isRequired,
    onUnselectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats a value
   * @return {string} formatted value
   */
  formatValue = (value) => {
    const { selectedFacet: { unit } } = this.props
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
   * Formats this selected facet label
   * @return {string} formatted label to be displayed by the delegate component
   */
  buildLabel = () => {
    const { selectedFacet: { label, value: { lowerBound, upperBound } } } = this.props
    const { intl: { locale, formatMessage } } = this.context
    const attributeLabel = label[locale]
    const minValue = this.formatValue(lowerBound)
    const maxValue = this.formatValue(upperBound)
    if (!maxValue) {
      if (minValue) {
        return formatMessage({ id: 'search.facets.filter.chip.number.greater' }, {
          label: attributeLabel,
          value: minValue,
        })
      }
      return '' // infinite range...
    }
    if (!minValue) {
      return formatMessage({ id: 'search.facets.filter.chip.number.lower' }, {
        label: attributeLabel,
        value: maxValue,
      })
    }
    if (minValue === maxValue) {
      return formatMessage({ id: 'search.facets.filter.chip.number.value' }, {
        label: attributeLabel,
        value: minValue,
      })
    }
    return formatMessage({ id: 'search.facets.filter.chip.number.range' }, {
      label: attributeLabel,
      minValue,
      maxValue,
    })
  }

  render() {
    const { selectedFacet, onUnselectFacet } = this.props
    return (
      <SelectedFacetComponent
        label={this.buildLabel()}
        selectedFacet={selectedFacet}
        onUnselectFacet={onUnselectFacet}
      />
    )
  }
}
export default SelectedNumberRangeFacetComponent
