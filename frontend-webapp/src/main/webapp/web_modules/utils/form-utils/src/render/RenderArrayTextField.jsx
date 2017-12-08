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
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import Delete from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import AddBoxIcon from 'material-ui/svg-icons/content/add-box'
import RaisedButton from 'material-ui/RaisedButton'
import { fieldArrayFieldsPropTypes } from 'redux-form'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import styles from '../styles'
import messages from '../i18n/Locales'
/**
* Redux form field to display an array of textFields
* @author Sébastien Binda
*/
class RenderArrayTextField extends React.Component {
  static propTypes = {
    newFieldLabel: PropTypes.string,
    fieldsListLabel: PropTypes.string,
    addButtonLabel: PropTypes.string,
    type: PropTypes.string, // type of text field to instanciate
    // If the list is not a list of string but a list of objects this field is used to know the key of the object
    // where to set te value
    valueField: PropTypes.string,
    // From redux form
    // eslint-disable-next-line react/no-unused-prop-types
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static defaultProps = {
    type: 'text',
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    newValue: null,
  }

  addValue = () => {
    const { valueField, fields } = this.props
    const { newValue } = this.state
    if (newValue) {
      if (valueField) {
        fields.push({ [valueField]: newValue })
      } else {
        fields.push(newValue)
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      newValue: event.target.value,
    })
  }

  renderField = (field, index) => {
    const { valueField } = this.props
    const label = valueField ? this.props.fields.get(index)[valueField] : this.props.fields.get(index)
    const rightIconButton = (
      <IconButton onClick={() => this.props.fields.remove(index)}>
        <Delete />
      </IconButton>
    )
    return (
      <ListItem key={index} primaryText={label} rightIconButton={rightIconButton} />
    )
  }

  render() {
    const {
      fields, type, newFieldLabel, fieldsListLabel, addButtonLabel,
    } = this.props
    const { moduleTheme: { arrayField }, intl: { formatMessage } } = this.context
    return (
      <div style={arrayField.layout} >
        <Paper style={arrayField.list} >
          <Subheader>{fieldsListLabel || formatMessage({ id: 'render.array-field.values.title' })}</Subheader>
          <Divider />
          <List style={arrayField.listContent}>
            {fields.map(this.renderField)}
          </List>
        </Paper>
        <RaisedButton
          onClick={this.addValue}
          label={addButtonLabel || formatMessage({ id: 'render.array-field.add.new.value.button' })}
          icon={<AddBoxIcon />}
        />
        <TextField
          hintText={newFieldLabel || formatMessage({ id: 'render.array-field.new.value.hint' })}
          type={type}
          onChange={this.handleChange}
          style={arrayField.text}
        />
      </div>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(RenderArrayTextField))
