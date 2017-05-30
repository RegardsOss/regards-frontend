/**
 * LICENSE_PLACEHOLDER
 */
import Dialog from 'material-ui/Dialog'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Dialog container for authentication
 * @author Sébastien binda
 */
class AuthenticationDialog extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { children, ...dialogProperties } = this.props
    const { moduleTheme } = this.context
    return (
      <Dialog
        bodyStyle={{ padding: '0', overflowY: 'none' }}
        contentStyle={{
          width: moduleTheme.dialog.preferredWidth,
          maxWidth: 'none',
        }}
        autoDetectWindowHeight
        repositionOnUpdate
        {...dialogProperties}
      >
        {children}
      </Dialog>
    )
  }
}

export default AuthenticationDialog
