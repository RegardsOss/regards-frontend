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
import flatMap from 'lodash/flatMap'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import { themeContextType } from '@regardsoss/theme'
import TableHeaderOptionsSeparator from './TableHeaderOptionsSeparator'

/**
 * Table header options area, to be used with tied options, as it allows separating groups (its children) from each other.
 * It is intended to receive TableHeaderOptionGroup as child (other types will also work though)
 * @author Raphaël Mechali
 */
class TableHeaderOptionsArea extends React.Component {
  static propTypes = {
    // expected options groups as children (this component will add separators)
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    SeparatorConstructor: PropTypes.func,
    reducible: PropTypes.bool,
    alignLeft: PropTypes.bool,
  }

  static defaultProps = {
    SeparatorConstructor: TableHeaderOptionsSeparator,
    reducible: false,
    alignLeft: false,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      children = null, SeparatorConstructor, reducible, alignLeft,
    } = this.props
    const { moduleTheme: { header: { optionsGroup: { fixedAreaStyle, reducibleLeftAreaStyle, reducibleRightAreaStyle } } } } = this.context

    let presentedChildren = children
    if (isArray(children)) {
      // 1 - filter only visible non null children (keep children that do not have show property)
      presentedChildren = flatMap(
        children.filter((child) => child && get(child, 'props.show', true)),
        // 2 - for each remaining child, add a separator if not the last one
        (visibleChild, index, array) => index < array.length - 1
          ? [visibleChild, <SeparatorConstructor key={`separator.${index}`} />] : [visibleChild],
      )
    }

    const reducibleStyle = alignLeft ? reducibleLeftAreaStyle : reducibleRightAreaStyle

    return (
      <div style={reducible ? reducibleStyle : fixedAreaStyle}>
        {
          presentedChildren
        }
      </div>
    )
  }
}
export default TableHeaderOptionsArea
