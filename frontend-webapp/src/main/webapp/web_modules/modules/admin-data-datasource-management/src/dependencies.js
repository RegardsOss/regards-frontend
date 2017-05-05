/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { datasourceActions } from './client/DatasourceClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  datasourceActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  datasourceActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}
