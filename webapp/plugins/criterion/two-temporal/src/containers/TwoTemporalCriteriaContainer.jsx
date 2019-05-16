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
import { connect } from '@regardsoss/redux'
import { AttributeModelWithBounds, pluginStateActions, pluginStateSelectors } from '@regardsoss/plugins-api'
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

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    return {
      // current state from redux store
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || TwoTemporalCriteriaContainer.DEFAULT_STATE,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    return {
      publishState: (state, requestParameters) => dispatch(pluginStateActions.publishState(pluginInstanceId, state, requestParameters)),
    }
  }

  static propTypes = {
    /** Plugin identifier */
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: PropTypes.string.isRequired, // used in mapStateToProps and mapDispatchToProps
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      firstField: AttributeModelWithBounds.isRequired,
      secondField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // From mapStateToProps...
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      value1: PropTypes.string, // note: the dates are defined as ISO date string to avoid growing the state size on URLs
      value2: PropTypes.string,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts values as parameter into an open search range query
   * @param {Date} value1 first range value
   * @param {Date} value2 second range value
   * @param {*} attribute corresponding data attribute
   * @return {string} corresponding query or null if it should not be available for that range
   */
  static convertRangeToQuery(value1, value2, attribute) {
    return attribute.jsonPath && (value1 || value2) ? `${attribute.jsonPath}:[${value1 || '*'} TO ${value2 || '*'}]` : null
  }

  /**
   * Converts current state into a single attribute query (both values express a single attribute range)
   * @param {{value1: Date, value2: Date}} plugin state values
   * @param {*} attribute criterion attribute
   * @return {string} corresponding search query or null if there should be none in current state
   */
  static convertToSingleAttributeQuery({ value1, value2 }, attribute) {
    return TwoTemporalCriteriaContainer.convertRangeToQuery(
      TwoTemporalCriteriaContainer.removeTimeZone(value1),
      TwoTemporalCriteriaContainer.removeTimeZone(value2),
      attribute)
  }

  /**
   * DatePicker returned dates with the local timeZone of the user browser.
   * All date search request must be UTC dates. So we need to remove timeZone from picked dates.
   * For exemple if the user as selected the date Wed Dec 07 2016 01:00:00 GMT+0100 then we should request with Wed Dec 07 2016 01:00:00 GMT
   * @param {string} isoDateString date to remove timezone from (string date in ISO format)
   * @return {string} converted date string in ISO format
   */
  static removeTimeZone = (isoDateString) => {
    const dateWithTZ = new Date(Date.parse(isoDateString))
    const dateWithoutTZ = new Date(dateWithTZ.getTime() - (dateWithTZ.getTimezoneOffset() * 60000))
    return dateWithoutTZ.toISOString()
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
    return [
      TwoTemporalCriteriaContainer.convertRangeToQuery(TwoTemporalCriteriaContainer.removeTimeZone(value1), null, secondAttribute),
      TwoTemporalCriteriaContainer.convertRangeToQuery(null, TwoTemporalCriteriaContainer.removeTimeZone(value2), firstAttribute),
    ]
      .filter(query => !!query)// clear empty queries
      .join(' AND ') || null // Join all parts with open search instruction, return null if string is empty
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
    const { state: { value1, value2 }, attributes: { firstField, secondField } } = this.props
    return (
      <TwoTemporalCriteriaComponent
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

export default connect(
  TwoTemporalCriteriaContainer.mapStateToProps,
  TwoTemporalCriteriaContainer.mapDispatchToProps)(TwoTemporalCriteriaContainer)
