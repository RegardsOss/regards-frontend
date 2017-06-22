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
        bodyStyle={moduleTheme.dialog.body}
        contentStyle={moduleTheme.dialog.content}
        autoDetectWindowHeight
        repositionOnUpdate
        modal
        {...dialogProperties}
      >
        {children}
      </Dialog>
    )
  }
}

export default AuthenticationDialog
