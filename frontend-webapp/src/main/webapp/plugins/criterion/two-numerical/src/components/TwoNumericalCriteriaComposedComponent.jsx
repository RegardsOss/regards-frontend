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
import { FormattedMessage } from 'react-intl'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'
import EnumNumericalComparator from '../model/EnumNumericalComparator'

/**
 * Component allowing the user to configure the numerical value of a single attribute with two mathematical comparators (=, >, <=, ...).
 * For example, it will display:
 *   1400 < [attributeName] < 15
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaComposedComponent extends PluginCriterionContainer {
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

  constructor(props) {
    super(props)
    this.state = {
      firstField: undefined,
      secondField: undefined,
    }
  }

  changeValue1 = (value) => {
    this.setState({
      firstField: value,
    })
  }

  changeValue2 = (value) => {
    this.setState({
      secondField: value,
    })
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const groups = openSearchQuery.match(/\[[ ]{0,1}([0-9*]*) TO ([0-9*]*)[ ]{0,1}\]/)
    if (groups) {
      if (groups.length === 3) {
        if (parameterName === 'firstField') {
          return groups[1]
        }
        return groups[2]
      }
    }
    return null
  }

  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state
    const lvalue1 = firstField || '*'
    const lvalue2 = secondField || '*'
    let searchQuery = ''
    if (firstField || secondField) {
      searchQuery = `${this.getAttributeName('firstField')}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  /**
   * Clear the entered values
   */
  handleClear = () => {
    this.changeValue1(undefined)
    this.changeValue2(undefined)
  }

  render() {
    const { firstField, secondField } = this.state
    const { moduleTheme: { rootStyle, lineStyle, labelSpanStyle }, intl: { formatMessage } } = this.context

    return (
      <div style={rootStyle}>
        <div style={lineStyle} >
          <span style={labelSpanStyle}>
            {formatMessage({ id: 'criterion.aggregator.between' }, { label: this.getAttributeLabel('firstField') })}
          </span>
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            value={firstField}
            comparator={EnumNumericalComparator.LE}
            onChange={this.changeValue1}
            hideAttributeName
            hideComparator
            reversed
            fixedComparator
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and" /></span>
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            value={secondField}
            comparator={EnumNumericalComparator.GE}
            onChange={this.changeValue2}
            hideAttributeName
            hideComparator
            fixedComparator
          />
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaComposedComponent
