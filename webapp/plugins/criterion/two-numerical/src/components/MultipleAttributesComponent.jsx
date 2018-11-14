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
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { AttributeModelWithBounds, BOUND_TYPE } from '@regardsoss/plugins-api'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'

/**
 * Multiple attributes display component
 * @author Raphaël Mechali
 */
class MultipleAttributesComponent extends React.Component {
  static propTypes = {
    // first attribute, corresponding state elements and callback
    attribute1: AttributeModelWithBounds.isRequired,
    value1: PropTypes.number,
    comparator1: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    availableComparators1: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    onChangeValue1: PropTypes.func.isRequired, // callback for attribute 1 updates, (number, comparator) => ()

    // second attribute, corresponding state elements and callback
    attribute2: AttributeModelWithBounds.isRequired,
    value2: PropTypes.number,
    comparator2: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    availableComparators2: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    onChangeValue2: PropTypes.func.isRequired, // callback for attribute 2 updates, (number, comparator) => ()
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      attribute1, value1, comparator1, availableComparators1, onChangeValue1,
      attribute2, value2, comparator2, availableComparators2, onChangeValue2,
    } = this.props
    const { moduleTheme: { rootStyle } } = this.context
    return (
      <div style={rootStyle}>
        <NumericalCriteriaComponent
          searchAttribute={attribute1}
          fieldBoundType={BOUND_TYPE.ANY_BOUND}
          value={value1}
          comparator={comparator1}
          availableComparators={availableComparators1}
          onChange={onChangeValue1}
          showAttributeLabel
          showComparator
        />
        <NumericalCriteriaComponent
          searchAttribute={attribute2}
          fieldBoundType={BOUND_TYPE.ANY_BOUND}
          value={value2}
          comparator={comparator2}
          availableComparators={availableComparators2}
          onChange={onChangeValue2}
          showAttributeLabel
          showComparator
        />
      </div>
    )
  }
}
export default MultipleAttributesComponent
