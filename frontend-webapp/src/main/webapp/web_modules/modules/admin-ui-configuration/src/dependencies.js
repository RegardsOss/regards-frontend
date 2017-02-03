import LayoutActions from './model/layout/LayoutActions'
import ModulesActions from './model/modules/ModulesActions'

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
export default [
  LayoutActions.getDependency('GET'),
  ModulesActions.getDependency('GET'),
]
