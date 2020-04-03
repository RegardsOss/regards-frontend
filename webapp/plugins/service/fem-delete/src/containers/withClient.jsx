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
import getRequestsClient from '../clients/RequestsClient'

/**
 * This component wires clients required by this plugin,
 * Indeed, plugin clients needs the pluginInstanceId to be ready to use,
 * On UI Plugin we're connected to client asynchronously
 * whereas we do it synchroniously in REGARDS
 * @param React component
 * @returns React class that injects clients
 * @author Léo Mieulet
 */
const withClient = Component => class WithClient extends React.Component {
  render() {
    const { pluginInstanceId } = this.props
    const deleteClient = getRequestsClient(pluginInstanceId)
    return (
      <Component {...this.props} deleteClient={deleteClient} />
    )
  }
}

export default withClient
