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
import throttle from 'lodash/throttle'
import { connect } from '@regardsoss/redux'
import { CatalogDomain } from '@regardsoss/domain'
import {
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors, PluginsClientsMap,
} from '@regardsoss/plugins-api'
import buildClient from '../clients/EnumeratedDOPropertyValuesClient'
import EnumeratedCriterionComponent from '../components/EnumeratedCriterionComponent'

/** Max number of values shown to user at same time */
const MAX_VALUES_COUNT = 100

/** Throttle delay for values list queries (avoids flooding the network) */
const THROTTLE_DELAY_MS = 300

/**
 * Root container for enumerated criteria: it fetches parameter possible values, ensures the value selection is
 * dispatched and stores current auto-completion state
 */
export class EnumeratedCriterionContainer extends React.Component {
  /**
   * This plugin default state when redux state is undefined
   */
  static DEFAULT_STATE = {
    searchText: '',
    inError: false,
  }

  /**
   * Stores clients map for each client and plugin instance ID, to avoid building new instances each
   * time mapStateToProps and mapDispatchToProps are called
   */
  static CLIENTS_MAP = new PluginsClientsMap()

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    // get selectors for this plugin instance ID
    const enumeratedValuesSelectors = EnumeratedCriterionContainer.CLIENTS_MAP.getClient(buildClient, pluginInstanceId).selectors
    return {
      // current state from redux store, defaults to a static JS objects (avoids constant re-render issues)
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || EnumeratedCriterionContainer.DEFAULT_STATE,
      // we select here the current or last fetching state of dispatchGetParameterValues request
      isFetching: enumeratedValuesSelectors.isFetching(state),
      // we select here the results from last dispatchGetParameterValues request
      availablePropertyValues: enumeratedValuesSelectors.getArray(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId, initialQuery }) {
    const enumeratedValuesActions = EnumeratedCriterionContainer.CLIENTS_MAP.getClient(buildClient, pluginInstanceId).actions
    return {
      publishState: (state, requestParameters) => dispatch(pluginStateActions.publishState(pluginInstanceId, state, requestParameters)),
      // dispatches a request to get property values
      dispatchGetPropertyValues:
        // Note: we throttle here the emitted network requests to avoid dispatching for each key user pressed
        throttle((name, filterText = '') => dispatch(enumeratedValuesActions.fetchValues(name, filterText, MAX_VALUES_COUNT, initialQuery)),
          THROTTLE_DELAY_MS, { leading: true }),
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
    /** Search form context query */
    // eslint-disable-next-line react/no-unused-prop-types
    initialQuery: PropTypes.string, // used in mapDispatchToProps
    // from map state to props
    isFetching: PropTypes.bool.isRequired,
    availablePropertyValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      searchText: PropTypes.string,
      searchFullWords: PropTypes.bool,
    }).isRequired,
    // from map dispatch to props
    publishState: PropTypes.func.isRequired,
    dispatchGetPropertyValues: PropTypes.func.isRequired,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText = '' }, attribute) {
    return {
      q: new CatalogDomain.OpenSearchQueryParameter(attribute.jsonPath,
        CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(searchText.trim())).toQueryString(),
    }
  }

  /**
   * User updated the text field
   * @param {string} value text field value
   */
  onUpdateTextFilter = (searchText = '') => {
    const {
      state, publishState, dispatchGetPropertyValues,
      attributes: { searchField },
    } = this.props
    const nextState = {
      ...state,
      searchText,
    }
    // A - update redux state and query
    publishState(nextState, EnumeratedCriterionContainer.convertToRequestParameters(nextState, searchField))
    // B - dipatch get values for that filter text
    dispatchGetPropertyValues(searchField.jsonPath, searchText)
  }

  /**
   * Callback: the user selected a value or typed in some text (validated with return key)
   * @param {string} test selected parameter value or validated text field value
   * @param {string} isInList did user select a strict value in list? (or did he type some unknown value)
   */
  onFilterSelected = (text, isInList) => {
    const {
      publishState,
      attributes: { searchField },
    } = this.props
    const nextState = { searchText: text, inError: !isInList }
    publishState(nextState, EnumeratedCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  /**
   * Method to display search criteria
   */
  render() {
    const {
      attributes: { searchField }, state: { searchText, inError }, isFetching, availablePropertyValues,
    } = this.props
    return (
      <EnumeratedCriterionComponent
        searchAttribute={searchField}
        text={searchText}
        availablePropertyValues={availablePropertyValues}
        inError={inError}
        isFetching={isFetching}
        onUpdateTextFilter={this.onUpdateTextFilter}
        onFilterSelected={this.onFilterSelected}
      />)
  }
}
export default connect(EnumeratedCriterionContainer.mapStateToProps,
  EnumeratedCriterionContainer.mapDispatchToProps)(EnumeratedCriterionContainer)
