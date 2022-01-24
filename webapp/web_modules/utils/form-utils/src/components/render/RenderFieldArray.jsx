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
import compose from 'lodash/fp/compose'
import { fieldArrayFieldsPropTypes } from 'redux-form'
import Chip from 'material-ui/Chip'
import isEmpty from 'lodash/isEmpty'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'mdi-material-ui/PlusCircle'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * @author Théo Lasserre
 */
class RenderFieldArray extends React.Component {
  static propTypes = {
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
    title: PropTypes.string,
    warningText: PropTypes.string,
    errorText: PropTypes.string,
    alreadyExistText: PropTypes.string,
    floatingLabelText: PropTypes.string,
    validateFunction: PropTypes.func,
    disabled: PropTypes.bool,
  }

  state = {
    fieldText: '',
    fieldInError: false,
    fieldAlreadyExist: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  onRemoveField = (index) => {
    const { fields } = this.props
    fields.remove(index)
  }

  onKeyPressed = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      this.onAddField()
    }
  }

  onAddField = () => {
    const { fields } = this.props
    const { fieldText } = this.state
    const fieldToAdd = fieldText.trim()
    if (fieldToAdd) {
      fields.push(fieldText)
      this.setState({ fieldText: '' })
    }
  }

  onChangeValue = (event, value) => {
    const { validateFunction, fields } = this.props
    this.setState({
      fieldText: value,
      fieldInError: !!(validateFunction && validateFunction(value)),
      fieldAlreadyExist: fields.getAll().find((field) => field === value),
    })
  }

  renderChip = (member, index, fields) => {
    const {
      moduleTheme: {
        renderFieldArray: {
          chip,
        },
      },
    } = this.context
    return (
      <Chip
        onRequestDelete={() => this.onRemoveField(index)}
        key={`groupname${member}`}
        onClick={this.onRemoveField}
        style={chip}
      >
        {fields.get(index)}
      </Chip>
    )
  }

  isAddIconDisabled = () => {
    const {
      fieldText, fieldInError, fieldAlreadyExist, disabled,
    } = this.state
    return !!(isEmpty(fieldText) || fieldInError || fieldAlreadyExist || disabled)
  }

  getTextFieldProps = () => {
    const {
      warningText, errorText, alreadyExistText,
    } = this.props
    const { fieldInError, fieldText, fieldAlreadyExist } = this.state
    const {
      moduleTheme: {
        renderFieldArray: {
          warnMessageStyle, errorMessageStyle,
        },
      },
    } = this.context
    let messageText = ''
    let messageStyle = {}
    if (!isEmpty(fieldText)) {
      if (fieldAlreadyExist) {
        messageText = alreadyExistText
        messageStyle = errorMessageStyle
      } else if (fieldInError) {
        messageText = errorText
        messageStyle = errorMessageStyle
      } else {
        messageText = warningText
        messageStyle = warnMessageStyle
      }
    }
    return { messageText, messageStyle }
  }

  render() {
    const {
      fields, title, floatingLabelText, disabled,
    } = this.props
    const { fieldText } = this.state
    const {
      moduleTheme: {
        renderFieldArray: {
          fieldListStyle, chipSeparator, info,
        },
      },
    } = this.context
    const textFieldProps = this.getTextFieldProps()

    return (
      <div>
        <p style={info}>{title}</p>
        <div style={fieldListStyle}>
          <TextField
            floatingLabelText={floatingLabelText}
            onKeyPress={this.onKeyPressed}
            value={fieldText}
            onChange={this.onChangeValue}
            errorText={textFieldProps.messageText}
            errorStyle={textFieldProps.messageStyle}
            floatingLabelFocusStyle={textFieldProps.messageStyle}
            disabled={disabled}
          />
          <IconButton onClick={this.onAddField} disabled={this.isAddIconDisabled()}>
            <AddIcon />
          </IconButton>
          <div style={chipSeparator} />
          {fields.map(this.renderChip)}
        </div>
      </div>
    )
  }
}

export default compose(
  withI18n(messages),
  withModuleStyle(styles),
)(RenderFieldArray)
