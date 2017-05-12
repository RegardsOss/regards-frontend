/**
 * LICENSE_PLACEHOLDER
 **/
import omit from 'lodash/omit'
import { Cell as FixedDataTableCell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'
import ColumnConfigurationController from '../columns/model/ColumnConfigurationController'

/**
 * Display a cell into the table
 * @author Sébastien binda
 */
class Cell extends React.PureComponent {

  static propTypes = {
    rowIndex: PropTypes.number,
    isLastColumn: PropTypes.bool.isRequired,
    col: PropTypes.shape({
      attributes: PropTypes.arrayOf(PropTypes.string),
      label: PropTypes.string,
    }).isRequired,
    entities: PropTypes.arrayOf(PropTypes.object),
    overridenCellsStyle: PropTypes.objectOf(PropTypes.string),
    lineHeight: PropTypes.number,
    onToggleSelectRow: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getCellValue = (rowIndex, column) => {
    const { entities, lineHeight } = this.props
    const entity = entities[rowIndex]
    return ColumnConfigurationController.getConfiguredColumnValueForEntity(column, entity, lineHeight, this.isRowSelected(), this.handleToggleSelectRow)
  }

  handleToggleSelectRow = () => {
    Promise.resolve(this.props.onToggleSelectRow(this.props.rowIndex)).then(() => {
      // requires update as selection controller model is not included in this state
      this.forceUpdate()
    })
  }

  isRowSelected = () => this.props.isSelected(this.props.rowIndex)

  render() {
    const attribute = this.getCellValue(this.props.rowIndex, this.props.col)
    const styles = this.context.moduleTheme

    let cellStyle
    let cellContentStyle
    if (this.props.overridenCellsStyle) {
      cellStyle = this.props.overridenCellsStyle
      cellContentStyle = styles.cellEvenContent
    } else if (this.props.rowIndex % 2) {
      // even cell
      cellStyle = this.props.isLastColumn ? styles.lastCellEven : styles.cellEven
      cellContentStyle = styles.cellEvenContent
    } else {
      // odd cell
      cellStyle = this.props.isLastColumn ? styles.lastCellOdd : styles.cellOdd
      cellContentStyle = styles.cellOddContent
    }
    return (
      <FixedDataTableCell
        style={cellStyle}
        {...omit(this.props, 'entities', 'col', 'lineHeight', 'overridenCellsStyle', 'isLastColumn', 'isSelected', 'onToggleSelectRow')}
      >
        <div style={cellContentStyle}>{attribute}</div>
      </FixedDataTableCell>
    )
  }
}

export default Cell
