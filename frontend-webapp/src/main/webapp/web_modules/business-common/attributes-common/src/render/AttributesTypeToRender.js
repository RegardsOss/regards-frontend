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
import BooleanAttributeRender from './BooleanAttributeRender'
import DateArrayAttributeRender from './DateArrayAttributeRender'
import DateAttributeRender from './DateAttributeRender'
import DateRangeAttributeRender from './DateRangeAttributeRender'
import NumberAttributeRender from './NumberAttributeRender'
import RangeAttributeRender from './RangeAttributeRender'
import RawDataAttributeRender from './RawDataAttributeRender'
import StringArrayAttributeRender from './StringArrayAttributeRender'
import StringAttributeRender from './StringAttributeRender'
import ThumbnailAttributeRender from './ThumbnailAttributeRender'
import UrlAttributeRender from './UrlAttributeRender'

/**
 * Enum to associate attribute types to sRender renderer component.
 * @author Sébastien Binda
 */
const typeToRenderMap = {
  // Default render
  DEFAULT: StringAttributeRender,
  // Render by type
  BOOLEAN: BooleanAttributeRender,
  DATE_ISO8601: DateAttributeRender,
  DATE_INTERVAL: DateRangeAttributeRender,
  DATE_ARRAY: DateArrayAttributeRender,
  DOUBLE: NumberAttributeRender,
  DOUBLE_INTERVAL: RangeAttributeRender,
  DOWNLOAD_LINK: RawDataAttributeRender,
  INTEGER: NumberAttributeRender,
  INTEGER_INTERVAL: NumberAttributeRender,
  LONG: NumberAttributeRender,
  LONG_INTERVAL: NumberAttributeRender,
  STRING: StringAttributeRender,
  STRING_ARRAY: StringArrayAttributeRender,
  THUMBNAIL: ThumbnailAttributeRender,
  URL: UrlAttributeRender,
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
