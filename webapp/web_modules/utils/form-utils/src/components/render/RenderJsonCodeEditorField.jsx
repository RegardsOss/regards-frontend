/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { ErrorDecoratorComponent } from '@regardsoss/components'
import { AceEditorAdapter } from '@regardsoss/adapters'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../../styles'

class RenderJsonCodeEditorField extends React.Component {
  static propTypes = {
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    // Define label when you want a default value for hintText AND floatingLabelText
    // But label will be overridden if you specify hintText or floatingLabelText
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    asString: PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    asString: false,
  }

  state = {
    currentValue: '{}',
  }

  UNSAFE_componentWillMount() {
    if (this.props.input.value) {
      if (this.props.asString) {
        this.parseJSON(this.props.input.value)
      } else {
        this.parseJSON(JSON.stringify(this.props.input.value) || '{}')
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const newValue = newProps.input.value
    if (this.props.asString && this.state.currentValue !== newValue) {
      this.setState({
        currentValue: newValue,
      })
    }
  }

  onAceChange = (jsonString) => {
    this.parseJSON(jsonString)
  }

  parseJSON = (jsonString) => {
    const { input } = this.props
    try {
      if (this.props.asString) {
        input.onChange(jsonString)
      } else {
        input.onChange(JSON.parse(jsonString))
      }
    } catch (e) {
      input.onChange(null)
    }
    this.setState({
      currentValue: jsonString,
    })
  }

  displayError = () => {
    if (this.props.meta.error) {
      return (<ErrorDecoratorComponent>{this.props.meta.error}</ErrorDecoratorComponent>)
    }
    return null
  }

  render() {
    const { moduleTheme: { jsonFieldStyles } } = this.context
    const fieldId = `json-field-${this.props.input.name}`
    return (
      <div style={jsonFieldStyles.containerStyle}>
        <label htmlFor={fieldId} style={jsonFieldStyles.labelStyle}>
          {this.props.label}
        </label>
        {this.displayError()}
        <AceEditorAdapter
          id={fieldId}
          mode="json"
          value={this.state.currentValue}
          setOptions={jsonFieldStyles.editorProps}
          style={jsonFieldStyles.fieldStyle}
          onChange={this.onAceChange}
          showPrintMargin={false}
          showGutter
          highlightActiveLine
        />
      </div>
    )
  }
}

export default withModuleStyle(styles)(RenderJsonCodeEditorField)
