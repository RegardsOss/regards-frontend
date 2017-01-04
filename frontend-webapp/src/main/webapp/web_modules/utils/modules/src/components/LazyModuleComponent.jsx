/**
 * LICENSE_PLACEHOLDER
 */
import { merge } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import ModuleThemeProvider from './ModuleThemeProvider'
import DecoratorShape from '../model/DecoratorShape'
import ModuleShape from '../model/ModuleShape'

/**
 * React Component to display a module.
 * To be compatible, each module must export the here under props from their main.js file :
 * - moduleContainer : Main React component to display the module
 * - adminContainer  : (optional) Main React component to display the configuration of the module
 * - styles          : (optional) The styles of the module based on the current theme
 * - reducers        : (optional) The combined reducers of the module
 * - messagesDir     : (optional) The directory of the i18n messages files. Default src/i18n
 */
class LazyModuleComponent extends React.Component {

  /**
   * @type {{appName: *, moduleId: *}}
   */
  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    project: React.PropTypes.string,
    module: ModuleShape.isRequired,
    decorator: DecoratorShape,
    admin: React.PropTypes.bool,
    onLoadAction: React.PropTypes.func,
    // Only used for administration modules. Used to add a value to the saving module configuration form
    // usage : this.props.change("conf.<property>",<value>)
    change: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
    }
  }

  /**
   * Before component is mount, Lazy load the module with require. The module will be displayed once the dependecy is loaded.
   */
  componentWillMount() {
    this.loadModule(this.props.module)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.module.name !== this.props.module.name) {
      this.loadModule(nextProps.module)
    }
  }

  componentDidUpdate() {
    if (this.props.onLoadAction) {
      this.props.onLoadAction()
    }
  }

  loadModule = (module) => {
    const self = this

    require.ensure([], (require) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        const loadedModule = require(`@regardsoss/${module.name}/src/main.js`)
        if (this.props.admin && !loadedModule.adminContainer) {
          console.error(`Module ${module.name} does not contain an administration component`)
          self.setState({
            isLoaded: false,
            module: null,
          })
        } else if (!this.props.admin && !loadedModule.moduleContainer) {
          console.error(`Module ${module.name} does not contain a main component`)
          self.setState({
            isLoaded: false,
            module: null,
          })
        } else {
          self.setState({
            isLoaded: true,
            module: loadedModule,
          })
        }
      } catch (e) {
        console.error('Module', this.props.module.id, e, e.stack)
      }
    })
  }

  /**
   * Render module if loaded or a loading message if not.
   * @returns {XML}
   */
  render() {
    const { isLoaded, module } = this.state

    // If module is loaded then render. The module load is asynchrone due to require.ensure method.
    if (isLoaded) {
      // By default the i18n directory for a module is fixed to : src/i18n.
      // Nevertheless, it possible for a module to override this property by setting messagesDir in his main.js exported props
      const moduleMessageDir = module.messagesDir ? module.messagesDir : `modules/${this.props.module.id}/src/i18n`

      let moduleElt = null
      const defaultModuleProps = {
        appName: this.props.appName,
        project: this.props.project,
        change: this.props.change,
      }

      // Display module with admin or normal container ?
      if (this.props.admin && module.adminContainer) {
        moduleElt = React.createElement(module.adminContainer, merge({}, defaultModuleProps, this.props.module.conf))
      } else if (!this.props.admin && module.moduleContainer) {
        moduleElt = React.createElement(module.moduleContainer, merge({}, defaultModuleProps, this.props.module.conf))
      }

      // Add a decorator arround the module rendering ?
      if (this.props.decorator) {
        const element = React.createElement(this.props.decorator.element, merge({}, this.props.decorator.conf, { children: moduleElt }))
        return (
          <I18nProvider messageDir={moduleMessageDir}>
            <ModuleThemeProvider module={module}>
              { element }
            </ModuleThemeProvider>
          </I18nProvider>
        )
      }
      return (
        <I18nProvider messageDir={moduleMessageDir}>
          <ModuleThemeProvider module={module}>
            { moduleElt }
          </ModuleThemeProvider>
        </I18nProvider>
      )
    }
    return null
  }

}

export default LazyModuleComponent
