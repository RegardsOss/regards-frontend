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
import remove from 'lodash/remove'
import find from 'lodash/find'
import keys from 'lodash/keys'
import map from 'lodash/map'
import omit from 'lodash/omit'
import AddBoxIcon from 'material-ui/svg-icons/content/add-box'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { fieldInputPropTypes } from 'redux-form'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { SelectableList, FormErrorMessage, ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import Field from '../Field'
import styles from '../styles'
import messages from '../i18n/Locales'

/**
* Display a form to configure a map parameter.
* The map parameter is configured as a new Field for each key of the map. The values are configured with parametrable field.
* @author Sébastien Binda
*/
class RenderArrayObjectField extends React.Component {
  static propTypes = {
    mapValueFieldComponent: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    mapValueFieldProps: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    defaultValue: PropTypes.any,
    newValueDialogLabel: PropTypes.string,
    mapKeyLabel: PropTypes.string,
    mapLabel: PropTypes.string,
    // From redux-form
    input: PropTypes.shape(fieldInputPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static defaultProps = {
    defaultValue: '',
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      mapKeys: keys(this.props.input.value) || [],
      displayedKey: null,
      dialogOpened: false,
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
      })
    }
    this.closeDeleteDialog()
  }

  onDeleteObject = (key) => {
    this.setState({
      keyToDelete: key,
    })
  }

  onDuplicateObject = (key) => {
    this.setState({
      keyToDuplicate: key,
    })
  }

  setNewKey = (event, newKey) => this.setState({ newKey })

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
      dialogOpened: true,
    })
  }

  closeAddDialog = () => {
    this.setState({
      newKey: null,
      dialogOpened: false,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      keyToDelete: null,
    })
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

  /**
   * Render a ListItem for the given objects
   * @param {*} index : Index of the object from the fields props to render
   */
  renderListItem = (key) => {
    const { intl: { formatMessage } } = this.context
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
          onClick={() => this.onDuplicateObject(key)}
        >
          {formatMessage({ id: 'render.array-object.duplicate.button' })}
        </MenuItem>
      </IconMenu>
    )
    return (
      <ListItem
        key={`${key}`}
        value={key}
        rightIconButton={rightIconMenu}
        primaryText={key}
      />
    )
  }

  renderNewKeySelector = () => {
    const { newKeyErrorMessage, dialogOpened, newKey } = this.state
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
        open={dialogOpened}
        onRequestClose={this.closeDialog}
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

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        arrayObject: {
          layoutStyle, leftColumnStyle, rightColumnStyle, typeListStyle, titleStyle, contentStyle,
        },
      },
    } = this.context

    const { displayedKey, mapKeys } = this.state
    const { mapValueFieldComponent, input, mapValueFieldProps } = this.props

    const fieldForm = displayedKey !== null ? (
      <Field
        name={`${input.name}.${displayedKey}`}
        component={mapValueFieldComponent}
        {...mapValueFieldProps}
      />) : null
    return (
      <Card>
        <CardMedia>
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={contentStyle}>
              <div style={leftColumnStyle}>
                <SelectableList
                  style={typeListStyle}
                  defaultValue={displayedKey}
                  onSelect={this.displayObject}
                >
                  {map(mapKeys, (key, idx) => this.renderListItem(key))}
                </SelectableList>
                <RaisedButton
                  label={formatMessage({ id: 'render.array-object.add.button' })}
                  fullWidth
                  primary
                  onClick={this.openAddDialog}
                  icon={<AddBoxIcon />}
                />
              </div>
              <div style={rightColumnStyle}>
                {fieldForm}
              </div>
            </div>
          </div>
        </CardMedia>
        {this.renderNewKeySelector()}
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(RenderArrayObjectField))
