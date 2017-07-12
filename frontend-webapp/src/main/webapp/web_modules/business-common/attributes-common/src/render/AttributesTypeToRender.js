/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import StringAttributesRender from './StringAttributesRender'
import IntegerAttributesRender from './IntegerAttributesRender'
import RangeAttributesRender from './RangeAttributesRender'
import DateAttributesRender from './DateAttributesRender'
import DateRangeAttributesRender from './DateRangeAttributesRender'
import DateArrayAttributesRender from './DateArrayAttributesRender'
import UrlAttributesRender from './UrlAttributesRender'
import BooleanAttributesRender from './BooleanAttributesRender'
import ThumbnailAttributesRender from './ThumbnailAttributesRender'
import RawDataAttributesRender from './RawDataAttributesRender'

/**
 * Enum to associate attribute types to sRender renderer component.
 * @author Sébastien Binda
 */
const typeToRenderMap = {
  // Default render
  DEFAULT: StringAttributesRender,
  // Render by type
  BOOLEAN: BooleanAttributesRender,
  DATE_ISO8601: DateAttributesRender,
  DATE_INTERVAL: DateRangeAttributesRender,
  DATE_ARRAY: DateArrayAttributesRender,
  DOUBLE_INTERVAL: RangeAttributesRender,
  INTEGER: IntegerAttributesRender,
  INTEGER_INTERVAL: RangeAttributesRender,
  LONG_INTERVAL: RangeAttributesRender,
  STRING: StringAttributesRender,
  THUMBNAIL: ThumbnailAttributesRender,
  URL: UrlAttributesRender,
  DOWNLOAD_LINK: RawDataAttributesRender,
}

/**
 * Returns render for type as parameter
 * @param
 * @return render component for attribute
 */
function getTypeRender(type = 'DEFAULT') {
  return typeToRenderMap[type] || typeToRenderMap.DEFAULT
}
export default getTypeRender
