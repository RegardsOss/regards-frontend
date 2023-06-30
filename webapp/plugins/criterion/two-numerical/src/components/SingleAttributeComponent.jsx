/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Single attribute display component
 * @author Raphaël Mechali
 */
class SingleAttributeComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    searchAttribute: AttributeModelWithBounds.isRequired,
    error: PropTypes.bool.isRequired,
    min: PropTypes.string,
    max: PropTypes.string,
    onMinChanged: PropTypes.func.isRequired, // callback for value 1 updates, (number) => ()
    onMaxChanged: PropTypes.func.isRequired, // callback for value 2 updates, (number) => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Available comparison operators lower bound (greater than) */
  static LOWER_BOUND_OPERATORS = [CommonDomain.EnumNumericalComparator.GE]

  /** Available comparison operators lower bound (lesser than) */
  static UPPER_BOUND_OPERATORS = [CommonDomain.EnumNumericalComparator.LE]

  render() {
    const {
      label, searchAttribute, error, min, max,
      onMinChanged, onMaxChanged,
    } = this.props
    const { intl: { locale }, muiTheme } = this.context
    return (
      <>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
            {label[locale] || searchAttribute.label}
          </td>
          <NumericalCriterionComponent
            searchAttribute={searchAttribute}
            fieldBoundType={BOUND_TYPE.LOWER_BOUND}
            error={error}
            value={min}
            comparator={CommonDomain.EnumNumericalComparator.GE}
            availableComparators={SingleAttributeComponent.LOWER_BOUND_OPERATORS}
            onChange={onMinChanged}
          />
        </tr>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} />
          <NumericalCriterionComponent
            searchAttribute={searchAttribute}
            fieldBoundType={BOUND_TYPE.UPPER_BOUND}
            error={error}
            value={max}
            comparator={CommonDomain.EnumNumericalComparator.LE}
            availableComparators={SingleAttributeComponent.UPPER_BOUND_OPERATORS}
            onChange={onMaxChanged}
          />
        </tr>
      </>)
  }
}
export default SingleAttributeComponent
