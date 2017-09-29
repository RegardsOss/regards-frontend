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
import isNil from 'lodash/isNil'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ClearFieldButton } from '@regardsoss/components'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import EnumTemporalComparator from '../model/EnumTemporalComparator'

/**
 * Component allowing the user to configure the temporal value of two different attributes with a date comparator (after, before, ...).
 * For example, it will display:
 *   [attributeName1] < 23/02/2017 08:00    et    [attributeName2] = 23/02/2017 12:00
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaSimpleComponent extends PluginCriterionContainer {

  static propTypes = {
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  state = {
    firstField: undefined,
    secondField: undefined,
    operator1: EnumTemporalComparator.GE,
    operator2: EnumTemporalComparator.LE,
  }

  changeValue1 = (value, operator) => {
    this.setState({
      firstField: value,
      operator1: operator,
    })
  }

  changeValue2 = (value, operator) => {
    this.setState({
      secondField: value,
      operator2: operator,
    })
  }

  getPluginSearchQuery = (state) => {
    let searchQuery = ''
    if (state.firstField) {
      searchQuery = this.criteriaToOpenSearchFormat('firstField', state.firstField, state.operator1)
    }
    if (state.secondField) {
      if (searchQuery && searchQuery.length > 0) {
        searchQuery = `${searchQuery} AND `
      }
      const searchQuery2 = this.criteriaToOpenSearchFormat('secondField', state.secondField, state.operator2)
      searchQuery = `${searchQuery}${searchQuery2}`
    }
    return searchQuery
  }

  /**
   * Format criterion to openSearch format for plugin handler
   * @param attribute
   * @param value
   * @param operator
   * @returns {string}
   */
  criteriaToOpenSearchFormat = (attribute, value, operator) => {
    let openSearchQuery = ''
    if (operator && value) {
      switch (operator) {
        case EnumTemporalComparator.LE:
          openSearchQuery = `${this.getAttributeName(attribute)}:[* TO ${value.toISOString()}]`
          break
        case EnumTemporalComparator.GE:
          openSearchQuery = `${this.getAttributeName(attribute)}:[${value.toISOString()} TO *]`
          break
        default:
          openSearchQuery = ''
      }
    }
    return openSearchQuery
  }

  /**
   * Clear all fields
   */
  handleClear = () => {
    const { operator1, operator2 } = this.state
    this.changeValue1(undefined, operator1)
    this.changeValue2(undefined, operator2)
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (openSearchQuery.includes('[')) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
      if (values.length === 3) {
        const value = values[1] !== '*' ? values[1] : values[2]
        const operator = values[1] === '*' ? EnumTemporalComparator.LE : EnumTemporalComparator.GE
        if (parameterName === 'firstField') {
          this.setState({ operator1: operator })
        } else {
          this.setState({ operator2: operator })
        }
        const date = new Date(value)
        if (isNaN(date.getTime())) {
          return null
        }
        return date
      }
    }
    return undefined
  }

  render() {
    const { firstField, secondField, operator1, operator2 } = this.state
    const { moduleTheme: { rootStyle, lineStyle } } = this.context
    const clearButtonDisplayed = !isNil(firstField) || !isNil(secondField)

    return (
      <div style={rootStyle}>
        <div
          style={lineStyle}
        >
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            comparator={operator1}
            value={firstField}
            onChange={this.changeValue1}
          />
          <FormattedMessage id="criterion.aggregator.and" />
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            comparator={operator2}
            value={secondField}
            onChange={this.changeValue2}
          />
          <ClearFieldButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed} />
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaSimpleComponent
