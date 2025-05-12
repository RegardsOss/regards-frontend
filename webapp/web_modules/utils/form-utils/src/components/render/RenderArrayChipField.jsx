/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import { fieldArrayFieldsPropTypes } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { ScrollArea } from '@regardsoss/adapters'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import AddIcon from 'mdi-material-ui/PlusCircleOutline'
import Chip from 'material-ui/Chip'
import styles from '../../styles'
import messages from '../../i18n'

class RenderArrayChipField extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    // From redux form
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    newValue: '',
    fieldAlreadyExist: false,
  }

  onAddNewValue = () => {
    const { fields } = this.props
    const { newValue } = this.state
    if (newValue) {
      fields.push({ value: newValue })
      this.setState({
        newValue: '',
      })
    }
  }

  onRemoveValue = (index) => {
    const { fields } = this.props
    fields.remove(index)
  }

  handleChange = (event, value) => {
    const { fields } = this.props
    const fieldsValue = fields.getAll()
    this.setState({
      newValue: value,
      // eslint-disable-next-line lodash/matches-shorthand
      fieldAlreadyExist: find(fieldsValue, (fieldValue) => fieldValue.value === value),
    })
  }

  renderField = (field, index) => {
    const { fields } = this.props
    const { moduleTheme: { renderChipField: { chipStyle, chipDivStyle } } } = this.context
    const title = fields.get(index)
    return (
      <Chip
        onRequestDelete={() => this.onRemoveValue(index)}
        key={index}
        title={title.value}
        style={chipStyle}
      >
        <div style={chipDivStyle}>
          {title.value}
        </div>
      </Chip>
    )
  }

  isAddIconDisabled = () => {
    const {
      newValue, fieldAlreadyExist,
    } = this.state
    return !!(isEmpty(newValue) || fieldAlreadyExist)
  }

  getTextMessage = () => {
    const { fields } = this.props
    const { newValue, fieldAlreadyExist } = this.state
    const { moduleTheme: { renderChipField: { defaultElementStyle, addNewElementStyle } } } = this.context
    const {
      intl: { formatMessage },
    } = this.context
    let messageText = ''
    let messageStyle = {}
    if (!isEmpty(fields)) {
      messageText = formatMessage({ id: 'render.chip.display' })
      messageStyle = defaultElementStyle
    } else {
      messageText = formatMessage({ id: 'render.chip.none' })
      messageStyle = defaultElementStyle
    }

    if (!isEmpty(newValue)) {
      messageStyle = addNewElementStyle
      if (fieldAlreadyExist) {
        messageText = formatMessage({ id: 'render.chip.exist' })
      } else {
        messageText = formatMessage({ id: 'render.chip.warn' })
      }
    }
    return { messageText, messageStyle }
  }

  onKeyPressed = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      this.onAddNewValue()
    }
  }

  render() {
    const {
      fields, type,
    } = this.props
    const {
      moduleTheme: {
        renderChipField: {
          mainDivStyle, divStyle, addNewElementStyle, underlineFocusStyle,
          scrollAreaStyle, scrollDivStyle,
        },
      },
      intl: { formatMessage },
    } = this.context
    const { newValue } = this.state
    const textMessage = this.getTextMessage()
    return (
      <div style={mainDivStyle}>
        <div style={divStyle}>
          <TextField
            hintText={formatMessage({ id: 'render.chip.input' })}
            onKeyPress={this.onKeyPressed}
            value={newValue}
            onChange={this.handleChange}
            type={type}
            errorStyle={textMessage.messageStyle}
            errorText={textMessage.messageText}
            underlineFocusStyle={underlineFocusStyle}
            fullWidth
          />
          <IconButton
            onClick={this.onAddNewValue}
            disabled={this.isAddIconDisabled()}
            iconStyle={!this.isAddIconDisabled() ? addNewElementStyle : null}
          >
            <AddIcon />
          </IconButton>
        </div>
        <ScrollArea
          vertical
          style={scrollAreaStyle}
        >
          <div style={scrollDivStyle}>
            {fields.map(this.renderField)}
          </div>
        </ScrollArea>
      </div>

    )
  }
}

export default withI18n(messages)(withModuleStyle(styles)(RenderArrayChipField))
