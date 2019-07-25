/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import {
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors,
} from '@regardsoss/plugins-api'
import StringCriterionComponent from '../components/StringCriterionComponent'

/**
 * Main criterion container: it handles state for a simple text search box with 'full words research' checkbox.
 *
 * @author Sébastien Binda
 * @author Xavier-Alexandre Brochard
 */
export class StringCriterionContainer extends React.Component {
  /** Attribute model types for which full word option is available */
  static FULL_WORD_AVAILABLE_TYPES = [DamDomain.MODEL_ATTR_TYPES.STRING]

  /**
   * Specifying the default state expected by this component (see propTypes for types)
   */
  static DEFAULT_STATE = {
    searchText: '',
    searchFullWords: false,
  }


  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    return {
      // current state from redux store, defaults to a static JS objects (avoids constant re-render issues)
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || StringCriterionContainer.DEFAULT_STATE,
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
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // From mapStateToProps...
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      searchText: PropTypes.string,
      searchFullWords: PropTypes.bool,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string, searchFullWords: bool}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText, searchFullWords }, attribute) {
    let q = null
    const trimedText = (searchText || '').trim()
    if (trimedText && attribute.jsonPath) {
      let parameterValue = null
      if (searchFullWords) {
        // searching for attributes values strictly equal to text
        parameterValue = `"${trimedText}"`
      } else {
        // searching for all parts of text (separated by a blank char) to be included in attributes values
        const values = trimedText.split(' ') || []
        // clear empty values (2 blank chars for instance)
        const meaningfulValues = values.filter(value => !!value)
        // join values as Open search parameters
        parameterValue = `(${meaningfulValues.map(value => `*${value}*`).join(' AND ')})`
      }
      q = `${attribute.jsonPath}:${parameterValue}`
    } // else: no query
    return { q }
  }

  /**
   * User callback: full word option was checked / unchecked
   */
  onCheckFullWord = () => {
    const { state, attributes: { searchField }, publishState } = this.props
    const nextState = {
      ...state,
      searchFullWords: !state.searchFullWords, // check / uncheck
    }
    // update criterion state and query
    publishState(nextState, StringCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  /**
   * User callback: user set an input
   */
  onTextInput = (event, value) => {
    const { state, attributes: { searchField }, publishState } = this.props
    const nextState = {
      ...state,
      searchText: value,
    }
    // update criterion state and query
    publishState(nextState, StringCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  render() {
    const { state: { searchText, searchFullWords }, attributes: { searchField } } = this.props
    return (
      <StringCriterionComponent
        searchAttribute={searchField}
        searchText={searchText}
        searchFullWords={searchFullWords}
        onTextInput={this.onTextInput}
        onCheckFullWord={this.onCheckFullWord}
        allowFullword={StringCriterionContainer.FULL_WORD_AVAILABLE_TYPES.includes(searchField.type)}
      />)
  }
}

export default connect(
  StringCriterionContainer.mapStateToProps,
  StringCriterionContainer.mapDispatchToProps)(StringCriterionContainer)
