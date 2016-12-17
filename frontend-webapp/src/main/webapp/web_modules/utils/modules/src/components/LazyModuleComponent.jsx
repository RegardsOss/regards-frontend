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
    onLoadAction: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      moduleId: props.module.id,
      moduleConf: props.module.conf,
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
        const loadedModule = require(`@regardsoss/${this.props.module.id}/src/main.js`)
        self.setState({
          isLoaded: true,
          module: loadedModule,
        })
      } catch (e) {
        console.error('Module', this.props.module.id, e, e.stack)
      }
    })
  }

  componentDidUpdate() {
    if (this.props.onLoadAction) {
      this.props.onLoadAction()
    }
  }

  /**
   * Render module if loaded or a loading message if not.
   * @returns {XML}
   */
  render() {
    const { isLoaded, module } = this.state
    if (isLoaded) {
      const moduleMessageDir = module.messagesDir ? module.messagesDir : `modules/${this.props.module.id}/src/i18n`
      const moduleElt = React.createElement(module.moduleContainer, merge({}, { appName: this.props.appName }, this.props.module.conf))
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
    return (
      <div>Module ${this.props.module.id} is loading ... </div>
    )
  }

}

export default LazyModuleComponent
