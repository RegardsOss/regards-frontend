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
import DataWithPictureOnlyComponent from '../components/LastVersionOnlyComponent'

/**
 * Main criterion container
 *
 * @author Raphaël Mechali
 */
export class LastVersionOnlyContainer extends React.Component {
  /**
   * Specifying the default state expected by this component (see propTypes for types)
   */
  static DEFAULT_STATE = {
    checked: false,
  }

  static propTypes = {
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      checked: PropTypes.boolean,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: LastVersionOnlyContainer.DEFAULT_STATE,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string, searchMode: string}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ checked }) {
    return checked ? {
      [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: new CatalogDomain.OpenSearchQueryParameter(
        CatalogDomain.OpenSearchQuery.SAPN.last, true).toQueryString(),
    } : {}
  }

  onToggled = () => {
    const { state, publishState } = this.props
    const nextState = { checked: !state.checked }
    publishState(nextState, LastVersionOnlyContainer.convertToRequestParameters(nextState))
  }

  render() {
    const { label, state: { checked } } = this.props
    return (
      <DataWithPictureOnlyComponent
        label={label}
        checked={checked}
        onToggled={this.onToggled}
      />)
  }
}

export default LastVersionOnlyContainer
