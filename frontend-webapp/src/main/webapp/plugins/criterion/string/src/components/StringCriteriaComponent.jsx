/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import React from 'react'
import {FormattedMessage} from 'react-intl'
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
  }

  handleChange = (event, value) => {
    this.setState({
      searchField: value,
    })
  }

  getPluginSearchQuery = (state) => {
    return `${this.getAttributeName('searchField')}:"${state.searchField}"`
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    return replace(openSearchQuery, /"/g, '')
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
      </div>
    )
  }
}

export default StringCriteriaComponent
