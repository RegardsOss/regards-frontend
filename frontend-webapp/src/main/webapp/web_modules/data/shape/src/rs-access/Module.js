/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Definition of type DecoratorShape.
 * Decorator are used in LazyModuleComponent to add a decorator element to modules
 * @author Sébastien Binda
 */
const Module = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.bool,
    applicationId: PropTypes.string,
    container: PropTypes.string,
    conf: PropTypes.objectOf(PropTypes.any),
  }),
})

const ModuleList = PropTypes.objectOf(Module)


export default { ModuleList, Module }
