/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'

/**
* Table options separator
*/
class TableOptionsSeparator extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { header: { contextOptionsSeparator } } = this.context.moduleTheme
    return (
      <vr style={contextOptionsSeparator.styles} />
    )
  }
}
export default TableOptionsSeparator

