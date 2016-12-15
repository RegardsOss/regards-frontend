/**
 * LICENSE_PLACEHOLDER
 */
import { merge } from 'lodash'
import ModuleThemeProvider from './ModuleThemeProvider'
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
    moduleConf: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      moduleId: props.moduleId,
      moduleConf: props.moduleConf,
      isLoaded: false,
      error: null,
    }
  }

  /**
   * Before component is mount, Lazy load the module with require. The module will be displayed once the dependecy is loaded.
   */
  componentWillMount() {
    const self = this

    require.ensure([], (require) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        const loadedModule = require(`@regardsoss/${this.props.moduleId}/src/main.js`)
        self.setState({
          isLoaded: true,
          module: loadedModule,
        })
      } catch (e) {
        console.error('Module', this.props.moduleId, e, e.stack)
      }
    })
  }

  /**
   * Render module if loaded or a loading message if not.
   * @returns {XML}
   */
  render() {
    const { isLoaded, module } = this.state
    if (isLoaded) {
      const moduleElt = React.createElement(module.ModuleContainer, merge({}, { appName: this.props.appName }, this.state.moduleConf))
      return (
        <ModuleThemeProvider module={module}>
          { moduleElt }
        </ModuleThemeProvider>
      )
    }
    return (
      <div>Module ${this.props.moduleId} is loading ... </div>
    )
  }

}

export default LazyModuleComponent
