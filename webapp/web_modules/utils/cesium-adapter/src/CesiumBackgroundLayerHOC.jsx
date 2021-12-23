/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/

import { GeoJsonFeature } from '@regardsoss/mizar-adapter'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { buildRectangleFromGeometry } from './CesiumHelper'

/**
 * Handling Cesium background layer and its rectangle property, which restrict the size of the layer when there is a drawnArea
 * As it is bugger with around meridian, this HOC takes the complexity here
 *
 * @author Léo Mieulet
 */
const withCesiumBackgroundLayerHOC = (Component) => class CesiumRectangleMeridianComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    drawnAreas: PropTypes.arrayOf(GeoJsonFeature),
  }

  rectangle = null;

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      drawnAreas,
    } = newProps

    if (!isEqual(oldProps.drawnAreas, drawnAreas)) {
      this.rectangle = !isEmpty(drawnAreas) ? buildRectangleFromGeometry(drawnAreas[0].geometry) : null
    }
  }

  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  render() {
    // eslint-disable-next-line no-unused-vars
    const { drawnAreas, ...rest } = this.props
    return (
      <Component {...rest} rectangle={this.rectangle} />
    )
  }
}

export default withCesiumBackgroundLayerHOC
