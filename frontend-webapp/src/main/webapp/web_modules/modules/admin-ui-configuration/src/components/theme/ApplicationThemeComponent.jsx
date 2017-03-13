/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find, isEmpty, stubTrue, merge } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import Save from 'material-ui/svg-icons/content/save'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ThemeList, Theme, defaultTheme } from '@regardsoss/model'
import { themeContextType, defaultCustomConfiguration } from '@regardsoss/theme'
import { muiTheme } from '@regardsoss/vendors'
import MaterialUiComponentsShowcase from '../MaterialUiComponentsShowcase'
import DeleteButton from './DeleteButton'
import CreateButton from './CreateButton'
import moduleStyles from '../../styles/styles'

/**
 * React component defining the user interface for customizing the themes of Regards.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeComponent extends React.Component {

  static propTypes = {
    themeList: ThemeList,
    currentTheme: Theme,
    isFetching: React.PropTypes.bool,
    onCreate: React.PropTypes.func,
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
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      editingTheme: props.currentTheme,
      snackBarOpen: false,
      snackBarMessageId: 'application.theme.save.success',
    }
  }

  getEditingTheme = () => merge({}, { content: { configuration: defaultCustomConfiguration } }, this.state.editingTheme)

  onThemeSelect = (event, index, value) => this.setState({ editingTheme: find(this.props.themeList, theme => theme.content.id === value) })

  onThemeOverride = (theme) => {
    const newEditingTheme = this.state.editingTheme
    newEditingTheme.content.configuration = theme
    this.setState({
      editingTheme: newEditingTheme,
    })
  }

  onSave = (theme) => {
    const { onSave } = this.props
    onSave(theme).then(actionResult => this.setState({
      snackBarOpen: true,
      snackBarMessageId: !actionResult.error ? 'application.theme.save.success' : 'application.theme.save.error',
    }))
  }

  onSnackbarRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  onSnackbarActionTouchTap = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  onDelete = (theme) => {
    const { onDelete } = this.props
    onDelete(theme).then(actionResult => this.setState({
      snackBarOpen: true,
      snackBarMessageId: !actionResult.error ? 'application.theme.remove.success' : 'application.theme.remove.error',
    }))
  }

  onCreate = (theme) => {
    const { onCreate } = this.props
    const editingTheme = this.getEditingTheme()

    onCreate(theme).then((actionResult) => {
      this.setState({
        editingTheme: !actionResult.error ? find(actionResult.payload.entities.theme, stubTrue) : editingTheme,
        snackBarOpen: true,
        snackBarMessageId: !actionResult.error ? 'application.theme.create.success' : 'application.theme.create.error',
      })
    })
  }

  render() {
    const { themeList, onClose, isFetching } = this.props
    const { snackBarOpen, snackBarMessageId } = this.state
    const editingTheme = this.getEditingTheme()
    const isThemeListEmpty = isEmpty(themeList)
    const previewWrapper = <MaterialUiComponentsShowcase />
    const style = moduleStyles(this.context.muiTheme).theme

    const themeForDecorator = editingTheme.content.configuration
    themeForDecorator.themeName = editingTheme.content.name
    const themeConfigurer = muiTheme(themeForDecorator, this.onThemeOverride)(() => (previewWrapper))

    const toolbarTitle = this.context.intl.formatMessage({ id: 'application.theme.title' })

    const saveButton = (
      <IconButton
        onTouchTap={() => this.onSave(editingTheme)}
        tooltip={<FormattedMessage id="application.theme.save" />}
      ><Save color={style.toolbar.icon.color} /></IconButton>
    )
    const deleteButton = <DeleteButton onDelete={() => this.onDelete(editingTheme)} />
    const createButton = <CreateButton onCreate={this.onCreate} />

    const themeSelect = (
      <DropDownMenu
        value={editingTheme.content.id}
        onChange={this.onThemeSelect}
        style={style.toolbar.themeDropDownMenu.style}
        labelStyle={style.toolbar.themeDropDownMenu.labelStyle}
      >
        {map(themeList, theme => (
          <MenuItem key={theme.content.id} value={theme.content.id} primaryText={theme.content.name} />
        ))}
      </DropDownMenu>
    )

    return (
      <Paper style={style.mainWrapper}>

        <ShowableAtRender show={!isThemeListEmpty}>
          <Toolbar style={style.toolbar.root}>
            <ToolbarGroup firstChild>
              <IconButton onTouchTap={onClose}><Close color={style.toolbar.icon.color} /></IconButton>
              <ToolbarTitle text={toolbarTitle} />
              {themeSelect}
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              {createButton}
              {saveButton}
              {deleteButton}
            </ToolbarGroup>
          </Toolbar>
        </ShowableAtRender>

        <ShowableAtRender show={isThemeListEmpty}>
          <Toolbar style={style.toolbar.root}>
            <ToolbarGroup firstChild>
              <IconButton onTouchTap={onClose}><Close color={style.toolbar.icon.color} /></IconButton>
              <ToolbarTitle text={toolbarTitle} />
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              {createButton}
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
          message={<FormattedMessage id={snackBarMessageId} />}
          autoHideDuration={4000}
          onRequestClose={this.onSnackbarRequestClose}
          onActionTouchTap={this.onSnackbarActionTouchTap}
          action="OK"
        />
      </Paper>
    )
  }
}

export default ApplicationThemeComponent
