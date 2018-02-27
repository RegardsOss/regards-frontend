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
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'
import EnumNumericalComparator from '../model/EnumNumericalComparator'

/**
 * Component allowing the user to configure the numerical value of two different attributes with a mathematical comparator (=, >, <=, ...).
 * For example, it will display:
 *   [attributeName1] < 1400    et    [attributeName2] !=  15
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaSimpleComponent extends PluginCriterionContainer {
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
    firstField: undefined,
    secondField: undefined,
    operator1: EnumNumericalComparator.GE,
    operator2: EnumNumericalComparator.LE,
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
    const {
      firstField, secondField, operator1, operator2,
    } = state
    let searchQuery = ''
    if (firstField) {
      searchQuery = this.criteriaToOpenSearchFormat('firstField', firstField, operator1)
    }
    if (secondField) {
      if (searchQuery && searchQuery.length > 0) {
        searchQuery = `${searchQuery} AND `
      }
      const searchQuery2 = this.criteriaToOpenSearchFormat('secondField', secondField, operator2)
      searchQuery = `${searchQuery}${searchQuery2}`
    }
    return searchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (isNaN(openSearchQuery)) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([0-9*]*) TO ([0-9*]*)[ ]{0,1}\]/)
      if (values && values.length === 3) {
        const value = values[1] !== '*' ? values[1] : values[2]
        const operator = values[1] === '*' ? EnumNumericalComparator.LE : EnumNumericalComparator.GE
        if (parameterName === 'firstField') {
          this.setState({ operator1: operator })
        } else {
          this.setState({ operator2: operator })
        }
        return value
      }
    } else {
      if (parameterName === 'firstField') {
        this.setState({ operator1: EnumNumericalComparator.EQ })
      } else {
        this.setState({ operator2: EnumNumericalComparator.EQ })
      }
      return openSearchQuery
    }

    return undefined
  }

  /**
   * Clear the entered value
   */
  handleClear = () => {
    const { operator1, operator2 } = this.state
    this.changeValue1(undefined, operator1)
    this.changeValue2(undefined, operator2)
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
    const lvalue = value || '*'
    switch (operator) {
      case EnumNumericalComparator.EQ:
        openSearchQuery = `${this.getAttributeName(attribute)}:${lvalue}`
        break
      case EnumNumericalComparator.LE:
        openSearchQuery = `${this.getAttributeName(attribute)}:[* TO ${lvalue}]`
        break
      case EnumNumericalComparator.GE:
        openSearchQuery = `${this.getAttributeName(attribute)}:[${lvalue} TO *]`
        break
      default:
        openSearchQuery = ''
    }
    return openSearchQuery
  }

  render() {
    const {
      firstField, secondField, operator1, operator2,
    } = this.state
    const { moduleTheme: { rootStyle, lineStyle } } = this.context
    return (
      <div style={rootStyle}>
        <div
          style={lineStyle}
        >
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            value={firstField}
            comparator={operator1}
            onChange={this.changeValue1}
            fixedComparator={false}
          />
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            value={secondField}
            comparator={operator2}
            onChange={this.changeValue2}
            fixedComparator={false}
          />
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaSimpleComponent
