/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import {AttributeModel, getAttributeName} from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'

export class StringCriteriaComponent extends PluginComponent {

  static propTypes = {
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  state = {
    searchField : '',
  }

  handleChange = (event, value) => {
    this.setState({
      searchField: value
    })
  }

  getPluginSearchQuery = (state) => {
    let openSearchQuery = ''
    if (state.searchField && state.searchField.length > 0) {
      openSearchQuery = `${this.getAttributeName('searchField')}:"${state.searchField}"`
    }
    return openSearchQuery
  }

  /**
   * Remove " character used for openSearch query
   * @returns {*}
   */
  getDisplayedValue = () => {
    return replace(this.state.searchField,/"/g,'')
  }

  render() {

    console.error("PROPS",this.props,this.state)

    const attributeLabel = this.getAttributeLabel('searchField')

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
          value={this.getDisplayedValue()}
          onChange={this.handleChange}
          style={{
            top: -18,
            margin: '0px 10px'
          }}
        />
      </div>
    )
  }
}

export default StringCriteriaComponent
