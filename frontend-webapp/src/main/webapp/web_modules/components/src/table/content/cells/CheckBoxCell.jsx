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
import values from 'lodash/values'
import omit from 'lodash/omit'
import Checkbox from 'material-ui/Checkbox'
import { Cell } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'
import TableSelectionModes from '../../model/TableSelectionModes'


/**
 * A checkbox cell for infinite table
 */
export default class CheckBoxCell extends React.Component {

  static propTypes = {
    hasEntity: PropTypes.func,
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    rowIndex: PropTypes.number,
    onToggleRowSelection: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
  }

  onToggleRowSelection = rowIndex => this.props.onToggleRowSelection(rowIndex)

  /**
   * Is row as parameter selected?
   * @param rowIndex row index
   * @return true if row is selected
   */
  isSelectedRow = (rowIndex) => {
    const { selectionMode, toggledElements } = this.props
    return (selectionMode === TableSelectionModes.includeSelected && !!toggledElements[rowIndex]) ||
      (selectionMode === TableSelectionModes.excludeSelected && !toggledElements[rowIndex])
  }

  render() {
    const { onToggleRowSelection, rowIndex, hasEntity, ...otherProps } = this.props
    const styles = this.context.moduleTheme

    let cellStyle = styles.cellOdd
    let cellContentStyle = styles.cellOddContent
    if (rowIndex % 2) {
      cellStyle = styles.cellEven
      cellContentStyle = styles.cellEvenContent
    }

    const childrenProps = omit(otherProps, 'toggledElements', 'selectionMode')

    return (
      <Cell
        {...childrenProps}
        style={cellStyle}
      >
        <div style={cellContentStyle}>
          {
            hasEntity(rowIndex) ?
              <Checkbox
                onCheck={() => onToggleRowSelection(rowIndex)}
                defaultChecked={this.isSelectedRow(rowIndex)}
              /> : null
          }
        </div>
      </Cell>
    )
  }

}

