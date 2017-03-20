/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AttributeModelActions from './model/AttributeModelActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  AttributeModelActions.getDependency(RequestVerbEnum.PUT),
  AttributeModelActions.getDependency(RequestVerbEnum.POST),
  AttributeModelActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  AttributeModelActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  AttributeModelActions.getDependency(RequestVerbEnum.GET),
  AttributeModelActions.getDependency(RequestVerbEnum.PUT),
  AttributeModelActions.getDependency(RequestVerbEnum.POST),
  AttributeModelActions.getDependency(RequestVerbEnum.DELETE),
]
