/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 * @author Sébastien Binda
 */
export default React.PropTypes.shape({
  id: React.PropTypes.number,
    // Type available from AvailableModules.js
  type: React.PropTypes.string,
  description: React.PropTypes.string,
  active: React.PropTypes.bool,
  applicationId: React.PropTypes.string,
  container: React.PropTypes.string,
  conf: React.PropTypes.objectOf(React.PropTypes.any),
})
