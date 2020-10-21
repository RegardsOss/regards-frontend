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
import { CatalogDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds } from '@regardsoss/plugins-api'
import StringCriterionComponent from '../components/StringCriterionComponent'
import { SEARCH_MODES, SEARCH_MODES_ENUM } from '../domain/SearchMode'

/**
 * Main criterion container: it handles state for a simple text search box with 'full words research' checkbox.
 *
 * @author Sébastien Binda
 * @author Xavier-Alexandre Brochard
 */
export class StringCriterionContainer extends React.Component {
  /**
   * Specifying the default state expected by this component (see propTypes for types)
   */
  static DEFAULT_STATE = {
    searchText: '',
    searchMode: SEARCH_MODES_ENUM.CONTAINS,
  }

  static propTypes = {
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      searchText: PropTypes.string,
      searchMode: PropTypes.oneOf(SEARCH_MODES).isRequired,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: StringCriterionContainer.DEFAULT_STATE,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string, searchMode: string}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText, searchMode }, attribute) {
    const trimedText = (searchText || '').trim()
    let parameterValue = null
    if (trimedText && attribute.jsonPath) {
      switch (searchMode) {
        case SEARCH_MODES_ENUM.CONTAINS: {
          // Searching for elements containing each words (separated in input by blank characters)
          const values = trimedText.split(' ') || []
          parameterValue = CatalogDomain.OpenSearchQueryParameter.toStringContained(values, CatalogDomain.OpenSearchQueryParameter.AND_SEPARATOR)
          break
        }
        case SEARCH_MODES_ENUM.EQUALS:
          // searching for attributes values strictly equal to text
          parameterValue = CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(trimedText)
          break
        default:
          throw new Error('Unknown search mode', searchMode)
      }
    } // else: no query
    return {
      q: new CatalogDomain.OpenSearchQueryParameter(attribute.jsonPath, parameterValue).toQueryString(),
    }
  }

  /**
   * Inner callback: new mode selected. Updates state and query
   * @param {string} searchMode selected, from SEARCH_MODES_ENUM
   */
  onSelectMode = (searchMode) => {
    const { state, attributes: { searchField }, publishState } = this.props
    if (searchMode === state.searchMode) {
      return // avoid resetting state without change
    }
    const nextState = { ...state, searchMode }
    publishState(nextState, StringCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  /**
   * User callback: user set an input
   * @param {*} event
   * @param {string} searchText input text
   */
  onTextInput = (event, searchText) => {
    const { state, attributes: { searchField }, publishState } = this.props
    const nextState = { ...state, searchText }
    publishState(nextState, StringCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  render() {
    const { label, state: { searchText, searchMode }, attributes: { searchField } } = this.props
    return (
      <StringCriterionComponent
        label={label}
        searchAttribute={searchField}
        searchText={searchText}
        searchMode={searchMode}
        onSelectMode={this.onSelectMode}
        onTextInput={this.onTextInput}
      />)
  }
}

export default StringCriterionContainer
