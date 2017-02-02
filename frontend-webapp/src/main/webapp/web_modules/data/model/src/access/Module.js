/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 */
const Plugin = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    active: React.PropTypes.bool,
    applicationId: React.PropTypes.string,
    container: React.PropTypes.string,
    conf: React.PropTypes.objectOf(React.PropTypes.any),
  }),
})

export default Plugin
