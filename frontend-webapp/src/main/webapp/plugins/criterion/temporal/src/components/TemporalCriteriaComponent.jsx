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
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ClearFieldButton, DatePickerField } from '@regardsoss/components'
import TemporalComparatorComponent from './TemporalComparatorComponent'
import EnumTemporalComparator from '../model/EnumTemporalComparator'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28      59         234
 * ----------  ------   -------   ------------
 *    date      time    seconds   milliseconds
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
    comparator: EnumTemporalComparator.BEFORE,
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
        case EnumTemporalComparator.BEFORE:
          query = `${attribute}:[* TO ${state.searchField.toISOString()}]`
          break
        case EnumTemporalComparator.AFTER:
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
        this.setState({ comparator: EnumTemporalComparator.BEFORE })
        return new Date(values[2])
      }
      if (values[2] === '*') {
        this.setState({ comparator: EnumTemporalComparator.AFTER })
        return new Date(values[1])
      }
    }
    return undefined
  }

  render() {
    const {
      moduleTheme: { rootStyle, labelSpanStyle }, intl,
    } = this.context
    const attributeLabel = this.getAttributeLabel('searchField')
    const { searchField, comparator } = this.state
    const clearButtonDisplayed = searchField !== undefined

    return (
      <div style={rootStyle} >
        <span style={labelSpanStyle} >
          {attributeLabel}
        </span>
        <TemporalComparatorComponent onChange={this.handleChangeComparator} value={comparator} />
        <DatePickerField
          value={searchField}
          onChange={this.handleChangeDate}
          locale={intl.locale}
          dateHintText={intl.formatMessage({ id: 'criterion.date.field.label' })}
          timeHintText={intl.formatMessage({ id: 'criterion.time.field.label' })}
          okLabel={intl.formatMessage({ id: 'criterion.picker.ok.label' })}
          cancelLabel={intl.formatMessage({ id: 'criterion.picker.cancel.label' })}
          displayTime
        />
        <ClearFieldButton onClick={this.handleClear} displayed={clearButtonDisplayed} />
      </div>
    )
  }
}

export default TemporalCriteriaComponent
