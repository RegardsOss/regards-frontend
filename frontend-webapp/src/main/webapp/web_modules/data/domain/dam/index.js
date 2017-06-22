/**
 * LICENSE_PLACEHOLDER
 **/

import getAbstractEntityDescription from './getAbstractEntityDescription'
import getFullQualifiedAttributeName from './getFullQualifiedAttributeName'
import { ENTITY_TYPES, ENTITY_TYPES_ENUM } from './EntityTypes'
import MODEL_ATTR_TYPES from './ModelAttrTypes'
import FRAGMENT_NONE from './FragmentNone'
import AttributeModelController from './AttributeModelController'
import {
  ATTRIBUTE_MODEL_RESTRICTIONS_TYPES,
  ATTRIBUTE_MODEL_RESTRICTIONS_ENUM,
} from './AttributeModelResctrictionEnum'

export default {
  getAbstractEntityDescription,
  getFullQualifiedAttributeName,

  ENTITY_TYPES,
  ENTITY_TYPES_ENUM,

  ATTRIBUTE_MODEL_RESTRICTIONS_TYPES,
  ATTRIBUTE_MODEL_RESTRICTIONS_ENUM,

  MODEL_ATTR_TYPES,

  FRAGMENT_NONE,
  DEFAULT_FRAGMENT: FRAGMENT_NONE,

  AttributeModelController,
}
