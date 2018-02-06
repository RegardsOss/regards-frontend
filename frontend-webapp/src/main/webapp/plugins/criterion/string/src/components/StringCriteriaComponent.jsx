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
import replace from 'lodash/replace'
import split from 'lodash/split'
import map from 'lodash/map'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { ClearFieldButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Search form criteria plugin displaying a simple text field
 *
 * @author Sébastien Binda
 * @author Xavier-Alexandre Brochard
 */
export class StringCriteriaComponent extends PluginCriterionContainer {
  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }


  state = {
    searchField: '',
    checked: false,
  }
  onCheck = () => {
    this.setState({ checked: !this.state.checked })
  }

  handleChange = (event, value) => {
    this.setState({
      searchField: value,
    })
  }

  getPluginSearchQuery = (state) => {
    if (state.searchField && state.searchField !== '') {
      let openSearchQuery = null
      if (this.state.checked) {
        openSearchQuery = `"${state.searchField}"`
      } else {
        const values = split(state.searchField, ' ')
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
      return replace(openSearchQuery, /"/g, '')
    }

    let value = replace(openSearchQuery, /\(/g, '')
    value = replace(value, /\)/g, '')
    value = replace(value, /\*/g, '')
    value = replace(value, / AND /g, ' ')
    return value
  }

  /**
   * Clear the entered value
   */
  handleClear = () => this.handleChange(undefined, '')

  render() {
    const attributeLabel = this.getAttributeLabel('searchField')
    const clearButtonDisplayed = this.state.searchField !== ''
    const {
      moduleTheme: {
        rootStyle, labelSpanStyle, checkboxStyle, textFieldStyle,
      },
    } = this.context

    return (
      <div style={rootStyle} >
        <span style={labelSpanStyle} >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          value={this.state.searchField}
          onChange={this.handleChange}
          style={textFieldStyle}
        />
        <ClearFieldButton onClick={this.handleClear} displayed={clearButtonDisplayed} />
        <Checkbox
          label={<FormattedMessage id="criterion.search.field.word.checkbox.label" />}
          labelPosition="right"
          checked={this.state.checked}
          onCheck={this.onCheck}
          style={checkboxStyle}
        />
      </div>
    )
  }
}

export default StringCriteriaComponent
