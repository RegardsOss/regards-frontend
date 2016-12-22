/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 */
export default React.PropTypes.shape({
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  active: React.PropTypes.bool,
  conf: React.PropTypes.objectOf(React.PropTypes.any),
})
