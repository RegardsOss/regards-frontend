/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import split from 'lodash/split'
import map from 'lodash/map'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import ClearButton from './ClearButton'
import AttributeModel from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'

/**
 * Search form criteria plugin displaying a simple text field
 *
 * @author Sébastien Binda
 * @author Xavier-Alexandre Brochard
 */
export class StringCriteriaComponent extends PluginComponent {

  static propTypes = {
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  state = {
    searchField: '',
    checked: false,
  }
  onCheck = () => {
    this.setState({checked: !this.state.checked})
  }

  handleChange = (event, value) => {
    this.setState({
      searchField: value,
    })
  }

  getPluginSearchQuery = (state) => {
    if (state.searchField && state.searchField != "") {
      let openSearchQuery = null
      if (this.state.checked) {
        openSearchQuery= `"${state.searchField}"`
      } else {
        const values = split(state.searchField, " ")
        openSearchQuery = map(values, value => `*${value}*`).join(' AND ')
        openSearchQuery = `(${openSearchQuery})`
      }
      return `${this.getAttributeName('searchField')}:${openSearchQuery}`
    }
    return null
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {

    if (openSearchQuery.includes('"')) {
      this.setState({ checked: true })
      return replace(openSearchQuery,/\"/g, '')
    }

    let value = replace(openSearchQuery,/\(/g, '')
    value = replace(value,/\)/g, '')
    value = replace(value,/\*/g, '')
    value= replace(value, / AND /g, ' ')
    return value
  }

  /**
   * Clear the entered value
   */
  handleClear = () => this.handleChange(undefined, '')

  render() {
    const attributeLabel = this.getAttributeLabel('searchField')
    const clearButtonDisplayed = this.state.searchField !== ''

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
            fontSize: '1.3em',
          }}
        >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
          value={this.state.searchField}
          onChange={this.handleChange}
          style={{
            top: -18,
            margin: '0px 10px',
          }}
        />
        <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
        <Checkbox
          label={<FormattedMessage id="criterion.search.field.word.checkbox.label"/>}
          labelPosition="right"
          checked={this.state.checked}
          onCheck={this.onCheck}
          style={{
            width: 150
          }}
        />
      </div>
    )
  }
}

export default StringCriteriaComponent
