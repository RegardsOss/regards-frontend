/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import omit from 'lodash/omit'
import EqualIcon from 'mdi-material-ui/EqualBox'
import GreaterThanIcon from 'mdi-material-ui/CodeGreaterThan'
import LesserThanIcon from 'mdi-material-ui/CodeLessThan'
import { CommonDomain } from '@regardsoss/domain'
import IconElementSelector from './IconElementSelector'

/**
 * Numerical comparator selector
 * @author Raphaël Mechali
 */
export class NumericalComparatorSelector extends React.Component {
  static propTypes = {
    // selected operator
    operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    // selected operators (maybe a sublist of [LE, GE, EQ])
    operators: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)),
    // selection callback, like (operator) => ()
    onSelect: PropTypes.func.isRequired,
    // Other props: provided to IconElementSelector
  }

  static defaultProps = {
    // all operators by default
    operators: [
      CommonDomain.EnumNumericalComparator.LE,
      CommonDomain.EnumNumericalComparator.EQ,
      CommonDomain.EnumNumericalComparator.GE,
    ],
  }

  /** List of locally consumed properties, that should not be reported to delegate IconButton */
  static NON_REPORTED_PROPS = ['operator', 'operators', 'onSelect']

  /** Graphics definition by comparator type */
  static COMPARATORS_DEFINITION = {
    [CommonDomain.EnumNumericalComparator.EQ]: {
      IconConstructor: EqualIcon,
      labelKey: 'numerical.comparator.selector.EQ.label',
      tooltipKey: 'numerical.comparator.selector.EQ.tooltip',
    },
    [CommonDomain.EnumNumericalComparator.LE]: {
      IconConstructor: LesserThanIcon,
      labelKey: 'numerical.comparator.selector.LE.label',
      tooltipKey: 'numerical.comparator.selector.LE.tooltip',
    },
    [CommonDomain.EnumNumericalComparator.GE]: {
      IconConstructor: GreaterThanIcon,
      labelKey: 'numerical.comparator.selector.GE.label',
      tooltipKey: 'numerical.comparator.selector.GE.tooltip',
    },
  }

  render() {
    const { operator, operators, onSelect } = this.props
    return (
      <IconElementSelector
        value={operator}
        choices={operators}
        choiceGraphics={NumericalComparatorSelector.COMPARATORS_DEFINITION}
        onChange={onSelect}
        {...omit(this.props, NumericalComparatorSelector.NON_REPORTED_PROPS)}
      />)
  }
}
export default NumericalComparatorSelector
