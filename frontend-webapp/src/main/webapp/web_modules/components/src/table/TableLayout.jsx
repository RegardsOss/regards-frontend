/**
* LICENSE_PLACEHOLDER
**/
import compose from 'lodash/fp/compose'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { withI18n } from '@regardsoss/i18n'
import styles from './styles'
import messages from './i18n'
import valuesStyles from '../values/styles'
import valuesMessages from '../values/i18n'

/** Local context: table and values styles */
const tableStyles = {
  styles: theme => ({
    ...styles.styles(theme),
    ...valuesStyles.styles(theme),
  }),
}

/** Local context: table and values message */
const tableMessages = {
  en: { ...messages.en, ...valuesMessages.en },
  fr: { ...messages.fr, ...valuesMessages.fr },
}

/**
 * Fixed table layout Component: put there children that will be part of the table. They will be layout as vertical rows
 * Note: It keeps the calling context, so that any components it displays will not have to change the context!
 * Note 2: It provides both table and values render context, to use the values render as not connected (better overall
 * performances in table)
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
        {
          children
        }
      </div>
    )
  }
}

// Compose styles and messages with calling context => any component below will have both
export default compose(withI18n(tableMessages, true), withModuleStyle(tableStyles, true))(TableLayout)
