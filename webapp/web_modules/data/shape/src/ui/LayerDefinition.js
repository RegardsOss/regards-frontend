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
import { UIDomain } from '@regardsoss/domain'

/**
 * A layer definition, as used by UI
 * @author Théo Lasserre
 */

export const LayerDefinition = PropTypes.shape({
  layerName: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  background: PropTypes.bool.isRequired,
  layerViewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(UIDomain.MIZAR_LAYER_TYPES, UIDomain.CESIUM_LAYER_TYPES).isRequired,
  conf: PropTypes.string,
  layersName: PropTypes.string,
})
