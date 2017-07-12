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
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import NumericalComparatorComponent from './NumericalComparatorComponent'
import ClearButton from './ClearButton'
import PluginComponent from '../common/PluginComponent'
import AttributeModel from '../common/AttributeModel'
import EnumNumericalComparator from '../model/EnumNumericalComparator'

/**
 * Search form criteria plugin displaying a simple number field
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends PluginComponent {

  static propTypes = {
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  state = {
    searchField: undefined,
    comparator: EnumNumericalComparator.EQ,
  }

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
    this.setState({ searchField: undefined })
  }

  getPluginSearchQuery = (state) => {
    let query = ''
    if (state.searchField && state.comparator) {
      const attribute = this.getAttributeName('searchField')
      switch (state.comparator) {
        case EnumNumericalComparator.EQ:
          query = `${attribute}:${state.searchField}`
          break
        case EnumNumericalComparator.GE :
          query = `${attribute}:[${state.searchField} TO *]`
          break
        case EnumNumericalComparator.LE :
          query = `${attribute}:[* TO ${state.searchField}]`
          break
        case EnumNumericalComparator.NE :
          query = `${attribute}:!${state.searchField}`
          break
        default :
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

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (isNaN(openSearchQuery)) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([0-9\*]*) TO ([0-9\*]*)[ ]{0,1}\]/)
      if (values.length === 3) {
        if (values[1] === "*") {
          this.setState({ comparator: EnumNumericalComparator.LE })
          return values[2]
        }
        if (values[2] === "*") {
          this.setState({ comparator: EnumNumericalComparator.GE })
          return values[1]
        }
      }
      return null
    }
    return openSearchQuery
  }

  render() {
    const attributeLabel = this.getAttributeLabel('searchField')
    const { searchField } = this.state
    const clearButtonDisplayed = !isNaN(searchField)

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
        <NumericalComparatorComponent
          value={this.state.comparator}
          onChange={this.handleChangeComparator}
        />
        <TextField
          id="search"
          type="number"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
          value={this.format(searchField)}
          onChange={this.handleChangeValue}
          style={{
            top: -13,
            maxWidth: 80,
            margin: '0px 10px',
          }}
        />
        <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
      </div>
    )
  }
}

export default NumericalCriteriaComponent
