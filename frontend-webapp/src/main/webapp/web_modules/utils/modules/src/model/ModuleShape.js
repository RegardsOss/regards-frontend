/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 * @author Sébastien Binda
 */
export default PropTypes.shape({
  id: PropTypes.number,
    // Type available from AvailableModules.js
  type: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool,
  applicationId: PropTypes.string,
  container: PropTypes.string,
  conf: PropTypes.objectOf(PropTypes.any),
})
