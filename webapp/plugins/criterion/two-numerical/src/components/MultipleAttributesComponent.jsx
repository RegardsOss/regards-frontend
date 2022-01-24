/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AttributeModelWithBounds, BOUND_TYPE } from '@regardsoss/plugins-api'
import NumericalCriterionComponent from './NumericalCriterionComponent'

/**
 * Multiple attributes display component
 * @author Raphaël Mechali
 */
class MultipleAttributesComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,

    // first attribute, corresponding state elements and callback
    error1: PropTypes.bool.isRequired,
    attribute1: AttributeModelWithBounds.isRequired,
    value1: PropTypes.string,
    comparator1: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    availableComparators1: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    onValue1Changed: PropTypes.func.isRequired, // callback for attribute 1 updates, (number, comparator) => ()

    // second attribute, corresponding state elements and callback
    error2: PropTypes.bool.isRequired,
    attribute2: AttributeModelWithBounds.isRequired,
    value2: PropTypes.string,
    comparator2: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    availableComparators2: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    onValue2Changed: PropTypes.func.isRequired, // callback for attribute 2 updates, (number, comparator) => ()
  }

  static contextTypes = {
    ...themeContextType,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      label,
      attribute1, error1, value1, comparator1, availableComparators1, onValue1Changed,
      attribute2, error2, value2, comparator2, availableComparators2, onValue2Changed,
    } = this.props
    const { intl: { locale }, muiTheme } = this.context
    return (
      <>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
            { label[locale] || attribute1.label }
          </td>
          <NumericalCriterionComponent
            searchAttribute={attribute1}
            fieldBoundType={BOUND_TYPE.ANY_BOUND}
            error={error1}
            value={value1}
            comparator={comparator1}
            availableComparators={availableComparators1}
            onChange={onValue1Changed}
          />
        </tr>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
            { // When label is provided, show empty cell. Show second attribute label otherwise
            label[locale] ? null : attribute2.label
          }
          </td>
          <NumericalCriterionComponent
            searchAttribute={attribute2}
            fieldBoundType={BOUND_TYPE.ANY_BOUND}
            error={error2}
            value={value2}
            comparator={comparator2}
            availableComparators={availableComparators2}
            onChange={onValue2Changed}
          />
        </tr>
      </>)
  }
}
export default MultipleAttributesComponent
