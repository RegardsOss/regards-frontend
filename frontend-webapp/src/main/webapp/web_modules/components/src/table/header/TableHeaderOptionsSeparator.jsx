/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'

/**
* Table options separator
*/
class TableHeaderOptionsSeparator extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { header: { optionsGroup: { separatorStyle } } } } = this.context
    return (
      <div style={separatorStyle} />
    )
  }
}
export default TableHeaderOptionsSeparator

