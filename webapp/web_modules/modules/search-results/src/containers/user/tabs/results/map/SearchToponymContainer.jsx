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
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { isToponymFound, getSelectedToponymBusinessId } from '@regardsoss/toponym-common'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
import { searchToponymActions, searchToponymSelectors } from '../../../../../clients/SearchToponymClient'
import SearchToponymComponent from '../../../../../components/user/tabs/results/map/SearchToponymComponent'

// throttle delay for toponym list request
const THROTTLE_DELAY_MS = 600

/**
 * Search form container for map
 * @author Théo Lasserre
 */
export class SearchToponymContainer extends React.Component {
  /** Default state expected by this component */
  static DEFAULT_STATE = {
    isInError: false,
    toponymFilterText: '',
    selectedToponymBusinessId: '',
    currentLocale: '',
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isFetching: searchToponymSelectors.isFetching(state),
      toponyms: searchToponymSelectors.getList(state),
      currentLocale: state.common.i18n.locale,
    }
  }

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapDispatchToProps(dispatch) {
    return {
      // Note: we throttle here the emitted network requests to avoid dispatching for each key entered
      dispatchGetToponyms:
        throttle(
          (partialLabel = '', locale = '') => dispatch(searchToponymActions.fetchEntityList({}, { partialLabel, locale })),
          THROTTLE_DELAY_MS, { loading: false }),
    }
  }

  static propTypes = {
    // callback: user selected a toponym
    onToponymSelected: PropTypes.func.isRequired,
    // from mapStateToProps
    isFetching: PropTypes.bool.isRequired,
    toponyms: AccessShapes.SearchToponymList,
    currentLocale: PropTypes.string.isRequired,
    // from mapDispatchToProps
    dispatchGetToponyms: PropTypes.func.isRequired,
  }

  /** Component default state (controls the auto complete filter state) */
  state = {
    toponymFilterText: '',
    isInError: false,
    selectedToponymBusinessId: null,
    currentLocale: '',
  }

  /**
   * Inner callback: updates state on user input
   * @param {string} searchText search text
   */
  onTextInput = (searchText = '', isSelected = false) => {
    const {
      toponyms, currentLocale, dispatchGetToponyms, onToponymSelected,
    } = this.props
    const isInError = !!searchText && !isToponymFound(toponyms, currentLocale, searchText)
    let { selectedToponymBusinessId } = SearchToponymContainer.DEFAULT_STATE
    if (isSelected) {
      selectedToponymBusinessId = getSelectedToponymBusinessId(toponyms, currentLocale, searchText)
      onToponymSelected(selectedToponymBusinessId)
    }
    const nextState = {
      isInError,
      currentLocale,
      toponymFilterText: searchText,
      selectedToponymBusinessId,
    }

    if (!isEqual(nextState, this.state)) {
      dispatchGetToponyms(nextState.toponymFilterText, nextState.currentLocale)
      this.setState(nextState)
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

  render() {
    const { isFetching, toponyms, currentLocale } = this.props
    const { toponymFilterText, isInError } = this.state
    return (
      <SearchToponymComponent
        toponymFilterText={toponymFilterText}
        matchingToponyms={toponyms}
        isInError={isInError}
        isFetching={isFetching}
        onUpdateToponymsFilter={this.onUpdateTextFilter}
        onToponymFilterSelected={this.onFilterSelected}
        currentLocale={currentLocale}
      />
    )
  }
}
export default connect(
  SearchToponymContainer.mapStateToProps,
  SearchToponymContainer.mapDispatchToProps)(SearchToponymContainer)
