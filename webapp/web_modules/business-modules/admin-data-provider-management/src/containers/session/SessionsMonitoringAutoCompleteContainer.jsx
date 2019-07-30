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
import { BasicArrayActions, BasicArraySelectors } from '@regardsoss/store-utils'
import SessionsMonitoringAutoCompleteComponent from '../../components/session/SessionsMonitoringAutoCompleteComponent'

/**
 * Session Filter Autocomplete
 * @author Kévin Picart
 */
export class SessionsMonitoringAutoCompleteContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { arraySelectors }) {
    return {
      isFetching: arraySelectors.isFetching(state),
      hintsArray: arraySelectors.getArray(state),
      noData: !arraySelectors.getArray(state).length,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { arrayActions }) {
    return {
      getSearchHints: text => dispatch(arrayActions.fetchEntityList(null, { searchText: text })),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    arrayActions: PropTypes.instanceOf(BasicArrayActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    arraySelectors: PropTypes.instanceOf(BasicArraySelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // eslint-disable-next-line react/no-unused-prop-types
    text: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    hintText: PropTypes.string.isRequired,
    // From mapStateToProps
    isFetching: PropTypes.bool.isRequired,
    hintsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    noData: PropTypes.bool.isRequired,
    // From mapDispatchToProps
    getSearchHints: PropTypes.func.isRequired,
  }


  /**
   * User updated the text field
   * @param {string} searchText text field value
   */
  onUpdateInput = (searchText = '') => {
    const { onChangeText, getSearchHints } = this.props
    onChangeText(searchText)
    getSearchHints(searchText)
  }

  /**
   * Callback: the user selected a value or typed in some text (validated with return key)
   * @param {string} test selected parameter value or validated text field value
   * @param {string} isInList did user select a strict value in list? (or did he type some unknown value)
   */
  onFilterSelected = (text, isInList) => {
    const { onChangeText } = this.props
    onChangeText(text)
  }

  render() {
    const {
      text, hintText, isFetching, noData, hintsArray,
    } = this.props

    return (
      <SessionsMonitoringAutoCompleteComponent
        hintText={hintText}
        text={text}
        currentHints={hintsArray}
        onUpdateInput={this.onUpdateInput}
        onFilterSelected={this.onFilterSelected}
        isFetching={isFetching}
        noData={noData}
        hintsArray={hintsArray}
      />
    )
  }
}
export default connect(
  SessionsMonitoringAutoCompleteContainer.mapStateToProps,
  SessionsMonitoringAutoCompleteContainer.mapDispatchToProps)(SessionsMonitoringAutoCompleteContainer)
