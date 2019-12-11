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
import { connect } from '@regardsoss/redux'
import {
  pluginStateActions, pluginStateSelectors,
} from '@regardsoss/plugins-api'
import { CatalogDomain } from '@regardsoss/domain'
import FullTextCriterionComponent from '../components/FullTextCriterionComponent'


export class FullTextCriterionContainer extends React.Component {
  /**
   * Specifying the default state expected by this component (see propTypes for types)
   */
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
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || FullTextCriterionContainer.DEFAULT_STATE,
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
    // From mapStateToProps...
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      searchText: PropTypes.string,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string}} state
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText = '' }) {
    const trimedText = searchText.trim()
    return { q: trimedText ? CatalogDomain.OpenSearchQueryParameter.toStringContained(trimedText) : null }
  }

  /**
   * Callback: user input some text
   * @param {*} event -
   * @param {string} searchText user input text
   */
  onTextInput = (event, searchText = '') => {
    const { publishState } = this.props
    const nextState = { searchText }
    publishState(nextState, FullTextCriterionContainer.convertToRequestParameters(nextState))
  }

  render() {
    const { state: { searchText } } = this.props
    return (
      <FullTextCriterionComponent searchText={searchText} onTextInput={this.onTextInput} />
    )
  }
}

export default connect(
  FullTextCriterionContainer.mapStateToProps,
  FullTextCriterionContainer.mapDispatchToProps)(FullTextCriterionContainer)
