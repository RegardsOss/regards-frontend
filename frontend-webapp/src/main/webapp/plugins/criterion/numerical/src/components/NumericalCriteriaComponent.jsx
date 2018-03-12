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
import isNaN from 'lodash/isNaN'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { NumericalComparator } from '@regardsoss/components'
import { EnumNumericalComparator } from '@regardsoss/domain/common'

/**
 * Search form criteria plugin displaying a simple number field
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends PluginCriterionContainer {
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
    comparator: EnumNumericalComparator.EQ,
  }

  getPluginSearchQuery = (state) => {
    let query = ''
    if (state.searchField && state.comparator) {
      const attribute = this.getAttributeName('searchField')
      switch (state.comparator) {
        case EnumNumericalComparator.EQ:
          query = `${attribute}:${state.searchField}`
          break
        case EnumNumericalComparator.GE:
          query = `${attribute}:[${state.searchField} TO *]`
          break
        case EnumNumericalComparator.LE:
          query = `${attribute}:[* TO ${state.searchField}]`
          break
        case EnumNumericalComparator.NE:
          query = `!(${attribute}:${state.searchField})`
          break
        default:
          console.error('Unavailable comparator')
      }
    }

    return query
  }

  /**
   * Parses the value given from the field input component.
   *
   * @param {String} value
   */
  parse = value => parseFloat(value)

  /**
   * Formats the value before displaying in the field input component.
   *
   * @param {String} value
   */
  format = value => !isNaN(value) ? value : ''

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const searchField = this.parse(newValue)
    this.setState({ searchField })
  }

  handleChangeComparator = (comparator) => {
    this.setState({ comparator })
  }

  /**
   * Clear the entered value
   */
  handleClear = () => {
    this.setState({ searchField: '' })
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (isNaN(openSearchQuery)) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([0-9*]*) TO ([0-9*]*)[ ]{0,1}\]/) || []
      if (values.length === 3) {
        if (values[1] === '*') {
          this.setState({ comparator: EnumNumericalComparator.LE })
          return values[2]
        }
        if (values[2] === '*') {
          this.setState({ comparator: EnumNumericalComparator.GE })
          return values[1]
        }
      }
      return null
    }
    return openSearchQuery
  }


  render() {
    const { moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context
    const attributeLabel = this.getAttributeLabel('searchField')
    const { searchField } = this.state
    const availableComparators = [
      EnumNumericalComparator.EQ,
      EnumNumericalComparator.NE,
      EnumNumericalComparator.GE,
      EnumNumericalComparator.LE,
    ]
    return (
      <div style={rootStyle} >
        <span style={labelSpanStyle} >
          {attributeLabel}
        </span>
        <NumericalComparator
          value={this.state.comparator}
          onChange={this.handleChangeComparator}
          comparators={availableComparators}
        />
        <TextField
          id="search"
          type="number"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          value={this.format(searchField)}
          onChange={this.handleChangeValue}
          style={textFieldStyle}
        />
      </div>
    )
  }
}

export default NumericalCriteriaComponent
