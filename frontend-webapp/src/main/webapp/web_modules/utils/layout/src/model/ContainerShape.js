/**
 * LICENSE_PLACEHOLDER
 **/
import { ModuleShape } from '@regardsoss/modules'

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 */
const ContainerShape = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object,
  modules: PropTypes.arrayOf(ModuleShape),
  containers: PropTypes.arrayOf(PropTypes.object),
  dynamicContent: PropTypes.bool,
  mainContainer: PropTypes.bool,
})

export default ContainerShape
