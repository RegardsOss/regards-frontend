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
 */
class LazyModuleComponent extends React.Component {

  /**
   * @type {{appName: *, moduleId: *}}
   */
  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    module: ModuleShape.isRequired,
    decorator: DecoratorShape,
    admin: React.PropTypes.bool,
    onLoadAction: React.PropTypes.func,
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
    if (isLoaded) {
      const moduleMessageDir = module.messagesDir ? module.messagesDir : `modules/${this.props.module.id}/src/i18n`
      let moduleElt = null
      if (this.props.admin === true) {
        if (module.adminContainer) {
          moduleElt = React.createElement(module.adminContainer, merge({}, { appName: this.props.appName }, this.props.module.conf))
        }
      } else if (module.moduleContainer) {
        moduleElt = React.createElement(module.moduleContainer, merge({}, { appName: this.props.appName }, this.props.module.conf))
      }

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
