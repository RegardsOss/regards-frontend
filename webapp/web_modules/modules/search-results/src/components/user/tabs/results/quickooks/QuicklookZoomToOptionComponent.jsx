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
import omit from 'lodash/omit'
import get from 'lodash/get'
import IconButton from 'material-ui/IconButton'
import MapSearchIcon from 'mdi-material-ui/MapSearch'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'

/**
 * Option to zoom to a feature, when embedded on map
 * @author Léo Mieulet
 */
class QuicklookZoomToOptionComponent extends React.Component {
  static propTypes = {
    onZoomToFeature: PropTypes.func,
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Properties that should not be reported to render child button */
  static NON_REPORTED_PROPS = ['entity', 'onZoomToFeature']

  onZoomToFeature = () => {
    const { onZoomToFeature, entity } = this.props
    onZoomToFeature({
      id: entity.content.id,
      label: entity.content.label,
    })
  }

  isGeometryExist = (entity) => !!get(entity, 'content.geometry', null)

  render() {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'zoom.to.product.tooltip' })}
        disabled={!this.isGeometryExist(entity)}
        onClick={this.onZoomToFeature}
        {...omit(this.props, QuicklookZoomToOptionComponent.NON_REPORTED_PROPS)}
      >
        <MapSearchIcon />
      </IconButton>
    )
  }
}
export default QuicklookZoomToOptionComponent
