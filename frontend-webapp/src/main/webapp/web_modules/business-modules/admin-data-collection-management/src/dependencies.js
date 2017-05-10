/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { collectionActions } from './client/CollectionClient'
import { modelActions } from './client/ModelClient'
import { modelAttributesActions } from './client/ModelAttributesClient'

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
