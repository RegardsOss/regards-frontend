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
import isString from 'lodash/isString'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import Dialog from 'material-ui/Dialog'
import Delete from 'mdi-material-ui/Delete'
import AddBoxIcon from 'mdi-material-ui/PlusBox'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { fieldArrayFieldsPropTypes, fieldArrayMetaPropTypes } from 'redux-form'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { FormErrorMessage } from '@regardsoss/components'
import RenderHelper from './RenderHelper'
import styles from '../../styles'
import messages from '../../i18n'
/**
* Redux form field to display an array of textFields
* @author Sébastien Binda
*/
class RenderArrayTextField extends React.Component {
  static propTypes = {
    newFieldLabel: PropTypes.string,
    fieldsListLabel: PropTypes.string,
    displayFieldsListLabel: PropTypes.bool,
    addButtonLabel: PropTypes.string,
    // If the list is not a list of string but a list of objects this field is used to know the key of the object
    // where to set te value
    valueField: PropTypes.string,
    disabled: PropTypes.bool,
    // From redux form
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
    meta: PropTypes.shape(fieldArrayMetaPropTypes).isRequired,
  }

  static defaultProps = {
    disabled: false,
    displayFieldsListLabel: true,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    newValue: null,
    dialogOpened: false,
  }

  onAddNewValue = () => {
    const { valueField, fields } = this.props
    const { newValue } = this.state
    if (newValue) {
      if (valueField) {
        fields.push({ [valueField]: newValue })
      } else {
        fields.push(newValue)
      }
    }
    this.closeAddDialog()
  }

  handleChange = (event) => {
    this.setState({
      newValue: event.target.value,
    })
  }

  openAddDialog = () => {
    this.setState({
      dialogOpened: true,
    })
  }

  closeAddDialog = () => {
    this.setState({
      newValue: null,
      dialogOpened: false,
    })
  }

  renderNewValueDialog = () => {
    const { dialogOpened, newValue } = this.state
    const { newFieldLabel, fieldsListLabel } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Dialog
        title={formatMessage({ id: 'render.map-object.add.new.dialog.title' }, { parameter: fieldsListLabel })}
        actions={<>
          <RaisedButton
            key="ok"
            label={formatMessage({ id: 'render.array-object.add.button' })}
            primary
            disabled={!newValue}
            keyboardFocused
            onClick={this.onAddNewValue}
          />
          <RaisedButton
            key="cancel"
            label={formatMessage({ id: 'render.array-object.cancel.button' })}
            onClick={this.closeAddDialog}
          />
        </>}
        modal={false}
        open={dialogOpened}
        onRequestClose={this.closeDialog}
        className="selenium-modalInputValue"
      >
        <TextField
          hintText={newFieldLabel || formatMessage({ id: 'render.array-field.new.value.hint' })}
          type="text"
          onChange={this.handleChange}
        />
      </Dialog>
    )
  }

  renderField = (field, index) => {
    const { valueField, disabled } = this.props
    const label = valueField ? this.props.fields.get(index)[valueField] : this.props.fields.get(index)
    const rightIconButton = (
      <IconButton onClick={() => this.props.fields.remove(index)}>
        <Delete />
      </IconButton>
    )
    return (
      <ListItem key={index} primaryText={label} rightIconButton={disabled ? null : rightIconButton} />
    )
  }

  render() {
    const {
      fields, fieldsListLabel, addButtonLabel, meta, disabled, displayFieldsListLabel,
    } = this.props
    const { moduleTheme: { arrayField }, intl: { formatMessage }, intl } = this.context
    const header = displayFieldsListLabel ? (
      <div>
        <Subheader>{fieldsListLabel || formatMessage({ id: 'render.array-field.values.title' })}</Subheader>
        <Divider />
      </div>
    ) : null
    return (
      <div style={arrayField.layout}>
        <Paper style={arrayField.list}>
          {header}

          {meta.error && isString(meta.error)
            ? <FormErrorMessage>{RenderHelper.getErrorMessage(true, meta.error, intl)}</FormErrorMessage>
            : null}
          <List style={arrayField.listContent}>
            {fields.map(this.renderField)}
          </List>
          {disabled
            ? null
            : <RaisedButton
                onClick={this.openAddDialog}
                label={addButtonLabel || formatMessage({ id: 'render.array-field.add.new.value.button' })}
                fullWidth
                primary
                icon={<AddBoxIcon />}
            />}
        </Paper>
        {disabled ? null : this.renderNewValueDialog()}
      </div>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(RenderArrayTextField))
