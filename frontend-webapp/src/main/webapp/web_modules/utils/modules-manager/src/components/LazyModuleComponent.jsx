/**
 * LICENSE_PLACEHOLDER
 */

/**
 * React Component to display a module.
 */
class LazyModuleComponent extends React.Component {

  /**
   * @type {{appName: *, moduleId: *}}
   */
  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    moduleId: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      moduleId: props.moduleId,
      isLoaded: false,
    }
  }

  /**
   * Before component is mount, Lazy load the module with require. The module will be displayed once the dependecy is loaded.
   */
  componentWillMount() {
    const self = this
    switch (this.props.moduleId) {
      case 'news':
        // eslint-disable-next-line import/no-dynamic-require
        require.ensure([], (require) => {
          const loadedModule = require('@regardsoss/news')
          self.setState({
            isLoaded: true,
            module: loadedModule.ModuleContainer,
          })
        })
        break
      case 'portal-projects':
        // eslint-disable-next-line import/no-dynamic-require
        require.ensure([], (require) => {
          const loadedModule = require('@regardsoss/portal-projects')
          self.setState({
            isLoaded: true,
            module: loadedModule.ModuleContainer,
          })
        })
        break
      case 'portal-menu':
        // eslint-disable-next-line import/no-dynamic-require
        require.ensure([], (require) => {
          const loadedModule = require('@regardsoss/portal-menu')
          self.setState({
            isLoaded: true,
            module: loadedModule.ModuleContainer,
          })
        })
        break
      default:
        console.log(`Error loading invalid module ${this.props.moduleId}`)
    }
  }

  /**
   * Render module if loaded or a loading message if not.
   * @returns {XML}
   */
  render() {
    const { isLoaded, module } = this.state
    if (isLoaded) {
      return React.createElement(module, { appName: this.props.appName })
    }
    return (
      <div>Module is loading ... </div>
    )
  }

}

export default LazyModuleComponent
