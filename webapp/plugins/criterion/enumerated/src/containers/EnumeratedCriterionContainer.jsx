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
import get from 'lodash/get'
import { CatalogDomain } from '@regardsoss/domain'
import { UIShapes, CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { StabilityDelayer } from '@regardsoss/display-control'
import { AttributeModelWithBounds, PluginsClientsMap } from '@regardsoss/plugins-api'
import buildClient from '../clients/EnumeratedDOPropertyValuesClient'
import EnumeratedCriterionComponent from '../components/EnumeratedCriterionComponent'

/** Max number of values shown to user at same time */
const MAX_VALUES_COUNT = 100

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
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    const enumeratedValuesActions = EnumeratedCriterionContainer.CLIENTS_MAP.getClient(buildClient, pluginInstanceId).actions
    return {
      // dispatches a request to get property values.
      dispatchGetPropertyValues: (name, filterText = '', contextParameters) => dispatch(enumeratedValuesActions.fetchValues(name, filterText, MAX_VALUES_COUNT, contextParameters)),
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
    /** Search form context request parameters */
    // eslint-disable-next-line react/no-unused-prop-types
    contextParameters: CommonShapes.RequestParameters.isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      searchText: PropTypes.string,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
    // from map state to props
    isFetching: PropTypes.bool.isRequired,
    availablePropertyValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchGetPropertyValues: PropTypes.func.isRequired, // used only in onPropertiesUpdated
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: EnumeratedCriterionContainer.DEFAULT_STATE,
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

  /** Instance stability delayer, used to avoid fetching before user stopped typing for a given delay */
  stabilityDelayer = new StabilityDelayer()

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update current options on context change and selected option on list change
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      attributes: { searchField }, state,
      contextParameters, dispatchGetPropertyValues,
    } = newProps

    if (!isEqual(oldProps.contextParameters, contextParameters)) {
      // Update immediately option on context change and...
      dispatchGetPropertyValues(searchField.jsonPath, state.searchText, contextParameters)
    } else if (!isEqual(get(oldProps, 'state.searchText', EnumeratedCriterionContainer.DEFAULT_STATE.searchText), state.searchText)) {
      // when search text changes (user is type text), update options after an inactivity time ellapsed
      this.stabilityDelayer.onEvent(() => dispatchGetPropertyValues(searchField.jsonPath, state.searchText, contextParameters))
    }
  }


  /**
   * User updated the text field
   * @param {string} value text field value
   */
  onUpdateTextFilter = (searchText = '') => {
    const { state, publishState, attributes: { searchField } } = this.props
    const nextState = {
      ...state,
      searchText,
    }

    if (!isEqual(nextState, state)) {
      // update redux state and query
      publishState(nextState, EnumeratedCriterionContainer.convertToRequestParameters(nextState, searchField))
    }
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
    const nextState = { searchText: text }
    publishState(nextState, EnumeratedCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  /**
   * Method to display search criteria
   */
  render() {
    const {
      label, attributes: { searchField }, state: { searchText },
      isFetching, availablePropertyValues,
    } = this.props
    return (
      <EnumeratedCriterionComponent
        label={label}
        searchAttribute={searchField}
        text={searchText}
        availablePropertyValues={availablePropertyValues}
        // In error when there is some search but it is not strictly equal to one of the options
        inError={!!searchText && !availablePropertyValues.includes(searchText)}
        isFetching={isFetching}
        onUpdateTextFilter={this.onUpdateTextFilter}
        onFilterSelected={this.onFilterSelected}
      />)
  }
}
export default connect(EnumeratedCriterionContainer.mapStateToProps,
  EnumeratedCriterionContainer.mapDispatchToProps)(EnumeratedCriterionContainer)
