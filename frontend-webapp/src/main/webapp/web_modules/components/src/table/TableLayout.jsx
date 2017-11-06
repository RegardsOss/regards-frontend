/**
* LICENSE_PLACEHOLDER
**/
import compose from 'lodash/fp/compose'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from './styles'

/**
 * Fixed table layout Component: put there children that will be part of the table. They will be layout as vertical rows
 * Note: changes style and i18n context
 */
export class TableLayout extends React.Component {

  static propTypes = {
    // should be header rows. Remind about setting keys onto the children
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { children } = this.props
    const { moduleTheme: { header } } = this.context
    return (
      <div style={header.rootStyle}>
        { // render each row then a bottom separator
          children
        }
      </div>
    )
  }
}


export default compose(withModuleStyle(styles))(TableLayout)
