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
import { themeContextType } from '@regardsoss/theme'

/**
 * Contains a group of options (to be used in a table header options area)
 * @author Raphaël Mechali
 */
class TableHeaderOptionGroup extends React.Component {
  static propTypes = {
    // expected options as children
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    show: PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    show: true,
  }

  render() {
    const { moduleTheme: { header: { optionsGroup: { groupStyle } } } } = this.context
    const { show, children } = this.props
    return show ? (<div style={groupStyle}>{children}</div>) : null
  }
}
export default TableHeaderOptionGroup
