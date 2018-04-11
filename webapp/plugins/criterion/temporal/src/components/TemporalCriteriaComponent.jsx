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
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { DatePickerField, NumericalComparator } from '@regardsoss/components'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28      59
 * ----------  ------    --------
 *    date      time    seconds
 *
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriteriaComponent extends PluginCriterionContainer {
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
    searchField: undefined,
    comparator: EnumNumericalComparator.LE,
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Date} newValue The new value of the date field.
   */
  handleChangeDate = (newValue) => {
    this.setState({ searchField: newValue })
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = comparator => this.setState({ comparator })

  /**
   * Clear the entered date & time values
   */
  handleClear = () => this.setState({ searchField: undefined })

  getPluginSearchQuery = (state) => {
    let query = ''
    const attribute = this.getAttributeName('searchField')
    if (state.searchField && state.comparator) {
      switch (state.comparator) {
        case EnumNumericalComparator.LE:
          query = `${attribute}:[* TO ${state.searchField.toISOString()}]`
          break
        case EnumNumericalComparator.GE:
          query = `${attribute}:[${state.searchField.toISOString()} TO *]`
          break
        default:
          console.error('Unavailable comparator')
      }
    }

    return query
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const values = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
    if (values.length === 3) {
      if (values[1] === '*') {
        this.setState({ comparator: EnumNumericalComparator.LE })
        return new Date(values[2])
      }
      if (values[2] === '*') {
        this.setState({ comparator: EnumNumericalComparator.GE })
        return new Date(values[1])
      }
    }
    return undefined
  }

  render() {
    const { moduleTheme: { rootStyle, labelSpanStyle, datePickerStyle }, intl } = this.context
    const attributeLabel = this.getAttributeLabel('searchField')
    const { searchField, comparator } = this.state
    const availableComparators = [EnumNumericalComparator.LE, EnumNumericalComparator.GE]

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>{attributeLabel}</span>
        <NumericalComparator
          onChange={this.handleChangeComparator}
          value={comparator}
          comparators={availableComparators}
        />
        <DatePickerField
          value={searchField}
          onChange={this.handleChangeDate}
          locale={intl.locale}
          style={datePickerStyle}
          dateHintText={intl.formatMessage({ id: 'criterion.date.field.label' })}
          timeHintText={intl.formatMessage({ id: 'criterion.time.field.label' })}
          okLabel={intl.formatMessage({ id: 'criterion.picker.ok.label' })}
          cancelLabel={intl.formatMessage({ id: 'criterion.picker.cancel.label' })}
          displayTime
        />
      </div>
    )
  }
}

export default TemporalCriteriaComponent
