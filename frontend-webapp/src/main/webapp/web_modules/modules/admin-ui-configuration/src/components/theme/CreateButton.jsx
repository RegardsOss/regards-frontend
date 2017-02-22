/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { muiTheme } from '@regardsoss/vendors'
import ThemeCreateComponent from './ThemeCreateComponent'
import moduleStyles from '../../styles/styles'

/**
 * Toolbar icon button for opening the dialog to create a theme.
 *
 * @author Xavier-Alexandre Brochard
 */
class CreateButton extends React.Component {

  static propTypes = {
    onCreate: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    open: false,
  }

  onOpen = () => {
    this.setState({ open: true })
  }

  onClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { onCreate } = this.props
    const { open } = this.state
    const style = moduleStyles(this.context.muiTheme).theme

    return (
      <div>
        <IconButton
          onTouchTap={this.onOpen}
          tooltip={<FormattedMessage id="application.theme.create.tooltip"/>}
        ><AddCircle color={style.toolbar.icon.color}/></IconButton>
        <ThemeCreateComponent
          open={open}
          onRequestClose={this.onClose}
          onSubmit={onCreate}
        />
      </div>
    )
  }
}

export default CreateButton
