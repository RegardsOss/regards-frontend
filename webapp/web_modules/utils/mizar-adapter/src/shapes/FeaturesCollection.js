/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogShapes } from '@regardsoss/shape'

/**
 * GEOJson features collection as expected by Mizar
 * Note: it is rewritten here only to make sure geometry is provided
 * @author Raphaël Mechali
 */

/** A feature with geometry */
export const GeoJsonFeature = PropTypes.shape({
  geometry: CatalogShapes.EntityGeoProperties.isRequired,
  bbox: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.string.isRequired,
})

/** A GeoJson features collection with mandatory geometry */
export const GeoJsonFeaturesCollection = PropTypes.shape({
  features: PropTypes.arrayOf(GeoJsonFeature).isRequired,
  type: PropTypes.oneOf(['FeatureCollection']).isRequired,
})
