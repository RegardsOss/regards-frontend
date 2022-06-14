/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import filter from 'lodash/filter'
import find from 'lodash/find'
import keys from 'lodash/keys'
import map from 'lodash/map'
import omit from 'lodash/omit'
import AddBoxIcon from 'mdi-material-ui/PlusBox'
import ErrorIcon from 'mdi-material-ui/AlertCircle'
import MoreVertIcon from 'mdi-material-ui/DotsVertical'
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
import {
  SelectableList, FormErrorMessage, ConfirmDialogComponent, ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import RenderHelper from './RenderHelper'
import ValidationHelpers from '../../domain/ValidationHelpers'
import Field from '../Field'
import styles from '../../styles'
import messages from '../../i18n'

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

  static DOT_CHAR_REGEXP = '\\.'

  static DOT_CHAR = '.'

  state = {
    mapKeys: keys(this.props.input.value) || [],
    displayedKey: null,
    addDialogOpened: false,
    duplicateDialogOpened: false,
    newKey: null,
    newKeyErrorMessage: null,
    keyToDelete: null,
    keyToDuplicate: null,
  }

  /**
   * Callback to add a new object to the existing ones.
   */
  onAddNewObject = () => {
    const { newKey, mapKeys } = this.state
    const { intl: { formatMessage } } = this.context
    if (!newKey || find(mapKeys, (k) => k === newKey)) {
      // Key is empty or does not exists.
      this.setState({
        newKeyErrorMessage: formatMessage({ id: 'render.map-object.key.already.exists.error' }),
      })
    } else {
      this.setState({
        newKeyErrorMessage: null,
        mapKeys: [...mapKeys, newKey],
      })
      this.onDisplayObject(newKey)
      this.onCloseAddDialog()
    }
  }

  onConfirmDeleteObject = () => {
    const { keyToDelete, mapKeys } = this.state
    const { input } = this.props
    if (keyToDelete) {
      const encodedKey = this.getEncodedKey(keyToDelete)
      input.onChange({
        ...omit(input.value, encodedKey),
      })
      const nextKeys = filter(mapKeys, (k) => k !== encodedKey)
      this.setState({
        mapKeys: nextKeys,
        // update displayed element (select first if there is any after removal)
        displayedKey: nextKeys.length > 1 ? nextKeys[0] : null,
      })
    }
    this.onCloseDeleteDialog()
  }

  onDeleteObject = (key) => {
    this.setState({
      keyToDelete: this.getUserReadableKey(key),
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
    } else if (!newKey || find(mapKeys, (k) => k === newKey)) {
      // Key is empty or does not exists.
      this.setState({
        newKeyErrorMessage: formatMessage({ id: 'render.map-object.key.already.exists.error' }),
      })
    } else {
      this.setState({
        newKeyErrorMessage: null,
        mapKeys: [...mapKeys, newKey],
      })
      input.onChange({
        ...input.value,
        [newKey]: input.value[keyToDuplicate],
      })
      this.onDisplayObject(newKey)
      this.onCloseDuplicateDialog()
    }
  }

  onSetNewKey = (event, newKey) => this.setState({
    newKey: this.getEncodedKey(newKey),
  })

  /**
   * Callback to display selected object form
   * @param {*} index : Index of the object from the fields props to display
   */
  onDisplayObject = (key) => {
    this.setState({
      displayedKey: key,
    })
  }

  onOpenAddDialog = () => {
    this.setState({
      newKey: null,
      addDialogOpened: true,
    })
  }

  onOpenDuplicateDialog = (keyToDuplicate) => {
    this.setState({
      keyToDuplicate,
      newKey: `${keyToDuplicate}.1`,
      duplicateDialogOpened: true,
    })
  }

  onCloseAddDialog = () => {
    this.setState({
      newKey: null,
      addDialogOpened: false,
    })
  }

  onCloseDeleteDialog = () => {
    this.setState({
      keyToDelete: null,
    })
  }

  onCloseDuplicateDialog = () => {
    this.setState({
      keyToDuplicate: null,
      newKey: null,
      duplicateDialogOpened: false,
    })
  }

  /**
   * Returns key as it should be shown to user (set back the '.' characters)
   * @param {string} key key
   * @return {string} key as shown to user
   */
  getUserReadableKey = (key) => replace(key, new RegExp(this.props.charsToReplaceDotsInKeys, 'g'), RenderMapField.DOT_CHAR)

  /**
   * Returns encoded key to be used in redux form ('.' chars conflics with the subpath system)
   * @param {string} key key
   * @return {string} key as used in forms, without '.' chars
   */
  getEncodedKey = (key) => replace(key, new RegExp(RenderMapField.DOT_CHAR_REGEXP, 'g'), this.props.charsToReplaceDotsInKeys)

  renderAddObjectDialog = () => {
    const { newKeyErrorMessage, addDialogOpened, newKey } = this.state
    const { newValueDialogLabel, mapKeyLabel, mapLabel } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Dialog
        title={newValueDialogLabel || formatMessage({ id: 'render.map-object.add.new.dialog.title' }, { parameter: mapLabel })}
        actions={<>
          <RaisedButton
            key="ok"
            label={formatMessage({ id: 'render.array-object.add.button' })}
            primary
            disabled={!newKey}
            keyboardFocused
            onClick={this.onAddNewObject}
          />
          <RaisedButton
            key="cancel"
            label={formatMessage({ id: 'render.array-object.cancel.button' })}
            onClick={this.onCloseAddDialog}
          />
        </>}
        modal={false}
        open={addDialogOpened}
        onRequestClose={this.onCloseAddDialog}
      >
        <TextField
          type="text"
          hintText={mapKeyLabel || formatMessage({ id: 'render.map-object.add.new.dialog.key.label' })}
          value={'' || this.getUserReadableKey(newKey)}
          onChange={this.onSetNewKey}
          fullWidth
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
          title={formatMessage({ id: 'render.array-object.delete.confirm.title' })}
          onConfirm={this.onConfirmDeleteObject}
          onClose={this.onCloseDeleteDialog}
        />
      )
    }
    return null
  }

  renderDuplicateObjectDialog = () => {
    const { newKeyErrorMessage, duplicateDialogOpened, newKey } = this.state
    const { newValueDialogLabel, mapKeyLabel, mapLabel } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Dialog
        title={newValueDialogLabel || formatMessage({ id: 'render.map-object.add.new.dialog.title' }, { parameter: mapLabel })}
        actions={
          <>
            <RaisedButton
              key="ok"
              label={formatMessage({ id: 'render.array-object.add.button' })}
              primary
              disabled={!newKey}
              keyboardFocused
              onClick={this.onDuplicateObject}
            />
            <RaisedButton
              key="cancel"
              label={formatMessage({ id: 'render.array-object.cancel.button' })}
              onClick={this.onCloseDuplicateDialog}
            />
          </>
        }
        modal={false}
        open={duplicateDialogOpened}
        onRequestClose={this.onCloseDuplicateDialog}
      >
        <TextField
          type="text"
          hintText={mapKeyLabel || formatMessage({ id: 'render.map-object.add.new.dialog.key.label' })}
          onChange={this.onSetNewKey}
          value={this.getUserReadableKey(newKey)}
          fullWidth
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
    const {
      intl: { formatMessage },
      moduleTheme: {
        mapField: {
          item: { textStyle, errorIconStyle },
        },
      },
    } = this.context
    const { meta, disabled } = this.props
    const iconButtonElement = (
      <IconButton
        touch
        title={formatMessage({ id: 'render.array-object.options.title' })}
      >
        <MoreVertIcon />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onClick={() => this.onDeleteObject(key)} // eslint wont fix: due to MUI 0x menu items issue (cannot compose menu items)
        >
          {formatMessage({ id: 'render.array-object.delete.button' })}
        </MenuItem>
        <MenuItem
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onClick={() => this.onOpenDuplicateDialog(key)} // eslint wont fix: due to MUI 0x menu items issue (cannot compose menu items)
        >
          {formatMessage({ id: 'render.array-object.duplicate.button' })}
        </MenuItem>
      </IconMenu>
    )

    let leftIcon
    if (get(meta, `error.${key}`, null)) {
      leftIcon = <ErrorIcon color={errorIconStyle.color} />
    }
    const keyText = this.getUserReadableKey(key)
    return (
      <ListItem
        key={`${key}`}
        value={key}
        title={keyText}
        rightIconButton={disabled ? null : rightIconMenu}
        leftIcon={leftIcon}
        primaryText={<div style={textStyle}>{keyText}</div>}
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
      mapValueFieldComponent, input, mapValueFieldProps, meta, disabled, mapKeyLabel,
    } = this.props
    const key = this.getEncodedKey(displayedKey)
    const fieldForm = displayedKey !== null ? (
      <Field
        name={`${input.name}.${key}`}
        component={mapValueFieldComponent}
        {...mapValueFieldProps}
        validate={ValidationHelpers.required}
        disabled={disabled}
        fullWidth
      />) : null
    return (
      <Card>
        {meta.error && isString(meta.error)
          ? <FormErrorMessage>{RenderHelper.getErrorMessage(true, meta.error, intl)}</FormErrorMessage>
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
                  onSelect={this.onDisplayObject}
                >
                  {map(mapKeys, (localKey, idx) => this.renderListItem(localKey))}
                </SelectableList>
                {disabled
                  ? null
                  : <RaisedButton
                      label={formatMessage({ id: 'render.array-object.add.button' })}
                      fullWidth
                      primary
                      onClick={this.onOpenAddDialog}
                      icon={<AddBoxIcon />}
                      style={leftButtonStyle}
                  />}
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
