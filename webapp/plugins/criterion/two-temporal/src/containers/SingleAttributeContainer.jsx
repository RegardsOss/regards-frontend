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
import isNaN from 'lodash/isNaN'
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TemporalCriteriaComponent from '../components/TemporalCriteriaComponent'

/**
 * Main container for criterion when working on a single attribute: value from X to Y
 *
 * @author Xavier-Alexandre Brochard
 */
export class SingleAttributeContainer extends PluginCriterionContainer {
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

  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state
    const lvalue1 = firstField ? firstField.toISOString() : '*'
    const lvalue2 = secondField ? secondField.toISOString() : '*'
    let searchQuery = ''
    if (firstField || secondField) {
      searchQuery = `${this.getAttributeName('firstField')}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    let date = null
    const groups = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
    if (groups.length === 3) {
      if (parameterName === 'firstField') {
        date = new Date(groups[1])
      } else {
        date = new Date(groups[2])
      }
      if (isNaN(date.getTime())) {
        date = null
      }
    }
    return date
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
    const {
      intl: { formatMessage },
      moduleTheme: {
        rootStyle, lineStyle, labelSpanStyle, lineGroupStyle,
      },
    } = this.context

    return (
      <div style={rootStyle}>
        <div style={lineStyle}>
          <span style={labelSpanStyle}>
            {formatMessage({ id: 'single.attributes.label' }, { label: this.getAttributeLabel('firstField') })}
          </span>
          <div style={lineGroupStyle}>
            <TemporalCriteriaComponent
              value={firstField}
              hintDate={this.getAttributeBoundsInformation('firstField').lowerBound}
              tooltip={this.getFieldTooltip('firstField')}
              disabled={this.hasNoValue('firstField')}
              onChange={this.changeValue1}
            />
            <Arrow />
            <TemporalCriteriaComponent
              value={secondField}
              hintDate={this.getAttributeBoundsInformation('firstField').upperBound}
              tooltip={this.getFieldTooltip('firstField')}
              disabled={this.hasNoValue('firstField')}
              onChange={this.changeValue2}
              isStopDate
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SingleAttributeContainer
