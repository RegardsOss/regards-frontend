/**
 * LICENSE_PLACEHOLDER
 **/

import { OBJECT_LINKED_FILE_ENUM, OBJECT_LINKED_FILE_TYPES } from './ObjectLinkedFileTypes'
import { isURNTag, TagTypes } from './Tags'
import Geometry from './geo/Geometry'
import StaticQueryParameter from './query/common/StaticQueryParameter'
import OpenSearchQuery from './query/opensearch/OpenSearchQuery'
import OpenSearchQueryParameter from './query/opensearch/OpenSearchQueryParameter'
import URLSearchQuery from './query/url/URLSearchQuery'
import URLSearchQueryParameter from './query/url/URLSearchQueryParameter'

export default {
  Geometry,
  isURNTag,
  TagTypes,
  OBJECT_LINKED_FILE_ENUM,
  OBJECT_LINKED_FILE_TYPES,
  StaticQueryParameter,
  OpenSearchQuery,
  OpenSearchQueryParameter,
  URLSearchQuery,
  URLSearchQueryParameter,
}
