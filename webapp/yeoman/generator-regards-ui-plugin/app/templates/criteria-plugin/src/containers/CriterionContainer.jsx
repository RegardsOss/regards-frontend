/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogShapes, UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds } from '@regardsoss/plugins-api'
import CriterionComponent from '../components/CriterionComponent'

/**
 * Main <%= name %> plugin container
 *
 * This example is a simple String research criterion.
 * When developing a plugin, developer should:
 * 1. Decide the number of attributes the plugin uses to build query
 * 2. Design user interactions and corresponding state / queries updates
 * 3. Implement corresponding plugin state (DEFAULT_STATE, props.state)
 * 4. Implement CriterionContainer#convertToRequestParameters (optionnal, helps readability)
 * 5. Implement view, callbacks and interactions
 * Please refer to plugins documentation for more details about graphics, using redux in plugins,
 * properties...
 *
 * @author <%= author %>
 */
export class CriterionContainer extends React.Component {
  /** Default state expected by this component */
  static DEFAULT_STATE = {
    searchText: '',
  }

  static propTypes = {
    /** Plugin identifier */
    pluginInstanceId: PropTypes.string.isRequired, // TODO use or delete
    /** Current plugin search context */
    searchContext: CatalogShapes.SearchContext.isRequired, // TODO use or delete
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    /** Configuration attributes, by attributes logical name, from plugin-info.json */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired, // TODO match with plugin-info.json, use or delete
    }),
    // From mapStateToProps...
    state: PropTypes.shape({
      searchText: PropTypes.string, // TODO match with designed state
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  static defaultProps = {
    /** Ensures an initial state not null / undefined */
    state: CriterionContainer.DEFAULT_STATE,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ searchText }, attribute) {
    // TODO update here, example below requests an attribute (STRING type) to be equal to search text
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
    const { state: { searchText }, label, attributes: { searchField } } = this.props
    return (
      <CriterionComponent
        label={label}
        searchAttribute={searchField}
        searchText={searchText}
        onTextInput={this.onTextInput}
      />
    )
  }
}

export default CriterionContainer
