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
import get from 'lodash/get'
import { StorageShapes } from '@regardsoss/shape'
import { DateValueRender } from '@regardsoss/components'
/**
 * Renders AIP update date
 * @author Léo Mieulet
 */
class AIPListUpdateDateColumnRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.AIPWithStorages.isRequired,
  }

  render() {
    const history = get(this.props.entity, 'content.aip.properties.pdi.provenanceInformation.history', [])
    const lastEventDate = history.length ? history[history.length - 1].date : null
    return (
      <DateValueRender value={lastEventDate} />
    )
  }
}
export default AIPListUpdateDateColumnRenderer
