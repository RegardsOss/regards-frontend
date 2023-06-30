/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds, DateRange } from '@regardsoss/plugins-api'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
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
    error: false,
    time1: null, // first attribute value
    time2: null, // second attribute value (or range value when working with single attribute)
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
      error: PropTypes.bool.isRequired,
      time1: PropTypes.number, // note: dates are stored as time stamps
      time2: PropTypes.number,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: TwoTemporalCriteriaContainer.DEFAULT_STATE,
  }

  /**
   * Is working in single attribute? (both attributes are the same one)
   * @param {*} firstAttribute matching AttributeModelWithBounds
   * @param {*} secondAttribute matching AttributeModelWithBounds
   * @return {boolean} true when single attribute mode, false otherwise
   */
  static isSingleAttribute(firstAttribute, secondAttribute) {
    return firstAttribute.jsonPath === secondAttribute.jsonPath
  }

  /**
   * Converts current state to query, when possible and required
   * @param {{error: boolean, time1: number, time2: number}} state
   * @param {*} firstAttribute matching AttributeModelWithBounds
   * @param {*} secondAttribute matching AttributeModelWithBounds
   */
  static convertToQuery({
    time1, time2, error,
  }, firstAttribute, secondAttribute) {
    // error or no input: no query
    if (error || (isNil(time1) && isNil(time2))) {
      return {}
    }

    // range on single attribute
    if (TwoTemporalCriteriaContainer.isSingleAttribute(firstAttribute, secondAttribute)) {
      return {
        q: DateRange.getDateQueryParameter(firstAttribute.jsonPath,
          new DateRange(time1, time2)).toQueryString(),
      }
    }
    // range on 2 attributes: value1 applies to attribute2 and value2 to attribute 1. Example:
    // Attr1: PERIOD_START = 01/01/2010
    // attr2: PERIOD_END = 31/01/2010
    // PERDIOD_END >= 01/01/2010 (A) AND PERIOD_START <= 31/01/2010 (B)
    return {
      q: new CatalogDomain.OpenSearchQuery([
        DateRange.getDateQueryParameter(secondAttribute.jsonPath, new DateRange(time1, null)), // A
        DateRange.getDateQueryParameter(firstAttribute.jsonPath, new DateRange(null, time2)), // B
      ]).toQueryString(),
    }
  }

  /**
   * Computes error state for user selected times and configured attributes
   * @param {number} time1 first time
   * @param {number} time2  second time
   * @param {*} firstAttribute matching AttributeModelWithBounds
   * @param {*} secondAttribute matching AttributeModelWithBounds
   * @return {boolean} true when in error, false otherwise
   */
  static isInError(time1, time2, firstAttribute, secondAttribute) {
    // No error when no input
    if (isNil(time1) && isNil(time2)) {
      return false
    }
    // Single attribute case: error when restriction range does not cross attribute bounds
    if (TwoTemporalCriteriaContainer.isSingleAttribute(firstAttribute, secondAttribute)) {
      return !DateRange.isValidRestrictionOn(firstAttribute, new DateRange(time1, time2))
    }
    // Two attribute case: reversed (see convertToQuery comments):
    // attr2 => time1 && attr1 <= time2
    return new DateRange(time1, time2).isEmpty()
    || (!isNil(time1) && !DateRange.isValidRestrictionOn(secondAttribute,
      DateRange.convertToRange(time1, EnumNumericalComparator.GE)))
    || (!isNil(time2) && !DateRange.isValidRestrictionOn(firstAttribute,
      DateRange.convertToRange(time2, EnumNumericalComparator.LE)))
  }

  /**
   * Updates this component state
   * @param {number} time1 first date time
   * @param {number} time2 first date time
   */
  onUpdateState = (time1, time2) => {
    const { publishState, attributes: { firstField, secondField } } = this.props
    const newState = {
      error: TwoTemporalCriteriaContainer.isInError(time1, time2, firstField, secondField),
      time1,
      time2,
    }
    publishState(newState, TwoTemporalCriteriaContainer.convertToQuery(newState, firstField, secondField))
  }

  /**
   * Callback: user selected a new min value for range
   * @param {Date} date selected date for value 1 (or undefined / null)
   */
  onDate1Changed = (date) => {
    const { state: { time2 } } = this.props
    this.onUpdateState(date ? date.getTime() : null, time2)
  }

  /**
   * Callback: user selected a new max value for range
   * @param {Date} date selected date for value 2 (or undefined / null)
   */
  onDate2Changed = (date) => {
    const { state: { time1 } } = this.props
    this.onUpdateState(time1, date ? date.getTime() : null)
  }

  render() {
    const {
      pluginInstanceId, label,
      state: { error, time1, time2 },
      attributes: { firstField, secondField },
    } = this.props
    return (
      <TwoTemporalCriteriaComponent
        pluginInstanceId={pluginInstanceId}
        label={label}
        attribute1={firstField}
        attribute2={secondField}
        // provide values as date to components below
        error={error}
        value1={time1 && new Date(time1)}
        value2={time2 && new Date(time2)}
        onDate1Changed={this.onDate1Changed}
        onDate2Changed={this.onDate2Changed}
      />
    )
  }
}

export default TwoTemporalCriteriaContainer
