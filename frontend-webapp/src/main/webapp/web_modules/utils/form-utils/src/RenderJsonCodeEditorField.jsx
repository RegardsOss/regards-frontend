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
import { ErrorDecoratorComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { AceEditorAdapter } from '@regardsoss/adapters'

class RenderJsonCodeEditorField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.object,
      name: PropTypes.string,
    }),
    // Define label when you want a default value for hintText AND floatingLabelText
    // But label will be overridden if you specify hintText or floatingLabelText
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        key: PropTypes.string,
        props: PropTypes.object,
      })]),
    }),
    // fullWidth: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
  }

  static contextTypes = {
    ...themeContextType,
  }

  static EDITOR_PROPS = {
    showLineNumbers: true,
    readOnly: false,
  }

  state = {
    currentValue: "{}",
  }

  onAceChange = (newValue) => {
    this.parseJSON(newValue)
  }

  parseJSON = (jsonString) => {
    const { input } = this.props
    try {
      input.onChange(JSON.parse(jsonString))
    } catch (e) {
      input.onChange(null);
    }
    this.setState({
      currentValue: jsonString
    })
  }

  componentWillMount() {
    if (this.props.input.value) {
      this.parseJSON(JSON.stringify(this.props.input.value) ||  "{}")
    }
  }

  displayError = () => {
    if (this.props.meta.error) {
      return (<ErrorDecoratorComponent>{this.props.meta.error}</ErrorDecoratorComponent>)
    }
    return null
  }

  render() {
    const styles = {
      width: '100%',
      height: '100px',
    }
    return (
      <div>
        {this.props.label}
        {this.displayError()}
        <AceEditorAdapter
          mode="application/json"
          theme="monokai"
          value={this.state.currentValue}
          setOptions={RenderJsonCodeEditorField.EDITOR_PROPS}
          style={styles}
          showPrintMargin={false}
          showGutter
          highlightActiveLine
          onChange={this.onAceChange}
        />
      </div>
    )
  }
}

export default RenderJsonCodeEditorField
