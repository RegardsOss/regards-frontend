/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * A column header cell wrapper rendering for FixedTable
 * @author Sébastien Binda
 */
class ColumnHeaderWrapper extends React.Component {
  static propTypes = {
    isLastColumn: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
  }


  render() {
    const { header: { cellHeader, lastCellHeader } } = this.context.moduleTheme
    const { isLastColumn, children } = this.props
    const cellStyle = isLastColumn ? lastCellHeader : cellHeader
    return (
      <div style={cellStyle} >
        {children}
      </div>
    )
  }
}

export default ColumnHeaderWrapper
