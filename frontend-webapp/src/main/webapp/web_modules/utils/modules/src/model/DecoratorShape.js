/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 */
export default React.PropTypes.shape({
  element: React.PropTypes.func,
  conf: React.PropTypes.objectOf(React.PropTypes.any),
})
