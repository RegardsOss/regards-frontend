/**
 * LICENSE_PLACEHOLDER
 **/
import AttributeModelActions from './models/attributes/AttributeModelActions'
import DatasetActions from './models/datasets/DatasetActions'
import DatasetModelActions from './models/datasets/DatasetModelActions'
import CriterionActions from './models/criterion/CriterionActions'

/**
 * Dependencies needed to display user page of the module
 * @type {[*]}
 */
const user = [
  AttributeModelActions.getDependency('GET'),
  CriterionActions.getDependency('GET'),
]
/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  AttributeModelActions.getDependency('GET'),
  CriterionActions.getDependency('GET'),
  DatasetActions.getDependency('GET'),
  DatasetModelActions.getDependency('GET'),
]

export default {
  user,
  admin,
}
