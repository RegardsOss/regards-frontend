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
import { CatalogDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds } from '@regardsoss/plugins-api'
import TwoTemporalCriteriaComponent from '../components/TwoTemporalCriteriaComponent'

/**
 * Main plugin container: it handles both single attribute and multiple attributes behavior (as date ranges always behaves the same, except for
 * generated open search queries)
 *
 * @author Raphaël Mechali
 */
export class TwoTemporalCriteriaContainer extends React.Component {
  /** Default component state */
  static DEFAULT_STATE = {
    value1: undefined, // first attribute value
    value2: undefined, // second attribute value (or range value when working with single attribute)
  }

  static propTypes = {
    /** Plugin identifier */
    pluginInstanceId: PropTypes.string.isRequired,
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      firstField: AttributeModelWithBounds.isRequired,
      secondField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      value1: PropTypes.string, // note: the dates are defined as ISO date string to avoid growing the state size on URLs
      value2: PropTypes.string,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: TwoTemporalCriteriaContainer.DEFAULT_STATE,
  }

  /**
   * Converts values as parameter into an open search range query
   * @param {Date} value1 first range value
   * @param {Date} value2 second range value
   * @param {*} attribute corresponding data attribute
   * @return {string} corresponding query or null if it should not be available for that range
   */
  static convertRangeToQueryParam(value1, value2, attribute) {
    return new CatalogDomain.OpenSearchQueryParameter(attribute.jsonPath,
      attribute.jsonPath && (value1 || value2) ? `[${value1 || '*'} TO ${value2 || '*'}]` : null)
  }

  /**
   * Converts current state into a single attribute query (both values express a single attribute range)
   * @param {{value1: Date, value2: Date}} plugin state values
   * @param {*} attribute criterion attribute
   * @return {string} corresponding search query or null if there should be none in current state
   */
  static convertToSingleAttributeQuery({ value1, value2 }, attribute) {
    return TwoTemporalCriteriaContainer.convertRangeToQueryParam(
      TwoTemporalCriteriaContainer.removeTimeZone(value1),
      TwoTemporalCriteriaContainer.removeTimeZone(value2),
      attribute).toQueryString()
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
   * Converts current state into a mutltiple attributes (date range) query
   * @param {{value1: string, value2: string}} plugin state values
   * @param {*} attribute criterion attribute
   * @return {string} corresponding search query or null if there should be none in current state
   */
  static convertToMultipleAttributesQuery({ value1, value2 }, firstAttribute, secondAttribute) {
    // Note: in multiple values case, value1 applies to attribute2 and value2 to attribute 1
    // Example:
    // Attr1: PERIOD_START = 01/01/2010
    // attr2: PERIOD_END = 31/01/2010
    // PERDIOD_END >= 01/01/2010 AND PERIOD_START <= 31/01/2010
    return new CatalogDomain.OpenSearchQuery([
      TwoTemporalCriteriaContainer.convertRangeToQueryParam(TwoTemporalCriteriaContainer.removeTimeZone(value1), null, secondAttribute),
      TwoTemporalCriteriaContainer.convertRangeToQueryParam(null, TwoTemporalCriteriaContainer.removeTimeZone(value2), firstAttribute),
    ]).toQueryString()
  }

  /**
   * Updates this component state
   * @param {value1: string, value2: string} newState new state for plugin
   */
  onUpdateState = (newState) => {
    const { publishState, attributes: { firstField, secondField } } = this.props
    const newQuery = firstField.jsonPath === secondField.jsonPath // single attribute?
      ? TwoTemporalCriteriaContainer.convertToSingleAttributeQuery(newState, firstField) // yes: single attribute query
      : TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery(newState, firstField, secondField) // no: multiple attributes query
    publishState(newState, { q: newQuery })
  }

  /**
   * Callback: user selected a new min value for range
   * @param {Date} date selected date for value 1 (or undefined / null)
   */
  onDate1Changed = date => this.onUpdateState({ ...this.props.state, value1: date ? date.toISOString() : null })

  /**
   * Callback: user selected a new max value for range
   * @param {Date} date selected date for value 2 (or undefined / null)
   */
  onDate2Changed = date => this.onUpdateState({ ...this.props.state, value2: date ? date.toISOString() : null })

  render() {
    const {
      pluginInstanceId, label,
      state: { value1, value2 },
      attributes: { firstField, secondField },
    } = this.props
    return (
      <TwoTemporalCriteriaComponent
        pluginInstanceId={pluginInstanceId}
        label={label}
        attribute1={firstField}
        attribute2={secondField}
        value1={value1 && new Date(value1)} // provide value as date to components below
        value2={value2 && new Date(value2)} // provide value as date to components below
        onDate1Changed={this.onDate1Changed}
        onDate2Changed={this.onDate2Changed}
      />
    )
  }
}

export default TwoTemporalCriteriaContainer
