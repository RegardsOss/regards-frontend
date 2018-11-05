/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import size from 'lodash/size'
import { StorageShapes } from '@regardsoss/shape'
import { DateValueRender } from '@regardsoss/components'
/**
 *
 * @author Léo Mieulet
*/
class AIPListDateColumnRenderer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    entity: StorageShapes.AIP,
  }

  static defaultProps = {}

  render() {
    const { entity: { content: { properties: { pdi: { provenanceInformation: { history } } } } } } = this.props
    const nbAIPEvents = size(history)

    return (
      <DateValueRender
        value={history[nbAIPEvents - 1].date}
      />
    )
  }
}
export default AIPListDateColumnRenderer
