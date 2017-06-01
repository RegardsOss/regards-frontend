/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { collectionActions } from './clients/CollectionClient'
import { modelActions } from './clients/ModelClient'
import { modelAttributesActions } from './clients/ModelAttributesClient'

/**
 * Module hateoas depencies
 * @author Léo Mieulet
 */
const listDependencies = [
  collectionActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  collectionActions.getDependency(RequestVerbEnum.POST),
  modelActions.getDependency(RequestVerbEnum.GET_LIST),
  modelAttributesActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  listDependencies,
  addDependencies,
}
