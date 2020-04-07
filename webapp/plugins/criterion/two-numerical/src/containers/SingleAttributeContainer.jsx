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
import isEqual from 'lodash/isEqual'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds, NumberRange } from '@regardsoss/plugins-api'
import { NumberHelper } from './NumberHelper'
import SingleAttributeComponent from '../components/SingleAttributeComponent'

/**
 * Main container for criterion when working on a single attribute (expresses contraint on attribute as a [min; max] range)
 *
 * @author Xavier-Alexandre Brochard
 */
export class SingleAttributeContainer extends React.Component {
  /** Default component state */
  static DEFAULT_STATE = {
    error: false,
    min: '',
    max: '',
  }

  /** Shape for this subtype of criterion */
  static STATE_SHAPE = PropTypes.shape({
    error: PropTypes.bool.isRequired,
    min: PropTypes.string,
    max: PropTypes.string,
  })

  static propTypes = {
    /** Configured field attribute */
    searchField: AttributeModelWithBounds.isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: SingleAttributeContainer.STATE_SHAPE.isRequired,
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{min: number, max: number}} plugin state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ error, min, max }, attribute) {
    // No query when there is an error or no bound is entered (infinite range constraint)
    return error || (!min && !max) ? {} : {
      // query as range expressed by the user (no parse error possible, tested above)
      q: NumberRange.getNumberQueryParameter(attribute.jsonPath,
        new NumberRange(NumberHelper.parse(min).value, NumberHelper.parse(max).value)).toQueryString(),
    }
  }

  /**
   * Computes if the constraints as entered by user contains an error.
   * There is an error when:
   * - at least one value is entered AND
   * - at least one is invalid OR expressed range is invalid OR expressed range does not cross attribute bounds
   * @param {*} attribute attribute
   * @param {*} min entered min
   * @param {*} max ented value 2
   */
  static hasError(attribute, min, max) {
    if (!min && !max) {
      return false
    }
    const { error: minError, value: minValue } = NumberHelper.parse(min)
    const { error: maxError, value: maxValue } = NumberHelper.parse(max)
    // error when any bound parsing failed
    return minError || maxError || !NumberRange.isValidRestrictionOn(attribute, new NumberRange(minValue, maxValue))
  }

  /**
   * Inner callback: publishes a new bound value
   * @param {numer} min lower bound text
   * @param {numer} max upper bound text
   */
  onChange = (min, max) => {
    const { state, publishState, searchField } = this.props
    const nextState = {
      min,
      max,
      error: SingleAttributeContainer.hasError(searchField, min, max),
    }
    if (!isEqual(state, nextState)) {
      publishState(nextState, SingleAttributeContainer.convertToRequestParameters(nextState, searchField))
    }
  }

  /**
   * Callback: user changed value 1
   * @param {string} minText user entered min text
   */
  onMinChanged = (minText) => {
    const { state: { max } } = this.props
    this.onChange(minText, max)
  }

  /**
   * Callback: user changed value 2
   * @param {string} maxText user entered max text
   */
  onMaxChanged = (maxText) => {
    const { state: { min } } = this.props
    this.onChange(min, maxText)
  }

  render() {
    const { label, state: { error, min, max }, searchField } = this.props
    return (
      <SingleAttributeComponent
        label={label}
        searchAttribute={searchField}
        error={error}
        min={min}
        max={max}
        onMinChanged={this.onMinChanged}
        onMaxChanged={this.onMaxChanged}
      />
    )
  }
}

export default SingleAttributeContainer
