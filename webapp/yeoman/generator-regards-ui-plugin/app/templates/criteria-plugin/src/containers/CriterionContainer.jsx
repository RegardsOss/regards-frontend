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
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors,
} from '@regardsoss/plugins-api'
import CriterionComponent from '../components/CriterionComponent'
/**
  * TODO: this example is a simple String research criterion.
  * When developing a plugin, developer should:
  * - Design its plugin state, ie the data plugin needs to build open search query.
  * - Apply plugin state to:
  *   - DEFAULT_STATE (fallback when criterion state is not initialized yet)
  *   - propTypes.state
  *   - convertToQuery (optional, that method may also be implemented other ways)
  *   - CriterionComponent properties
  * - Design user interactions and corresponding state updates (using callbacks and publishState method)
  * - Design display component to show current plugin state to user
  */

/**
 * Main <%= name %> plugin container
 * @author <%= author %>
 */
export class CriterionContainer extends React.Component {
  /** Default state expected by this component */
  static DEFAULT_STATE = {
    searchText: '',
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
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || CriterionContainer.DEFAULT_STATE,
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
    /** Configuration attributes, by attributes logical name, from plugin-info.json */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // From mapStateToProps...
    state: PropTypes.shape({
      // specifying here the state this criterion shares with parent search form
      searchText: PropTypes.string,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText }, attribute) {
    let q = null
    const trimedText = (searchText || '').trim()
    if (trimedText && attribute.jsonPath) {
      q = `${attribute.jsonPath}:"${trimedText}"` // query: attribute strictly equals text in this template
    }
    // OpenSearch parameters: only q for this template
    return { q }
  }

  /**
   * User callback: user set an input
   */
  onTextInput = (event, value) => {
    const { attributes: { searchField }, publishState } = this.props
    const nextState = {
      searchText: value,
    }
    // update criterion state and query
    publishState(nextState, CriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  render() {
    const { state: { searchText }, attributes: { searchField } } = this.props
    return (
      <CriterionComponent
        searchAttribute={searchField}
        searchText={searchText}
        onTextInput={this.onTextInput}
      />
    )
  }
}

export default connect(
  CriterionContainer.mapStateToProps,
  CriterionContainer.mapDispatchToProps)(CriterionContainer)
