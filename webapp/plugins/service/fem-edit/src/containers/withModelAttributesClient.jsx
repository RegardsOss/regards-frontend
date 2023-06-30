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
import { getModelAttributesClient } from '../clients/ModelAttributesClient'

/**
 * This component wires clients required by this plugin,
 * Indeed, plugin clients needs the pluginInstanceId to be ready to use,
 * On UI Plugin we're connected to client asynchronously
 * whereas we do it synchroniously in REGARDS
 * @param React component
 * @returns React class that injects clients
 * @author Léo Mieulet
 */
export default (Component) => class WithClient extends React.Component {
  static propTypes = {
    pluginInstanceId: PropTypes.string.isRequired,
  }

  render() {
    const { pluginInstanceId } = this.props
    const modelAttributesClient = getModelAttributesClient(pluginInstanceId)
    return (
      <Component {...this.props} modelAttributesClient={modelAttributesClient} />
    )
  }
}
