/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import get from 'lodash/get'
import { I18nProvider } from '@regardsoss/i18n'
import { getReducerRegistry, configureReducers } from '@regardsoss/store'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import { ModuleStyleProvider } from '@regardsoss/theme'

// Cheat, you should not do this but decorate components
const RenderChildren = ({ children }) => children
RenderChildren.propTypes = {
  children: PropTypes.element,
}
const WithResourcesHOC = withResourceDisplayControl(RenderChildren)

/**
 * React Component to display a module.
 * To be compatible, each module must export the here under props from their main.js file :
 * - moduleContainer : Main React component to display the module
 * - adminContainer  : (optional) Main React component to display the configuration of the module
 * - styles          : (optional) The styles of the module based on the current theme
 * - reducers        : (optional) The combined reducers of the module
 * - messages        : (optional) The directory of the i18n messages files. Default src/i18n
 * - ModuleIcon       : Default module icon (used when displaying a dynamic module)
 * @author Sébastien Binda
 */
class LazyModuleComponent extends React.Component {
  /**
   * @type {{appName: *, moduleId: *}}
   */
  static propTypes = {
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    module: AccessShapes.ModuleWithoutContent.isRequired,
    admin: PropTypes.bool,
    // Form information for admin container. Admin container is a part of the upper redux-form Form.
    adminForm: PropTypes.shape({
      // While creating the module, every fields shall be created in the redux form using that namespace
      // which allows us to launch a module from another module
      currentNamespace: PropTypes.string,
      // Current module status
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      // Form changeField function.
      changeField: PropTypes.func,
      // Configuration from another admin module
      // eslint-disable-next-line react/forbid-prop-types
      conf: PropTypes.object,
      // This parameter contains the entire redux-form form
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
    onLoadAction: PropTypes.func,
  }

  state = {
    isLoaded: false,
    moduleMessages: null,
    moduleStyles: null,
    moduleDependencies: [],
  }

  /**
   * Before component is mount, Lazy load the module with require. The module will be displayed once the dependency is loaded.
   */
  componentDidMount() {
    this.loadModule(this.props.module)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.module.type !== this.props.module.type) {
      this.loadModule(nextProps.module)
    }
  }

  loadModule = (module) => {
    const self = this

    require.ensure([], (require) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        const loadedModule = require(`@regardsoss-modules/${module.type}/src/main.js`)
        if (this.props.admin && !loadedModule.adminContainer) {
          console.info(`Module ${module.type} does not contain an administration component`)
          self.setState({
            isLoaded: false,
            moduleDependencies: [],
            loadedModule: null,
          })
        } else if (!this.props.admin && !loadedModule.moduleContainer) {
          throw new Error(`Module ${module.type} does not contain a main component`)
        } else {
          if (loadedModule.reducer) {
            const loadedModuleReducerName = `modules.${module.type}`
            const loadedModuleReducer = {}
            loadedModuleReducer[loadedModuleReducerName] = configureReducers(loadedModule.reducer)
            getReducerRegistry().register(loadedModuleReducer)
          }
          self.ModuleContainer = (self.props.admin ? loadedModule.adminContainer : loadedModule.moduleContainer) || null
          self.setState({
            isLoaded: true,
            moduleMessages: get(loadedModule, 'messages'),
            moduleStyles: { styles: get(loadedModule, 'styles') },
            moduleDependencies: get(loadedModule, `dependencies.${self.props.admin ? 'admin' : 'user'}`, []),
          })
        }
        if (this.props.onLoadAction) {
          this.props.onLoadAction(loadedModule)
        }
      } catch (e) {
        console.error('Module', this.props.module.type, e, e.stack)
      }
    })
  }

  /**
   * Render module if loaded or a loading message if not.
   */
  render() {
    const { admin, module: { active } } = this.props
    const {
      isLoaded, moduleMessages,
      moduleStyles, moduleDependencies,
    } = this.state

    // If module is loaded then render. The module load is asynchrone due to require.ensure method.
    if (isLoaded && (active || admin)) { // Hide non loaded modules or disabled modules in user app
      const { ModuleContainer } = this
      return (
        <I18nProvider messages={moduleMessages}>
          <ModuleStyleProvider module={moduleStyles}>
            <WithResourcesHOC resourceDependencies={moduleDependencies}>
              <ModuleContainer
                appName={this.props.appName}
                project={this.props.project}
                adminForm={this.props.adminForm}
                moduleConf={this.props.module.conf}
                {...this.props.module}
              />
            </WithResourcesHOC>
          </ModuleStyleProvider>
        </I18nProvider>
      )
    }
    return null
  }
}

export default LazyModuleComponent
