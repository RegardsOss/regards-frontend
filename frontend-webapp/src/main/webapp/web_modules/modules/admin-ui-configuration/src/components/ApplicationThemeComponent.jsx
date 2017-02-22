/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find, isEmpty, isUndefined } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Save from 'material-ui/svg-icons/content/save'
import Delete from 'material-ui/svg-icons/action/delete'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { FormattedMessage } from 'react-intl'
import MaterialUiComponentsShowcase from './MaterialUiComponentsShowcase'
import { ShowableAtRender } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ThemeList, defaultTheme } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { muiTheme } from '@regardsoss/vendors'
import DeleteButton from './theme/DeleteButton'
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
    onDelete: React.PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
    themeList: {},
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      editingTheme: props.currentTheme,
      snackBarOpen: false,
      snackBarMessageId: 'application.theme.save.success',
    }
  }

  onThemeSelect = (event, index, value) => this.setState({ editingTheme: find(this.props.themeList, theme => theme.content.id === value) })

  onThemeOverride = (theme) => {
    const newEditingTheme = this.state.editingTheme
    newEditingTheme.content.configuration = theme
    this.setState({
      editingTheme: newEditingTheme,
    })
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  handleSnackbarActionTouchTap = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  onSave = (theme) => {
    const { onSave } = this.props
    onSave(theme).then(actionResult => this.setState({
      snackBarOpen: true,
      snackBarMessageId: !actionResult.error ? 'application.theme.save.success' : 'application.theme.save.error'
    }))
  }

  onDelete = (theme) => {
    const { onDelete } = this.props
    onDelete(theme).then(actionResult => this.setState({
      snackBarOpen: true,
      snackBarMessageId: !actionResult.error ? 'application.theme.remove.success' : 'application.theme.remove.error'
    }))
  }

  render() {
    const { themeList, onAdd, onClose, isFetching } = this.props
    const { editingTheme, snackBarOpen, snackBarMessageId } = this.state
    const isThemeListEmpty = isEmpty(themeList)
    const previewWrapper = <MaterialUiComponentsShowcase />
    const style = moduleStyles(this.context.muiTheme).theme

    let themeForDecorator = editingTheme.content.configuration
    themeForDecorator.themeName = editingTheme.content.name
    const themeConfigurer = muiTheme(themeForDecorator, this.onThemeOverride)(() => (previewWrapper))

    const addButton = (
      <IconButton
        onTouchTap={onAdd}
        tooltip={<FormattedMessage id="application.theme.add"/>}
      ><AddCircle color={style.toolbar.icon.color}/></IconButton>
    )

    const saveButton = (
      <IconButton
        onTouchTap={() => this.onSave(editingTheme)}
        tooltip={<FormattedMessage id="application.theme.save"/>}
      ><Save color={style.toolbar.icon.color}/></IconButton>
    )

    const deleteButton = <DeleteButton onDelete={() => this.onDelete(editingTheme)} />

    const themeSelect = (
      <DropDownMenu
        value={editingTheme.content.id}
        onChange={this.onThemeSelect}
        style={style.toolbar.themeDropDownMenu.style}
        labelStyle={style.toolbar.themeDropDownMenu.labelStyle}
      >
        {map(themeList, theme => (
          <MenuItem key={theme.content.id} value={theme.content.id} primaryText={theme.content.name}/>
        ))}
      </DropDownMenu>
    )

    return (
      <Paper style={style.mainWrapper}>

        <ShowableAtRender show={!isThemeListEmpty}>
          <Toolbar style={style.toolbar.root}>
            <ToolbarGroup firstChild>
              <IconButton onTouchTap={onClose}><Close color={style.toolbar.icon.color}/></IconButton>
              <ToolbarTitle text={<FormattedMessage id="application.theme.title"/>}/>
              {themeSelect}
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              {addButton}
              {saveButton}
              {deleteButton}
            </ToolbarGroup>
          </Toolbar>
        </ShowableAtRender>

        <ShowableAtRender show={isThemeListEmpty}>
          <Toolbar style={style.toolbar.root}>
            <ToolbarGroup firstChild>
              <IconButton onTouchTap={onClose}><Close color={style.toolbar.icon.color}/></IconButton>
              <ToolbarTitle text={<FormattedMessage id="application.theme.title"/>}/>
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              {addButton}
            </ToolbarGroup>
          </Toolbar>
        </ShowableAtRender>


        <LoadableContentDisplayDecorator isLoading={isFetching} isEmpty={isThemeListEmpty}>
          <div style={style.contentWrapper}>
            {themeConfigurer}
          </div>
        </LoadableContentDisplayDecorator>

        <Snackbar
          open={snackBarOpen}
          message={<FormattedMessage id={snackBarMessageId}/>}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarRequestClose}
          onActionTouchTap={this.handleSnackbarActionTouchTap}
          action="OK"
        />
      </Paper>
    )
  }
}

export default ApplicationThemeComponent
