/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AttributeModelActions from './models/attributes/AttributeModelActions'
import DatasetActions from './models/datasets/DatasetActions'
import DatasetModelActions from './models/datasets/DatasetModelActions'
import CriterionActions from './models/criterion/CriterionActions'
import DatasetSelectionType from './models/datasets/DatasetSelectionTypes'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  CriterionActions.getDependency(RequestVerbEnum.GET_LIST),
]
/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  CriterionActions.getDependency(RequestVerbEnum.GET_LIST),
  DatasetActions.getDependency(RequestVerbEnum.GET_LIST),
  DatasetModelActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
