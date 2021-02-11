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
import { Cell as FixedDataTableCell } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'
import { CellDefinition } from '../columns/model/TableColumnConfiguration'

const NO_PROPS = {}

/**
 * Cell wrapper for every table cell: it renders itself for common styles then its children with following properties
 * - rowIndex: row index
 * - getEntity: () => entity
 * @author Sébastien binda
 */
class CellWrapper extends React.Component {
  static propTypes = {
    stripeRows: PropTypes.bool,
    rowIndex: PropTypes.number, // provided by React infinite
    lineHeight: PropTypes.number,
    isLastColumn: PropTypes.bool.isRequired,
    getEntity: PropTypes.func,
    rowCellDefinition: CellDefinition.isRequired,
  }

  /** List of prop types that should not be reported to child */
  static NON_REPORTED_PROPS = [
    'stripeRows',
    'lineHeight',
    'isLastColumn',
    'getEntity',
    'rowCellDefinition',
  ]

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @return row entity or null
   */
  getEntity = () => {
    const { rowIndex, getEntity } = this.props
    return getEntity(rowIndex)
  }

  /**
   * Is there an entity on this cell row?
   * @return if there is an entity on cell row
   */
  hasEntity = () => !!this.getEntity()

  render() {
    // render with styles
    const styles = this.context.moduleTheme
    const {
      isLastColumn, lineHeight, stripeRows,
      rowCellDefinition: { Constructor, props = NO_PROPS }, rowIndex,
    } = this.props

    // 1 - Select style
    let basicCellStyle
    if (!stripeRows || rowIndex % 2) {
      // even cell
      basicCellStyle = isLastColumn ? styles.lastCellEven : styles.cellEven
    } else {
      // odd cell
      basicCellStyle = isLastColumn ? styles.lastCellOdd : styles.cellOdd
    }
    // merge styles with line height and cell wrapperStyle if any (those take precedence)
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const completeCellStyle = { height: lineHeight, ...basicCellStyle, ...(props.wrapperStyle || {}) } // eslint wont fix: runtime data merged with context..

    // 2 - prepare table cell properties
    const cellProperties = omit(this.props, CellWrapper.NON_REPORTED_PROPS)

    // render
    return (
      <FixedDataTableCell {...cellProperties}>
        <div style={completeCellStyle}>
          { // render child cell content only when there is some entity and some constructor
            this.hasEntity() && Constructor ? (
              <Constructor
                rowIndex={rowIndex}
                entity={this.getEntity()}
                {...props}
              />) : null
          }
        </div>
      </FixedDataTableCell>
    )
  }
}

export default CellWrapper
