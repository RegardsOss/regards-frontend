/**
 * LICENSE_PLACEHOLDER
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
    const { onToggleRowSelection, rowIndex, ...otherProps } = this.props
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
          <Checkbox
            onCheck={() => onToggleRowSelection(rowIndex)}
            defaultChecked={this.isSelectedRow(rowIndex)}
          />
        </div>
      </Cell>
    )
  }

}

