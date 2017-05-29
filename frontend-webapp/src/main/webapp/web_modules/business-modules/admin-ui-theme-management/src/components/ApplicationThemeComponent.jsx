/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import stubTrue from 'lodash/stubTrue'
import merge from 'lodash/merge'
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
import { LoadableContentDisplayDecorator, HateoasIconAction, HateoasToggle, HateoasKeys } from '@regardsoss/display-control'
import { Theme } from '@regardsoss/model'
import { themeContextType, defaultCustomConfiguration, defaultTheme } from '@regardsoss/theme'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import { muiTheme } from '@regardsoss/vendors'
import MaterialUiComponentsShowcase from './MaterialUiComponentsShowcase'
import DeleteButton from './DeleteButton'
import CreateButton from './CreateButton'
import moduleStyles from '../styles/styles'

/**
 * React component defining the user interface for customizing the themes of Regards.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeComponent extends React.Component {

  static propTypes = {
    themeList: PropTypes.objectOf(Theme),
    currentTheme: Theme,
    isFetching: PropTypes.bool,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    fetchTheme: PropTypes.func,
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
      editingTheme: props.currentTheme ? props.currentTheme : props.themeList ? values(props.themeList)[0] : null,
      snackBarOpen: false,
      snackBarMessageId: 'application.theme.save.success',
    }
  }

  onThemeSelect = (event, index, value) => {
    Promise.resolve(this.props.fetchTheme(value)).then((actionResult) => {
      if (!actionResult.error) {
        this.setState({ editingTheme: find(this.props.themeList, theme => theme.content.id === value) })
      }
    })
  }

  onThemeOverride = (theme) => {
    const newEditingTheme = this.state.editingTheme
    newEditingTheme.content.configuration = theme
    this.setState({
      editingTheme: newEditingTheme,
    })
  }

  onSave = (theme) => {
    const { onSave } = this.props
    const themeToSave = Object.assign({}, theme)
    themeToSave.content.configuration = JSON.stringify(themeToSave.content.configuration)
    onSave(themeToSave).then(actionResult => this.setState({
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
    const newTheme = {
      content: {
        name: theme.name,
        configuration: JSON.stringify(defaultCustomConfiguration),
      },
    }

    onCreate(newTheme).then((actionResult) => {
      this.setState({
        editingTheme: !actionResult.error ? find(actionResult.payload.entities.theme, stubTrue) : this.state.editingTheme,
        snackBarOpen: true,
        snackBarMessageId: !actionResult.error ? 'application.theme.create.success' : 'application.theme.create.error',
      })
    })
  }

  getEditingTheme = () => merge({}, { content: { configuration: defaultCustomConfiguration } }, this.state.editingTheme)

  toggleThemeActivation = () => {
    const newEditingTheme = this.state.editingTheme
    newEditingTheme.content.active = !newEditingTheme.content.active
    this.setState({
      editingTheme: newEditingTheme,
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
      <HateoasIconAction
        entityLinks={editingTheme.links}
        hateoasKey={HateoasKeys.UPDATE}
        onTouchTap={() => this.onSave(editingTheme)}
        tooltip={this.context.intl.formatMessage({ id: 'application.theme.save' })}
      ><Save color={style.toolbar.icon.color} /></HateoasIconAction>
    )
    const deleteButton = (<DeleteButton
      onDelete={() => this.onDelete(editingTheme)}
      entityHateoasLinks={editingTheme.links}
    />)
    const createButton = (<CreateButton
      onCreate={this.onCreate}
    />)
    const themeActivationToggle = (<HateoasToggle
      label={this.context.intl.formatMessage({ id: 'application.theme.default.active' })}
      defaultToggled={editingTheme.content.active}
      onToggle={this.toggleThemeActivation}
      style={{
        marginTop: 10,
        marginLeft: 20,
        maxWidth: 250,
      }}
      entityLinks={editingTheme.links}
      hateoasKey={HateoasKeys.UPDATE}
    />)

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
              <IconButton onTouchTap={onClose}><Back color={style.toolbar.icon.color} /></IconButton>
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

        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={isThemeListEmpty}
          emptyMessage={this.context.intl.formatMessage({ id: 'application.theme.default.create.message' })}
        >
          <div style={style.contentWrapper}>
            {themeActivationToggle}
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
