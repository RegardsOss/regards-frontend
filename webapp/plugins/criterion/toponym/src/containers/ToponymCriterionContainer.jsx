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
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import { AccessProjectClient } from '@regardsoss/client'
import { CatalogDomain } from '@regardsoss/domain'
import { CatalogShapes, UIShapes, AccessShapes } from '@regardsoss/shape'
import { BasicListSelectors, RequestVerbEnum } from '@regardsoss/store-utils'
import { isToponymFound, getSelectedToponymBusinessId } from '@regardsoss/toponym-common'
import { StabilityDelayer } from '@regardsoss/display-control'
import { connect } from '@regardsoss/redux'
import ToponymCriterionComponent from '../components/ToponymCriterionComponent'
import withClient from './withClient'

/**
 * Root container for toponym criteria: it fetches parameter possible values, ensures the value selection is
 * dispatched and stores current auto-completion state
 * @author Theo Lasserre
 */
export class ToponymCriterionContainer extends React.Component {
  /** Default state expected by this component */
  static DEFAULT_STATE = {
    error: false,
    toponymFilterText: '',
    selectedToponymBusinessId: '',
    currentLocale: '',
    criteria: '', // used to specify which criteria (outside searchCriteria) to update in redux store
  }

  static CRITERIA_NAME = 'toponymCriteria'

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { searchToponymClient }) {
    const { selectors } = searchToponymClient
    return {
      // we select here the current or last fetching state of dispatchGetToponyms request
      isFetching: selectors.isFetching(state),
      // we select here the results from last dispatchGetParameterValues request
      toponyms: selectors.getList(state),
      // locale of ui in order to print specific toponym label
      currentLocale: state.common.i18n.locale,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { searchToponymClient }) {
    return {
      // dispatches a request to get property values.
      dispatchGetToponyms: (partialLabel = '', locale = '') => dispatch(searchToponymClient.actions.fetchEntityList({}, { partialLabel, locale })),
    }
  }

  static propTypes = {
    /** Current plugin search context */
    // eslint-disable-next-line react/no-unused-prop-types
    searchContext: CatalogShapes.SearchContext.isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // Connected client to search toponyms
    searchToponymClient: PropTypes.shape({
      actions: PropTypes.instanceOf(AccessProjectClient.SearchToponymActions),
      selectors: PropTypes.instanceOf(BasicListSelectors),
    }).isRequired,
    // Connected client to upload toponym
    uploadToponymClient: PropTypes.shape({
      actions: PropTypes.instanceOf(AccessProjectClient.UploadToponymActions),
    }).isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      error: PropTypes.bool.isRequired,
      toponymFilterText: PropTypes.string.isRequired,
      selectedToponymBusinessId: PropTypes.string.isRequired,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
    // from map state to props
    isFetching: PropTypes.bool.isRequired,
    toponyms: AccessShapes.SearchToponymList,
    currentLocale: PropTypes.string.isRequired,
    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchGetToponyms: PropTypes.func.isRequired, // used only in onPropertiesUpdated
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: ToponymCriterionContainer.DEFAULT_STATE,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{toponymFilterText: string}} state
   * @param {*} error
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ selectedToponymBusinessId = '', error }) {
    return error || !selectedToponymBusinessId ? {} : {
      [CatalogDomain.CatalogSearchQueryHelper.TOPONYM_PARAMETER_NAME]: selectedToponymBusinessId,
    }
  }

  /** Instance stability delayer, used to avoid fetching before user stopped typing for a given delay */
  stabilityDelayer = new StabilityDelayer()

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update current options on context change and selected option on list change
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      currentLocale, state,
      searchContext, dispatchGetToponyms,
    } = newProps
    if (!isEqual(oldProps.searchContext, searchContext)) {
      // Update immediately available options on context change
      dispatchGetToponyms(state.toponymFilterText, currentLocale)
    } else if (!isEqual(get(oldProps, 'state.toponymFilterText', ToponymCriterionContainer.DEFAULT_STATE.toponymFilterText), state.toponymFilterText)) {
      // when search text changes (user is typing text), update options after an inactivity time ellapsed
      this.stabilityDelayer.onEvent(() => dispatchGetToponyms(state.toponymFilterText, currentLocale))
    }
  }

  /**
   * Inner callback: updates state on user input
   * @param {string} searchText search text
   */
  onTextInput = (searchText = '', isSelected = false) => {
    const {
      state, publishState, toponyms, currentLocale,
    } = this.props
    const error = !!searchText && !isToponymFound(toponyms, currentLocale, searchText)
    const selectedToponymBusinessId = isSelected
      ? getSelectedToponymBusinessId(toponyms, currentLocale, searchText)
      : ToponymCriterionContainer.DEFAULT_STATE.selectedToponymBusinessId
    const nextState = {
      error,
      currentLocale,
      toponymFilterText: searchText,
      selectedToponymBusinessId,
      criteria: ToponymCriterionContainer.CRITERIA_NAME,
    }

    if ((!isEqual(nextState, state)
      // Ensure the text is different and its a real event, otherwise when the field is cleared the selectedToponymBusinessId is always cleared
      && searchText !== state.toponymFilterText) || isSelected) {
      // update redux state and query
      publishState(nextState, ToponymCriterionContainer.convertToRequestParameters(nextState))
    }
  }

  /**
   * User updated the text field value
   * @param {string} value text field value
   */
  onUpdateTextFilter = (searchText = '') => this.onTextInput(searchText)

  /**
   * Callback: the user selected a value
   * @param {string} test selected parameter value or validated text field value
   */
  onFilterSelected = (text) => this.onTextInput(text, true)

  onToponymUploaded = (selectedToponymBusinessId) => {
    const {
      state: { error },
      currentLocale, publishState,
    } = this.props
    const nextState = {
      error,
      currentLocale,
      toponymFilterText: ToponymCriterionContainer.DEFAULT_STATE.toponymFilterText,
      selectedToponymBusinessId,
      criteria: ToponymCriterionContainer.CRITERIA_NAME,
    }
    publishState(nextState, ToponymCriterionContainer.convertToRequestParameters(nextState))
  }

  /**
   * Remove the previous toponym uploaded
   */
  onRemoveToponym = () => {
    const {
      state: { error, toponymFilterText },
      currentLocale, publishState,
    } = this.props
    const nextState = {
      error,
      currentLocale,
      toponymFilterText,
      selectedToponymBusinessId: ToponymCriterionContainer.DEFAULT_STATE.selectedToponymBusinessId,
      criteria: ToponymCriterionContainer.CRITERIA_NAME,
    }
    publishState(nextState, ToponymCriterionContainer.convertToRequestParameters(nextState))
  }

  render() {
    const {
      label, state: { error, toponymFilterText, selectedToponymBusinessId },
      isFetching, toponyms, currentLocale, uploadToponymClient: { actions },
    } = this.props
    return (
      <ToponymCriterionComponent
        toponymFilterText={toponymFilterText}
        selectedToponymBusinessId={selectedToponymBusinessId}
        matchingToponyms={toponyms}
        error={error}
        isFetching={isFetching}
        onUpdateToponymsFilter={this.onUpdateTextFilter}
        onToponymFilterSelected={this.onFilterSelected}
        label={label}
        currentLocale={currentLocale}
        onToponymUploaded={this.onToponymUploaded}
        uploadToponymDependency={actions.getDependency(RequestVerbEnum.POST)}
        onRemoveToponym={this.onRemoveToponym}
      />
    )
  }
}
// Connect clients and retrieve them as props
export default withClient(
  // REDUX connected container
  connect(ToponymCriterionContainer.mapStateToProps,
    ToponymCriterionContainer.mapDispatchToProps)(ToponymCriterionContainer),
)
