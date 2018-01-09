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
import replace from 'lodash/replace'
import get from 'lodash/get'
import isString from 'lodash/isString'
import remove from 'lodash/remove'
import find from 'lodash/find'
import keys from 'lodash/keys'
import map from 'lodash/map'
import omit from 'lodash/omit'
import AddBoxIcon from 'material-ui/svg-icons/content/add-box'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { SelectableList, FormErrorMessage, ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import RenderHelper from './RenderHelper'
import ValidationHelpers from '../ValidationHelpers'
import Field from '../Field'
import styles from '../styles'
import messages from '../i18n/Locales'

/**
* Display a form to configure a map parameter.
* The map parameter is configured as a new Field for each key of the map. The values are configured with parametrable field.
* @author Sébastien Binda
*/
class RenderMapField extends React.Component {
  static propTypes = {
    mapValueFieldComponent: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    mapValueFieldProps: PropTypes.object,
    charsToReplaceDotsInKeys: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    defaultValue: PropTypes.any,
    newValueDialogLabel: PropTypes.string,
    mapKeyLabel: PropTypes.string,
    mapLabel: PropTypes.string,
    disabled: PropTypes.bool,
    // From redux-form
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  }

  static defaultProps = {
    charsToReplaceDotsInKeys: '____',
    defaultValue: '',
    disabled: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static DOT_CHAR = '\\.'

  constructor(props) {
    super(props)
    this.state = {
      mapKeys: keys(this.props.input.value) || [],
      displayedKey: null,
      addDialogOpened: false,
      duplicateDialogOpened: false,
      newKey: null,
      newKeyErrorMessage: null,
      keyToDelete: null,
      keyToDuplicate: null,
    }
  }

  /**
   * Callback to add a new object to the existing ones.
   */
  onAddNewObject = () => {
    const { newKey, mapKeys } = this.state
    const { intl: { formatMessage } } = this.context
    if (!newKey || find(mapKeys, k => k === newKey)) {
      // Key is empty or does not exists.
      this.setState({
        newKeyErrorMessage: formatMessage({ id: 'render.map-object.key.already.exists.error' }),
      })
    } else {
      this.setState({
        mapKeys: [...mapKeys, newKey],
      })
      this.displayObject(newKey)
      this.closeAddDialog()
    }
  }

  onConfirmDeleteObject = () => {
    const { keyToDelete, mapKeys } = this.state
    const { input } = this.props
    if (keyToDelete && find(mapKeys, k => k === keyToDelete)) {
      input.onChange({
        ...omit(input.value, keyToDelete),
      })
      this.setState({
        mapKeys: remove(mapKeys, k => k !== keyToDelete),
      }, () => {
        if (this.state.mapKeys.length > 0) {
          this.displayObject(this.state.mapKeys[0])
        } else {
          this.displayObject(null)
        }
      })
    }
    this.closeDeleteDialog()
  }

  onDeleteObject = (key) => {
    this.setState({
      keyToDelete: key,
    })
  }

  onDuplicateObject = () => {
    const { newKey, mapKeys, keyToDuplicate } = this.state
    const { input } = this.props
    const { intl: { formatMessage } } = this.context
    if (!input.value[keyToDuplicate]) {
      // Key to duplicate does not exists.
      this.setState({
        newKeyErrorMessage: formatMessage({ id: 'render.map-object.duplicate.key.not.exists' }),
      })
    } else if (!newKey || find(mapKeys, k => k === newKey)) {
      // Key is empty or does not exists.
      this.setState({
        newKeyErrorMessage: formatMessage({ id: 'render.map-object.key.already.exists.error' }),
      })
    } else {
      this.setState({
        mapKeys: [...mapKeys, newKey],
      })
      input.onChange({
        ...input.value,
        [newKey]: input.value[keyToDuplicate],
      })
      this.displayObject(newKey)
      this.closeDuplicateDialog()
    }
  }

  setNewKey = (event, newKey) => this.setState({ newKey: replace(newKey, new RegExp(RenderMapField.DOT_CHAR, 'g'), this.props.charsToReplaceDotsInKeys) })

  /**
   * Callback to display selected object form
   * @param {*} index : Index of the object from the fields props to display
   */
  displayObject = (key) => {
    this.setState({
      displayedKey: key,
    })
  }

  openAddDialog = () => {
    this.setState({
      newKey: null,
      addDialogOpened: true,
    })
  }

  openDuplicateDialog = (keyToDuplicate) => {
    this.setState({
      keyToDuplicate,
      newKey: `${keyToDuplicate} (1)`,
      duplicateDialogOpened: true,
    })
  }

  closeAddDialog = () => {
    this.setState({
      newKey: null,
      addDialogOpened: false,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      keyToDelete: null,
    })
  }

  closeDuplicateDialog = () => {
    this.setState({
      keyToDuplicate: null,
      newKey: null,
      duplicateDialogOpened: false,
    })
  }

  renderAddObjectDialog = () => {
    const { newKeyErrorMessage, addDialogOpened, newKey } = this.state
    const { newValueDialogLabel, mapKeyLabel, mapLabel } = this.props
    const { intl: { formatMessage } } = this.context
    const actions = [
      <RaisedButton
        key="ok"
        label={formatMessage({ id: 'render.array-object.add.button' })}
        primary
        disabled={!newKey}
        keyboardFocused
        onClick={this.onAddNewObject}
      />,
      <RaisedButton
        key="cancel"
        label={formatMessage({ id: 'render.array-object.cancel.button' })}
        onClick={this.closeAddDialog}
      />,
    ]

    return (
      <Dialog
        title={newValueDialogLabel || formatMessage({ id: 'render.map-object.add.new.dialog.title' }, { parameter: mapLabel })}
        actions={actions}
        modal={false}
        open={addDialogOpened}
        onRequestClose={this.closeAddDialog}
      >
        <TextField
          type="text"
          hintText={mapKeyLabel || formatMessage({ id: 'render.map-object.add.new.dialog.key.label' })}
          onChange={this.setNewKey}
        />
        <FormErrorMessage>{newKeyErrorMessage}</FormErrorMessage>
      </Dialog>
    )
  }

  renderDeleteConfirmDialog = () => {
    const { keyToDelete } = this.state
    const { intl: { formatMessage } } = this.context
    if (keyToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={formatMessage({ id: 'render.array-object.delete.confirm.title' }, { index: keyToDelete })}
          onConfirm={this.onConfirmDeleteObject}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  renderDuplicateObjectDialog = () => {
    const { newKeyErrorMessage, duplicateDialogOpened, newKey } = this.state
    const { newValueDialogLabel, mapKeyLabel, mapLabel } = this.props
    const { intl: { formatMessage } } = this.context
    const actions = [
      <RaisedButton
        key="ok"
        label={formatMessage({ id: 'render.array-object.add.button' })}
        primary
        disabled={!newKey}
        keyboardFocused
        onClick={this.onDuplicateObject}
      />,
      <RaisedButton
        key="cancel"
        label={formatMessage({ id: 'render.array-object.cancel.button' })}
        onClick={this.closeDuplicateDialog}
      />,
    ]

    return (
      <Dialog
        title={newValueDialogLabel || formatMessage({ id: 'render.map-object.add.new.dialog.title' }, { parameter: mapLabel })}
        actions={actions}
        modal={false}
        open={duplicateDialogOpened}
        onRequestClose={this.closeDuplicateDialog}
      >
        <TextField
          type="text"
          hintText={mapKeyLabel || formatMessage({ id: 'render.map-object.add.new.dialog.key.label' })}
          onChange={this.setNewKey}
          defaultValue={newKey}
        />
        <FormErrorMessage>{newKeyErrorMessage}</FormErrorMessage>
      </Dialog>
    )
  }

  /**
   * Render a ListItem for the given objects
   * @param {*} index : Index of the object from the fields props to render
   */
  renderListItem = (key) => {
    const { intl: { formatMessage }, moduleTheme: { arrayField: { errorIconStyle } } } = this.context
    const { meta, disabled, charsToReplaceDotsInKeys } = this.props
    const iconButtonElement = (
      <IconButton
        touch
        tooltip={formatMessage({ id: 'render.array-object.options.title' })}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          onClick={() => this.onDeleteObject(key)}
        >
          {formatMessage({ id: 'render.array-object.delete.button' })}
        </MenuItem>
        <MenuItem
          onClick={() => this.openDuplicateDialog(key)}
        >
          {formatMessage({ id: 'render.array-object.duplicate.button' })}
        </MenuItem>
      </IconMenu>
    )

    let leftIcon
    if (get(meta, `error.${key}`, null)) {
      leftIcon = <ErrorIcon color={errorIconStyle.color} />
    }
    return (
      <ListItem
        key={`${key}`}
        value={key}
        rightIconButton={disabled ? null : rightIconMenu}
        leftIcon={leftIcon}
        primaryText={replace(key, new RegExp(charsToReplaceDotsInKeys, 'g'), '.')}
      />
    )
  }

  render() {
    const {
      intl,
      intl: { formatMessage },
      moduleTheme: {
        arrayObject: {
          layoutStyle, leftColumnStyle, rightColumnStyle, leftListStyle, leftButtonStyle, titleStyle, contentStyle,
        },
      },
    } = this.context

    const { displayedKey, mapKeys } = this.state
    const {
      mapValueFieldComponent, input, mapValueFieldProps, meta, disabled, mapKeyLabel, charsToReplaceDotsInKeys,
    } = this.props

    const key = replace(displayedKey, new RegExp(RenderMapField.DOT_CHAR, 'g'), charsToReplaceDotsInKeys)
    const fieldForm = displayedKey !== null ? (
      <Field
        name={`${input.name}.${key}`}
        component={mapValueFieldComponent}
        {...mapValueFieldProps}
        validate={ValidationHelpers.required}
        disabled={disabled}
      />) : null
    return (
      <Card>
        {meta.error && isString(meta.error) ?
          <FormErrorMessage>{RenderHelper.getErrorMessage(true, meta.error, intl)}</FormErrorMessage>
          : null}
        <CardMedia>
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={contentStyle}>
              <div style={leftColumnStyle}>
                {mapKeyLabel ? [<Subheader key="header">{mapKeyLabel}</Subheader>, <Divider key="divider" />] : null}
                <SelectableList
                  style={leftListStyle}
                  defaultValue={displayedKey}
                  onSelect={this.displayObject}
                >
                  {map(mapKeys, (localKey, idx) => this.renderListItem(localKey))}
                </SelectableList>
                {disabled ?
                  null :
                  <RaisedButton
                    label={formatMessage({ id: 'render.array-object.add.button' })}
                    fullWidth
                    primary
                    onClick={this.openAddDialog}
                    icon={<AddBoxIcon />}
                    style={leftButtonStyle}
                  />
                }
              </div>
              <div style={rightColumnStyle}>
                {fieldForm}
              </div>
            </div>
          </div>
        </CardMedia>
        {disabled ? null : this.renderAddObjectDialog()}
        {disabled ? null : this.renderDeleteConfirmDialog()}
        {disabled ? null : this.renderDuplicateObjectDialog()}
      </Card>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(RenderMapField))
