/**
 * LICENSE_PLACEHOLDER
 */
import Dialog from 'material-ui/Dialog'
import { themeContextType } from '@regardsoss/theme'

/**
 * Dialog container for authentication
 * @author Sébastien binda
 */
class AuthenticationDialog extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { children, ...dialogProperties } = this.props
    const { moduleTheme } = this.context
    return (
      <Dialog
        bodyStyle={{ padding: '0', overflowY: 'none' }}
        contentStyle={{
          width: moduleTheme.authenticationDialog.preferredWidth,
          maxWidth: 'none',
        }}
        {...dialogProperties}
      >
        {children}
      </Dialog>
    )
  }
}

export default AuthenticationDialog
