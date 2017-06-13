/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import {AttributeModel, getAttributeName} from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'

export class StringCriteriaComponent extends PluginComponent {

  static propTypes = {
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  changeValue = (value) => {
    this.setState({
      value
    }, this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      openSearchQuery = `${getAttributeName(this.props.attributes.searchField)}:"${state.value}"`
    }
    return openSearchQuery
  }

  /**
   * Clear the entered value
   */
  handleClear = () => {
    this.setState({
      value: '',
    }, this._onPluginChangeValue)
  }

  render() {
    const attributeLabel = this.props.attributes.searchField.label || this.props.attributes.searchField.name || this.props.attributes.searchField.id || 'Undefined attribute'
    const { value } = this.state
    const iconButtonScale = value !== '' ? 1 : 0

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            margin: '0px 10px',
            fontSize: '1.3em'
          }}
        >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
          value={value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={{
            top: -18,
            margin: '0px 10px'
          }}
        />
        <IconButton
          tooltip={<FormattedMessage id="criterion.clear" />}
          style={{transform:`scale(${iconButtonScale})`}}
        >
          <Clear onTouchTap={this.handleClear}/>
        </IconButton>
      </div>
    )
  }
}

export default StringCriteriaComponent
