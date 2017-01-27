import LayoutActions from './model/layout/LayoutActions'
import ModulesActions from './model/modules/ModulesActions'

export default [
  LayoutActions.getDependency('GET'),
  ModulesActions.getDependency('GET'),
]
