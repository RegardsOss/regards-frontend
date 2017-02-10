/**
 * LICENSE_PLACEHOLDER
 **/
import { ModuleShape } from '@regardsoss/modules'

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 */
const ContainerShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  type: React.PropTypes.string,
  classes: React.PropTypes.arrayOf(React.PropTypes.string),
  styles: React.PropTypes.object,
  modules: React.PropTypes.arrayOf(ModuleShape),
  containers: React.PropTypes.arrayOf(React.PropTypes.object),
  dynamicContent: React.PropTypes.bool,
  mainContainer: React.PropTypes.bool,
})

export default ContainerShape
