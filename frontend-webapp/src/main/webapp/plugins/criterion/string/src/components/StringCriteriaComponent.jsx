/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import {AttributeModel, getAttributeName} from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'

export class StringCriteriaComponent extends PluginComponent {

  static propTypes = {
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)
    this.state = {
      value:''
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
      openSearchQuery = `${getAttributeName(this.props.attributes.searchField)}:"${state.value}*"`
    }
    return openSearchQuery
  }

  render() {
    const attributeLabel = this.props.attributes.searchField.name ? this.props.attributes.searchField.name : null

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
          }}
        >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={{
            top: -13,
            margin: '0px 10px',
            maxWidth: 165,
          }}
        />
      </div>
    )
  }
}

export default StringCriteriaComponent
