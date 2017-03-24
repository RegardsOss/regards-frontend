/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import Ticked from 'material-ui/svg-icons/toggle/check-box'
import Unticked from 'material-ui/svg-icons/toggle/check-box-outline-blank'

/**
* Shows a checkbox column header cell, sitching selection modes and selected object as follow:
* - Initially, or when AT LEAST one object is not selected: Show select all. Clicking that option will result
* in listing the non selected objects
* - When all objects are selected, in list non selected objects, shows unselect all. Clicking that option will result
*/
class FixedTableCheckboxHeaderCellComponent extends React.Component {

  static propTypes = {
    lineHeight: React.PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { fixedCellHeader } = this.context.moduleTheme
    const cellStyle = fixedCellHeader
    const { lineHeight } = this.props
    const height = `${lineHeight - 1}px`
    const minHeight = `${lineHeight - 1}px`
    return (
      <div style={{ ...cellStyle, height, minHeight }} />
    )
  }
}
export default FixedTableCheckboxHeaderCellComponent
