/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain, CatalogDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds } from '@regardsoss/plugins-api'
import TemporalCriterionComponent from '../components/TemporalCriterionComponent'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriterionContainer extends React.Component {
  /** Available operators for date attributes */
  static AVAILABLE_COMPARISON_OPERATORS = [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.GE]

  /** Default state for floating types (equal operator is not available) */
  static DEFAULT_STATE = {
    value: null,
    operator: CommonDomain.EnumNumericalComparator.LE,
  }

  static propTypes = {
    /** Plugin identifier */
    pluginInstanceId: PropTypes.string.isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      value: PropTypes.string, // note: the date is defined as ISO date string to avoid growing the state size on URLs
      operator: PropTypes.oneOf([CommonDomain.EnumNumericalComparator.GE, CommonDomain.EnumNumericalComparator.LE]), // only accepts >= and <=
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: TemporalCriterionContainer.DEFAULT_STATE,
  }

  /**
   * DatePicker returned dates with the local timeZone of the user browser.
   * All date search request must be UTC dates. So we need to remove timeZone from picked dates.
   * For exemple if the user as selected the date Wed Dec 07 2016 01:00:00 GMT+0100 then we should request with Wed Dec 07 2016 01:00:00 GMT
   * @param {string} isoDateString date to remove timezone from (string date in ISO format)
   * @return {string} converted date string in ISO format
   */
  static removeTimeZone = (isoDateString) => {
    if (isoDateString) {
      const dateWithTZ = new Date(Date.parse(isoDateString))
      const dateWithoutTZ = new Date(dateWithTZ.getTime() - (dateWithTZ.getTimezoneOffset() * 60000))
      return dateWithoutTZ.toISOString()
    }
    return null
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{ value: string, operator: string }} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ value, operator }, attribute) {
    let q = null
    if (value && operator && attribute.jsonPath) {
      const dateWithoutTZ = TemporalCriterionContainer.removeTimeZone(value)
      let rangeAsQuery = ''
      switch (operator) {
        case CommonDomain.EnumNumericalComparator.LE:
          rangeAsQuery = `[* TO ${dateWithoutTZ}]`
          break
        case CommonDomain.EnumNumericalComparator.GE:
          rangeAsQuery = `[${dateWithoutTZ} TO *]`
          break
        default:
          throw new Error(`Invalid comparator type ${operator}`)
      }
      q = new CatalogDomain.OpenSearchQueryParameter(attribute.jsonPath, rangeAsQuery).toQueryString()
    } // else: no query
    return { q }
  }


  /**
   * Callback function that is fired when the date value changes.
   * @param {Date} date new selected date
   */
  onDateChanged = (date) => {
    // update state value and publish new state with query
    const { state, publishState, attributes: { searchField } } = this.props
    const newState = { ...state, value: date ? date.toISOString() : null }
    publishState(newState, TemporalCriterionContainer.convertToRequestParameters(newState, searchField))
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  onOperatorSelected = (operator) => {
    // update state operator and publish new state with query
    const { state, publishState, attributes: { searchField } } = this.props
    const newState = { ...state, operator }
    publishState(newState, TemporalCriterionContainer.convertToRequestParameters(newState, searchField))
  }

  render() {
    const {
      pluginInstanceId, label, state: { value, operator }, attributes: { searchField },
    } = this.props
    return (
      <TemporalCriterionComponent
        pluginInstanceId={pluginInstanceId}
        label={label}
        searchAttribute={searchField}
        value={value ? new Date(value) : null} // provide value as date to components below
        operator={operator}
        availableComparators={TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS}
        onDateChanged={this.onDateChanged}
        onOperatorSelected={this.onOperatorSelected}
      />
    )
  }
}

export default TemporalCriterionContainer
