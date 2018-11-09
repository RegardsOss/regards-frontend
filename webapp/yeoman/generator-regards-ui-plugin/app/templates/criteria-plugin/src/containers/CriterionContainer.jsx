/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import replace from 'lodash/replace'
import TextField from 'material-ui/TextField'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Main <%= name %> plugin container
 * @author <%= author %>
 */
export class CriterionContainer extends PluginCriterionContainer {
  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access through this.context
    ...i18nContextType,
  }

  state = {
    searchField: '',
  }

  /**
   * User changed text field input: update state and query
   * @param {*} event -
   * @param {string} value new input value
   */
  onChange = (event, value) => {
    this.setState({
      searchField: value,
    })
  }

  /**
   * Clear the entered value (called when user resets the form, mandatory)
   */
  onClear = () => this.handleChange(undefined, '')

  /**
   * Method to create openSearch request associated to the current criteria
   *
   * @param state current state
   * @return {string} open search query containing parameter and value
   */
  getPluginSearchQuery = (state) => {
    if (state.searchField && state.searchField !== '') {
      // TODO Open search logic goes here
      return `${this.getAttributeName('searchField')}:*${state.searchField}*`
    }
    return null
  }

  /**
   *
   * @param {string} parameterName - (useful when dealing with multiple parameters)
   * @param {string} openSearchQuery right part of the open search query generated by getPluginSearchQuery (ie: XXX:*abc* => *abc*)
   * @return {string} value, from query, for this.state[parameterName]  (in example, searchField)
   */
  parseOpenSearchQuery = (parameterName, openSearchQuery) => replace(openSearchQuery, /\*/g, '')

  /**
   * Method to display criterion
   */
  render() {
    const { intl: { formatMessage }, moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context
    const { searchField } = this.state

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>
          {this.getAttributeLabel('searchField')}
        </span>
        <TextField
          id="search"
          // Genererate type label as floating text
          floatingLabelText={this.getFieldHintText('searchField', PluginCriterionContainer.BOUND_TYPE.NONE)}
          title={this.getFieldTooltip('searchField')}
          value={searchField}
          onChange={this.onChange}
          style={textFieldStyle}
        />
      </div>
    )
  }
}
export default CriterionContainer