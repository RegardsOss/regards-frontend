/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { datasetActions } from './clients/DatasetClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  datasetActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  datasetActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}
