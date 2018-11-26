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
import {
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors, numberRangeHelper,
} from '@regardsoss/plugins-api'
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

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    return {
      // current state from redux store
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || SingleAttributeContainer.DEFAULT_STATE,
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
      publishState: (state, query) => dispatch(pluginStateActions.publishState(pluginInstanceId, state, query)),
    }
  }

  static propTypes = {
    /** Plugin identifier */
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: PropTypes.string.isRequired, // used in mapStateToProps and mapDispatchToProps
    /** Configured field attribute */
    searchField: AttributeModelWithBounds.isRequired,
    // From mapStateToProps...
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      value1: PropTypes.number,
      value2: PropTypes.number,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts current state into query
   * @param {{value1: number, value2: number}} plugin state values
   * @param {*} attribute criterion attribute
   * @return {string} corresponding search query
   */
  static convertToQuery({ value1, value2 }, attribute) {
    return numberRangeHelper.getNumberAttributeQueryPart(attribute.jsonPath, new numberRangeHelper.NumberRange(value1, value2))
  }


  /**
   * Callback: user changed value 1
   * @param {number} value as parsed by NumericalCriteriaComponent
   */
  onChangeValue1 = (value1) => {
    const { state, publishState, searchField } = this.props
    const newState = { ...state, value1 }
    publishState(newState, SingleAttributeContainer.convertToQuery(newState, searchField))
  }

  /**
   * Callback: user changed value 2
   * @param {number} value as parsed by NumericalCriteriaComponent
   */
  onChangeValue2 = (value2) => {
    const { state, publishState, searchField } = this.props
    const newState = { ...state, value2 }
    publishState(newState, SingleAttributeContainer.convertToQuery(newState, searchField))
  }

  render() {
    const { state: { value1, value2 }, searchField } = this.props


    return (
      <SingleAttributeComponent
        searchAttribute={searchField}
        value1={value1}
        value2={value2}
        onChangeValue1={this.onChangeValue1}
        onChangeValue2={this.onChangeValue2}
      />
    )
  }
}

export default connect(
  SingleAttributeContainer.mapStateToProps,
  SingleAttributeContainer.mapDispatchToProps)(SingleAttributeContainer)
