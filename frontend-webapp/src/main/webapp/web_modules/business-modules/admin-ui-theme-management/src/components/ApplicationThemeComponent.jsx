/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import find from 'lodash/find'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import merge from 'lodash/merge'
import stubTrue from 'lodash/stubTrue'
import values from 'lodash/values'
import DropDownMenu from 'material-ui/DropDownMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import Delete from 'material-ui/svg-icons/action/delete'
import Save from 'material-ui/svg-icons/content/save'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import Close from 'material-ui/svg-icons/navigation/close'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender, withConfirmDialog } from '@regardsoss/components'
import { LoadableContentDisplayDecorator, withHateoasDisplayControl, HateoasKeys, withResourceDisplayControl } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType, defaultCustomConfiguration, defaultTheme, ThemeActions } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { muiTheme as generateMuiThemeConfigurator } from '@regardsoss/vendors'
import MaterialUiComponentsShowcase from './MaterialUiComponentsShowcase'
import CreateButton from './CreateButton'
import moduleStyles from '../styles/styles'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const ConfirmableHateoasIconAction = withConfirmDialog(HateoasIconAction)
const HateoasToggle = withHateoasDisplayControl(Toggle)
const HateoasCreateButton = withResourceDisplayControl(CreateButton)

/**
 * React component defining the user interface for customizing the themes of Regards.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeComponent extends React.Component {
  static propTypes = {
    themeList: AccessShapes.ThemeList,
    currentTheme: AccessShapes.Theme,
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
    let theme = props.currentTheme
    if (!theme && props.themeList && props.themeList.length > 0) {
      theme = values(props.themeList)[0]
    }

    const background = get(theme, 'content.configuration.palette.background', null)

    this.state = {
      background,
      editingTheme: theme,
      snackBarOpen: false,
      snackBarMessageId: 'application.theme.save.success',
    }
  }

  onThemeSelect = (event, index, value) => {
    Promise.resolve(this.props.fetchTheme(value)).then((actionResult) => {
      if (!actionResult.error) {
        const newTheme = find(this.props.themeList, theme => theme.content.id === value)
        if (newTheme) {
          this.setState({
            background: newTheme.content.configuration.palette.background || '',
            editingTheme: newTheme,
          })
        }
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

  onSnackbarActionClick = () => {
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

  changeBackground = (event, newValue) => {
    const newEditingTheme = this.state.editingTheme
    newEditingTheme.content.configuration.palette.background = newValue
    this.setState({
      background: newValue,
      editingTheme: newEditingTheme,
    })
  }

  render() {
    const { themeList, onClose, isFetching } = this.props
    const { snackBarOpen, snackBarMessageId } = this.state
    const { muiTheme, intl: { formatMessage } } = this.context
    const editingTheme = this.getEditingTheme()
    const isThemeListEmpty = isEmpty(themeList)
    const previewWrapper = <MaterialUiComponentsShowcase />
    const style = moduleStyles(muiTheme).theme

    const themeForDecorator = editingTheme.content.configuration
    themeForDecorator.themeName = editingTheme.content.name
    const themeConfigurer = generateMuiThemeConfigurator(themeForDecorator, this.onThemeOverride)(() => (previewWrapper))

    const toolbarTitle = formatMessage({ id: 'application.theme.title' })

    const saveButton = (
      <HateoasIconAction
        entityLinks={editingTheme.links}
        hateoasKey={HateoasKeys.UPDATE}
        onClick={() => this.onSave(editingTheme)}
        tooltip={formatMessage({ id: 'application.theme.save' })}
      ><Save color={muiTheme.palette.alternateTextColor} />
      </HateoasIconAction>
    )
    const deleteButton = (
      <ConfirmableHateoasIconAction
        entityLinks={editingTheme.links}
        hateoasKey={HateoasKeys.DELETE}
        onClick={() => this.onDelete(editingTheme)}
        tooltip={formatMessage({ id: 'application.theme.remove.tooltip' })}
        dialogTitle={formatMessage({ id: 'application.theme.remove.confirm' })}
      >
        <Delete
          color={muiTheme.palette.alternateTextColor}
          hoverColor={muiTheme.palette.accent1Color}
        />
      </ConfirmableHateoasIconAction>)
    const createButton = (<HateoasCreateButton
      resourceDependencies={ThemeActions.getDependency(RequestVerbEnum.POST)}
      onCreate={this.onCreate}
    />)
    const themeActivationToggle = (<HateoasToggle
      label={formatMessage({ id: 'application.theme.default.active' })}
      defaultToggled={editingTheme.content.active}
      onToggle={this.toggleThemeActivation}
      style={style.activationToggle}
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
              <IconButton onClick={onClose}><Back color={style.toolbar.icon.color} /></IconButton>
              <ToolbarTitle text={toolbarTitle} style={style.toolbar.title} />
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
              <IconButton onClick={onClose}><Close color={style.toolbar.icon.color} /></IconButton>
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
          emptyComponent={
            <span>
              {formatMessage({ id: 'application.theme.default.create.message' })}
            </span>
          }
        >
          <div style={style.contentWrapper}>
            {themeActivationToggle}
            <TextField
              hintText="Background style"
              value={this.state.background}
              onChange={this.changeBackground}
            />
            {themeConfigurer}
          </div>
        </LoadableContentDisplayDecorator>

        <Snackbar
          open={snackBarOpen}
          message={<FormattedMessage id={snackBarMessageId} />}
          autoHideDuration={4000}
          onRequestClose={this.onSnackbarRequestClose}
          onActionClick={this.onSnackbarActionClick}
          action="OK"
        />
      </Paper>
    )
  }
}

export default ApplicationThemeComponent
