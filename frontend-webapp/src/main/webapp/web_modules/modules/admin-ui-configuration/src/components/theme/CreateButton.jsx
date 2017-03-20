/**
 * LICENSE_PLACEHOLDER
 **/
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { HateoasIconAction, HateoasKeys, HateoasLinks } from '@regardsoss/display-control'
import ThemeCreateComponent from './ThemeCreateComponent'
import moduleStyles from '../../styles/styles'

/**
 * Toolbar icon button for opening the dialog to create a theme.
 *
 * @author Xavier-Alexandre Brochard
 */
class CreateButton extends React.Component {

  static propTypes = {
    onCreate: React.PropTypes.func.isRequired,
    entityLinks: React.PropTypes.arrayOf(HateoasLinks).isRequired,
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
        <HateoasIconAction
          entityLinks={this.props.entityLinks}
          hateoasKey={HateoasKeys.CREATE}
          onTouchTap={this.onOpen}
          tooltip={<FormattedMessage id="application.theme.create.tooltip" />}
        ><AddCircle color={style.toolbar.icon.color} /></HateoasIconAction>
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
