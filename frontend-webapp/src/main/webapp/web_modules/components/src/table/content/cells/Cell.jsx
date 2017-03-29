/**
 * LICENSE_PLACEHOLDER
 **/
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import omit from 'lodash/omit'
import { Cell as FixedDataTableCell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display a cell into the table
 * @author Sébastien binda
 */
class Cell extends React.PureComponent {

  static propTypes = {
    rowIndex: React.PropTypes.number,
    isLastColumn: React.PropTypes.bool.isRequired,
    col: React.PropTypes.shape({
      attributes: React.PropTypes.arrayOf(React.PropTypes.string),
      label: React.PropTypes.string,
    }).isRequired,
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
    overridenCellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
    lineHeight: React.PropTypes.number,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getCellValue = (rowIndex, column) => {
    const { entities, lineHeight } = this.props
    const entity = entities[rowIndex]
    const rendererComponent = column.customCell
    if (entity && entity.content) {
      let i = 0
      // If a custom renderer is provided use it
      if (rendererComponent) {
        const attributes = {}
        for (i = 0; i < column.attributes.length; i += 1) {
          attributes[column.attributes[i]] = reduce(
            split(column.attributes[i], '.'),
            (result, value, key) => {
              if (result) {
                return result[value]
              }
              return null
            }, entity.content)
        }
        return React.createElement(rendererComponent.component, {
          attributes,
          entity,
          lineHeight,
          ...rendererComponent.props,
        })
      }
      // No custom component, render attribute as a string.
      let resultValue = ''
      for (i = 0; i < column.attributes.length; i += 1) {
        const attrValue = reduce(split(column.attributes[i], '.'), (result, value, key) => {
          if (result) {
            return result[value]
          }
          return ''
        }, entity.content)
        if (entity.content[column.attributes[i]]) {
          resultValue += ` ${attrValue}`
        } else {
          resultValue += ` ${attrValue}`
        }
      }
      return resultValue
    }
    return null
  }

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
        {...omit(this.props, 'entities', 'col', 'lineHeight', 'overridenCellsStyle', 'isLastColumn')}
      >
        <div style={cellContentStyle}>{attribute}</div>
      </FixedDataTableCell>
    )
  }
}

export default Cell
