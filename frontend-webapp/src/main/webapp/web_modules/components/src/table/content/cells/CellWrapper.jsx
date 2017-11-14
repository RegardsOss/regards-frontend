/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import { Cell as FixedDataTableCell } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'

/**
 * Cell wrapper for every table cell: it renders itself for common styles then its children with following properties
 * - rowIndex: row index
 * - getEntity: () => entity
 * @author Sébastien binda
 */
class CellWrapper extends React.PureComponent {

  static propTypes = {
    rowIndex: PropTypes.number, // provided by React infinite
    lineHeight: PropTypes.number,
    isLastColumn: PropTypes.bool.isRequired,
    getEntity: PropTypes.func,
    // optional: cell content builder
    CellContentBuilder: PropTypes.func,
    // optional: cell props, containing an option style element (that will be consumed by this wrapper)
    // eslint-disable-next-line react/forbid-prop-types
    cellContentBuilderProps: PropTypes.object,
  }

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
    const { lineHeight, CellContentBuilder, cellContentBuilderProps = {}, rowIndex } = this.props

    // 1 - Select style
    let basicCellStyle
    if (this.props.rowIndex % 2) {
      // even cell
      basicCellStyle = this.props.isLastColumn ? styles.lastCellEven : styles.cellEven
    } else {
      // odd cell
      basicCellStyle = this.props.isLastColumn ? styles.lastCellOdd : styles.cellOdd
    }
    // merge styles with line height and cell wrapperStyle if any (those take precedence)
    const completeCellStyle = { height: lineHeight, ...basicCellStyle, ...(cellContentBuilderProps.wrapperStyle || {}) }

    // 2 - prepare table cell properties
    const cellProperties = omit(this.props, keys(CellWrapper.propTypes))

    // render
    return (
      <FixedDataTableCell {...cellProperties} >
        <div style={completeCellStyle}>
          { // render child cell content only when there is some entity and some constructor
            this.hasEntity() && CellContentBuilder ?
              <CellContentBuilder rowIndex={rowIndex} entity={this.getEntity()} {...cellContentBuilderProps} /> :
              null
          }
        </div>
      </FixedDataTableCell>
    )
  }
}

export default CellWrapper
