/**
 * LICENSE_PLACEHOLDER
 **/
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { themeContextType, ThemeActions } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
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
        <HateoasDisplayDecorator
          requiredEndpoints={[ThemeActions.getDependency(RequestVerbEnum.POST)]}
        >
          <IconButton
            onTouchTap={this.onOpen}
            tooltip={this.context.intl.formatMessage({ id: 'application.theme.create.tooltip' })}
          >
            <AddCircle color={style.toolbar.icon.color} />
          </IconButton>
        </HateoasDisplayDecorator>
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
