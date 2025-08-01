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
import startsWith from 'lodash/startsWith'
import includes from 'lodash/includes'
import { UIShapes } from '@regardsoss/shape'
import { CatalogDomain } from '@regardsoss/domain'
import FullTextCriterionComponent from '../components/FullTextCriterionComponent'

export class FullTextCriterionContainer extends React.Component {
  /**
   * Specifying the default state expected by this component (see propTypes for types)
   */
  static DEFAULT_STATE = {
    searchText: '',
  }

  static propTypes = {
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      searchText: PropTypes.string,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: FullTextCriterionContainer.DEFAULT_STATE,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * Escape some special characters and disable search when searchText
   * contains only special characters
   * @param {{searchText: string}} state
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText = '' }) {
    let trimedText = searchText.trim()
    if (!trimedText) return { q: null }
    // We need at least one letter or one digit in searchText
    if (!(/\d/.test(searchText)) && !(/[a-zA-Z]/.test(searchText))) return { q: null }
    // startsWith used that way enable to control that if user only type one special character, search will be disabled.
    // Search will not be disabled if searchText contains more than one special caracter, for exemple :
    // "(a" is allowed.
    // "(" is not allowed.
    // We set up theses restrictions because of backend.
    if (startsWith('(', trimedText)) return { q: null }
    if (startsWith(')', trimedText)) return { q: null }
    if (startsWith('[', trimedText)) return { q: null }
    if (startsWith(']', trimedText)) return { q: null }
    if (startsWith('^', trimedText)) return { q: null }
    if (startsWith(':', trimedText)) return { q: null }
    if (startsWith('~', trimedText)) return { q: null }
    if (startsWith('/', trimedText)) return { q: null }
    if (startsWith('+', trimedText)) return { q: null }
    if (startsWith('-', trimedText)) return { q: null }
    // '<' '>' '!' '\' characters are not allowed because they break backend.
    if (includes(trimedText, '<')) return { q: null }
    if (includes(trimedText, '>')) return { q: null }
    if (includes(trimedText, '!')) return { q: null }
    if (includes(trimedText, '\\')) return { q: null }
    trimedText = trimedText.replace(/\s\s+/g, ' ')
    // escape ( character
    trimedText = trimedText.replace(/[(]/g, '\\(')
    // escape ) character
    trimedText = trimedText.replace(/[)]/g, '\\)')
    // escape [ character
    trimedText = trimedText.replace(/[[]/g, '\\[')
    // escape ] character
    trimedText = trimedText.replace(/[\]]/g, '\\]')
    // escape ^ character
    trimedText = trimedText.replace(/[\^]/g, '\\^')
    // escape : character
    trimedText = trimedText.replace(/[:]/g, '\\:')
    // escape / character
    trimedText = trimedText.replace(/[/]/g, '\\/')
    // escape ! character
    trimedText = trimedText.replace(/[!]/g, '\\!')
    // escape + character
    trimedText = trimedText.replace(/[+]/g, '\\+')
    // escape - character
    trimedText = trimedText.replace(/[-]/g, '\\-')
    // escape ~ character
    trimedText = trimedText.replace(/[~]/g, '\\~')
    return { q: CatalogDomain.OpenSearchQueryParameter.toFullText(trimedText.split(' ')) }
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
    const { label, state: { searchText } } = this.props
    return (
      <FullTextCriterionComponent label={label} searchText={searchText} onTextInput={this.onTextInput} />
    )
  }
}

export default FullTextCriterionContainer
