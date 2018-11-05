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
import get from 'lodash/get'
import { themeContextType } from '@regardsoss/theme'


const NO_PROPS = {}

/**
 * A column header cell wrapper rendering for FixedTable. It always provides column label to children columns
 * @author Sébastien Binda
 */
class ColumnHeaderWrapper extends React.Component {
  static propTypes = {
    isLastColumn: PropTypes.bool.isRequired,
    columnKey: PropTypes.string.isRequired,
    label: PropTypes.string,
    headerCellDefinition: PropTypes.shape({
      Constructor: PropTypes.func,
      props: PropTypes.object,
    }),
  }

  static contextTypes = {
    ...themeContextType,
  }


  render() {
    const {
      isLastColumn, label, headerCellDefinition, columnKey,
    } = this.props
    const { header: { cellHeader, lastCellHeader } } = this.context.moduleTheme
    const cellStyle = isLastColumn ? lastCellHeader : cellHeader
    const InnerHeader = get(headerCellDefinition, 'Constructor', null)
    const innerHeaderProps = get(headerCellDefinition, 'props', NO_PROPS)
    return (
      <div style={cellStyle}>
        { /** Render configured header if any */
          InnerHeader ? (
            <InnerHeader
              columnKey={columnKey}
              label={label}
              {...innerHeaderProps}
            />) : null
        }
      </div>
    )
  }
}

export default ColumnHeaderWrapper
