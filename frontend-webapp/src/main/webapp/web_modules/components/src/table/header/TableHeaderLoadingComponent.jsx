/**
* LICENSE_PLACEHOLDER
**/

import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Table loader component, shown in table sub header area
*/
class TableHeaderLoadingComponent extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context
    return (
      
    )
  }
}
export default TableHeaderLoadingComponent
