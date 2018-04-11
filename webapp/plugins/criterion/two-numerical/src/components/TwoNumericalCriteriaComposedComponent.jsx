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
import { FormattedMessage } from 'react-intl'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PluginCriterionContainer, numberRangeHelper } from '@regardsoss/plugins-api'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'

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

  /** Default component state */
  static DEFAULT_STATE = {
    firstField: undefined,
    secondField: undefined,
  }

  /** Initial state */
  state = TwoNumericalCriteriaComposedComponent.DEFAULT_STATE

  /**
   * Callback: user changed value 1
   * @param {number} value as parsed by NumericalCriteriaComponent
   */
  onChangeValue1 = (value) => {
    this.setState({
      firstField: value,
    })
  }

  /**
   * Callback: user changed value 2
   * @param {number} value as parsed by NumericalCriteriaComponent
   */
  onChangeValue2 = (value) => {
    this.setState({
      secondField: value,
    })
  }

  /**
   * @param state this current state
   * @return open search query corresponding to current state
   */
  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const range = numberRangeHelper.parseRange(openSearchQuery)
    // first field is lower bound, second field is upper bound. The value is set when bound is not infinity
    if (parameterName === 'firstField') {
      if (!range.isInfiniteLowerBound()) {
        return range.lowerBound
      }
    } else if (!range.isInfiniteUpperBound()) {
      return range.upperBound
    }

    return null
  }

  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state
    return numberRangeHelper.getNumberAttributeQueryPart(this.getAttributeName('firstField'),
      new numberRangeHelper.NumberRange(firstField, secondField))
  }

  /**
   * Clear the entered values
   */
  handleClear = () => {
    this.setState(TwoNumericalCriteriaComposedComponent.DEFAULT_STATE)
  }

  render() {
    const { firstField, secondField } = this.state
    const {
      moduleTheme: {
        rootStyle, lineStyle, labelSpanStyle, lineGroupStyle,
      },
      intl: { formatMessage },
    } = this.context

    return (
      <div style={rootStyle}>
        <div style={lineStyle}>
          <span style={labelSpanStyle}>
            {formatMessage(
              { id: 'criterion.aggregator.between' },
              { label: this.getAttributeLabel('firstField') },
            )}
          </span>
          <div style={lineGroupStyle}>
            <NumericalCriteriaComponent
              label={this.getAttributeLabel('firstField')}
              value={firstField}
              comparator={EnumNumericalComparator.LE}
              onChange={this.onChangeValue1}
              hideAttributeName
              hideComparator
              reversed
            />
            <span style={{ marginRight: 10 }}>
              <FormattedMessage id="criterion.aggregator.and" />
            </span>
            <NumericalCriteriaComponent
              label={this.getAttributeLabel('secondField')}
              value={secondField}
              comparator={EnumNumericalComparator.GE}
              onChange={this.onChangeValue2}
              hideAttributeName
              hideComparator
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaComposedComponent
