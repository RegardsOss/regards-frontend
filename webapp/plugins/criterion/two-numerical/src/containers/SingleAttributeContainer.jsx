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
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds, numberRangeHelper } from '@regardsoss/plugins-api'
import SingleAttributeComponent from '../components/SingleAttributeComponent'

/**
 * Main container for criterion when working on a single attribute: value from value1 to value2
 *
 * @author Xavier-Alexandre Brochard
 */
export class SingleAttributeContainer extends React.Component {
  /** Default component state */
  static DEFAULT_STATE = {
    value1: undefined, // first range value
    value2: undefined, // second range value
  }

  /** Shape for this subtype of criterion */
  static STATE_SHAPE = PropTypes.shape({
    value1: PropTypes.number,
    value2: PropTypes.number,
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
   * @param {{value1: number, value2: number}} plugin state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ value1, value2 }, attribute) {
    // Using common toolbox to build range query
    return {
      q: numberRangeHelper.getNumberQueryParameter(attribute.jsonPath, new numberRangeHelper.NumberRange(value1, value2)).toQueryString(),
    }
  }


  /**
   * Callback: user changed value 1
   * @param {number} value as parsed by NumericalCriteriaComponent
   */
  onChangeValue1 = (value1) => {
    const { state, publishState, searchField } = this.props
    const newState = { ...state, value1 }
    publishState(newState, SingleAttributeContainer.convertToRequestParameters(newState, searchField))
  }

  /**
   * Callback: user changed value 2
   * @param {number} value as parsed by NumericalCriteriaComponent
   */
  onChangeValue2 = (value2) => {
    const { state, publishState, searchField } = this.props
    const newState = { ...state, value2 }
    publishState(newState, SingleAttributeContainer.convertToRequestParameters(newState, searchField))
  }

  render() {
    const { label, state: { value1, value2 }, searchField } = this.props
    return (
      <SingleAttributeComponent
        label={label}
        searchAttribute={searchField}
        value1={value1}
        value2={value2}
        onChangeValue1={this.onChangeValue1}
        onChangeValue2={this.onChangeValue2}
      />
    )
  }
}

export default SingleAttributeContainer
