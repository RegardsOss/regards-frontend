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

import { FACET_TYPES, FACET_TYPES_ENUM } from './FacetType'
import { isURNTag, TagTypes } from './Tags'
import Geometry from './geo/Geometry'
import { LEGACY_SEARCH_ENGINE } from './SearchConstants'
import StaticQueryParameter from './query/common/StaticQueryParameter'
import OpenSearchQuery from './query/opensearch/OpenSearchQuery'
import OpenSearchQueryParameter from './query/opensearch/OpenSearchQueryParameter'
import URLSearchQuery from './query/url/URLSearchQuery'
import URLSearchQueryParameter from './query/url/URLSearchQueryParameter'
import PluginTypeEnum from './PluginTypeEnum'

module.exports = {
  FACET_TYPES,
  FACET_TYPES_ENUM,
  Geometry,
  isURNTag,
  LEGACY_SEARCH_ENGINE,
  TagTypes,
  StaticQueryParameter,
  OpenSearchQuery,
  OpenSearchQueryParameter,
  URLSearchQuery,
  URLSearchQueryParameter,
  ...PluginTypeEnum,
}
