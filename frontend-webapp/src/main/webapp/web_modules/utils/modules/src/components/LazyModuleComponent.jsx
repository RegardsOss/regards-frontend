/**
 * LICENSE_PLACEHOLDER
 */
import { merge } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import { getReducerRegistry, configureReducers } from '@regardsoss/store'
import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import ModuleShape from '../model/ModuleShape'
import ModuleThemeProvider from './ModuleThemeProvider'

/**
 * React Component to display a module.
 * To be compatible, each module must export the here under props from their main.js file :
 * - moduleContainer : Main React component to display the module
 * - adminContainer  : (optional) Main React component to display the configuration of the module
 * - styles          : (optional) The styles of the module based on the current theme
 * - reducers        : (optional) The combined reducers of the module
 * - messagesDir     : (optional) The directory of the i18n messages files. Default src/i18n
 * @author Sébastien Binda
 */
class LazyModuleComponent extends React.Component {

  /**
   * @type {{appName: *, moduleId: *}}
   */
  static propTypes = {
    appName: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    module: ModuleShape.isRequired,
    admin: PropTypes.bool,
    // Form information for admin container. Admin container is a part of the upper redux-form Form.
    // This parameter contains the redux-form form and the changeField function.
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
    onLoadAction: PropTypes.func,
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
    if (nextProps.module.type !== this.props.module.type) {
      this.loadModule(nextProps.module)
    }
  }

  componentDidUpdate() {
    if (this.props.onLoadAction && this.state.isLoaded) {
      this.props.onLoadAction()
    }
  }

  loadModule = (module) => {
    const self = this

    require.ensure([], (require) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        const loadedModule = require(`@regardsoss-modules/${module.type}/src/main.js`)
        if (this.props.admin && !loadedModule.adminContainer) {
          console.error(`Module ${module.type} does not contain an administration component`)
          self.setState({
            isLoaded: false,
            module: null,
          })
        } else if (!this.props.admin && !loadedModule.moduleContainer) {
          console.error(`Module ${module.type} does not contain a main component`)
          self.setState({
            isLoaded: false,
            module: null,
          })
        } else {
          if (loadedModule.reducer) {
            const loadedModuleReducerName = `modules.${module.type}`
            const loadedModuleReducer = {}
            loadedModuleReducer[loadedModuleReducerName] = configureReducers(loadedModule.reducer)
            getReducerRegistry().register(loadedModuleReducer)
          }

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
      // Does the module is active ?
      if (!this.props.module.active && !this.props.admin) {
        return null
      }

      // By default the i18n directory for a module is fixed to : src/i18n.
      // Nevertheless, it possible for a module to override this property by setting messagesDir in his main.js exported props
      const moduleMessageDir = module.messagesDir ? module.messagesDir : `modules/${this.props.module.type}/src/i18n`

      let moduleElt = null
      const defaultModuleProps = {
        appName: this.props.appName,
        project: this.props.project,
      }

      // Display module with admin or normal container ?
      let moduleDependencies = []
      if (this.props.admin && module.adminContainer) {
        moduleElt = React.createElement(module.adminContainer, merge({}, defaultModuleProps,
          {
            moduleConf: this.props.module.conf,
            description: this.props.module.description,
          }, { adminForm: this.props.adminForm }))
        moduleDependencies = (module && module.dependencies && module.dependencies.admin) || []
      } else if (!this.props.admin && module.moduleContainer) {
        moduleDependencies = (module && module.dependencies && module.dependencies.user) || []
        const moduleProps = merge({}, defaultModuleProps, {
          moduleConf: this.props.module.conf,
          description: this.props.module.description,
        })
        moduleElt = React.createElement(module.moduleContainer, moduleProps)
      }

      return (
        <I18nProvider messageDir={moduleMessageDir}>
          <ModuleThemeProvider module={module}>
            <HateoasDisplayDecorator
              requiredEndpoints={moduleDependencies}
            >
              {moduleElt}
            </HateoasDisplayDecorator>
          </ModuleThemeProvider>
        </I18nProvider>
      )
    }
    return null
  }

}

export default LazyModuleComponent
