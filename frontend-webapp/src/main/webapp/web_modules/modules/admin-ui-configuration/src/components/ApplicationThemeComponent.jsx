/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find  } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Save from 'material-ui/svg-icons/content/save'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import Paper from 'material-ui/Paper'
import { FormattedMessage } from 'react-intl'
import MaterialUiComponentsShowcase from '@regardsoss/components/src/MaterialUiComponentsShowcase'
import { ThemeList, defaultTheme } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { muiTheme } from '@regardsoss/vendors'
import moduleStyles from '../styles/styles'

/**
 * React component defining the user interface for customizing the themes of Regards.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeComponent extends React.Component {

  static propTypes = {
    themeList: ThemeList,
    currentTheme: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    onAdd: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onSave: React.PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      editingTheme: defaultTheme,
    }
  }

  onChange = (event, index, value) => this.setState({ editingTheme: find(this.props.themeList, theme => theme.content.id === value) })

  render() {
    const { onAdd, onClose, onSave, themeList } = this.props
    const { editingTheme } = this.state
    const previewWrapper = <MaterialUiComponentsShowcase />
    const themeConfigurer = muiTheme()(() => (previewWrapper))
    const style = moduleStyles(this.context.muiTheme).theme

    return (
      <Paper style={style.mainWrapper}>
        <Toolbar style={style.toolbar.root}>
          <ToolbarGroup firstChild>
            <IconButton onTouchTap={onClose}><Close color={style.toolbar.icon.color} /></IconButton>
            <ToolbarTitle
              text={<FormattedMessage id="application.theme.title" />}
              style={style.toolbar.title}
            />
            <DropDownMenu
              value={editingTheme.content.id}
              onChange={this.onChange}
              style={style.toolbar.themeDropDownMenu.style}
              labelStyle={style.toolbar.themeDropDownMenu.labelStyle}
            >
              {map(themeList, theme => (
                <MenuItem key={theme.content.id} value={theme.content.id} primaryText={theme.content.name} />
              ))}
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconButton
              onTouchTap={onSave}
              tooltip={<FormattedMessage id="application.theme.save" />}
            ><Save color={style.toolbar.icon.color} /></IconButton>
            <IconButton
              onTouchTap={onAdd}
              tooltip={<FormattedMessage id="application.theme.add" />}
            ><AddCircle color={style.toolbar.icon.color} /></IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div style={style.contentWrapper}>
          {themeConfigurer}
        </div>
      </Paper>
    )
  }
}

export default ApplicationThemeComponent
