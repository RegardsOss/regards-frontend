/**
 * LICENSE_PLACEHOLDER
 **/
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import ThemeCreateComponent from './ThemeCreateComponent'
import moduleStyles from '../styles/styles'
/**
 * Toolbar icon button for opening the dialog to create a theme.
 *
 * @author Xavier-Alexandre Brochard
 */
class CreateButton extends React.Component {

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
          tooltip={this.context.intl.formatMessage({ id: 'application.theme.create.tooltip' })}
        >
          <AddCircle color={style.toolbar.icon.color} />
        </IconButton>
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
