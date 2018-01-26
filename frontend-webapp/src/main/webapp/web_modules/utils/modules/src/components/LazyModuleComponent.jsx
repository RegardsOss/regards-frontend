/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import merge from 'lodash/merge'
import get from 'lodash/get'
import { I18nProvider } from '@regardsoss/i18n'
import { getReducerRegistry, configureReducers } from '@regardsoss/store'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import { ModuleStyleProvider } from '@regardsoss/theme'

// Cheat, you should not do this but decorate components
const Div = ({ children }) => <div>{children}</div>
Div.propTypes = {
  children: PropTypes.element,
}
const WithResourceDisplayControl = withResourceDisplayControl(Div)

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
    project: PropTypes.string.isRequired,
    module: AccessShapes.Module.isRequired,
    admin: PropTypes.bool,
    // Form information for admin container. Admin container is a part of the upper redux-form Form.
    // This parameter contains the redux-form form and the changeField function.
    adminForm: PropTypes.shape({
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
    onLoadAction: PropTypes.func,
  }

  state = {
    isLoaded: false,
    module: null,
  }

  /**
   * Before component is mount, Lazy load the module with require. The module will be displayed once the dependecy is loaded.
   */
  componentDidMount() {
    this.loadModule(this.props.module)
  }

  componentWillReceiveProps(nextProps) {
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
            module: null,
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

          self.setState({
            isLoaded: true,
            module: loadedModule,
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

      // The module exposes its messages
      const moduleMessages = get(module, 'messages', {})

      const defaultModuleProps = {
        appName: this.props.appName,
        project: this.props.project,
      }

      // Display module with admin or normal container ?
      let moduleElt = null
      let moduleContainer = null
      let moduleDependencies = []
      let moduleProps = {}

      if (this.props.admin && module.adminContainer) {
        moduleContainer = module.adminContainer
        moduleDependencies = get(module, 'dependencies.admin', [])
        moduleProps = merge({}, defaultModuleProps, {
          moduleConf: this.props.module.conf,
          description: this.props.module.description,
        }, { adminForm: this.props.adminForm })
      } else if (!this.props.admin && module.moduleContainer) {
        // eslint-disable-next-line prefer-destructuring
        moduleContainer = module.moduleContainer
        moduleDependencies = get(module, 'dependencies.user', [])
        moduleProps = merge({}, defaultModuleProps, {
          moduleConf: this.props.module.conf,
          description: this.props.module.description,
          // handle common module initialization and configuration
          expandable: get(this, 'props.module.expandable', true),
          expanded: get(this, 'props.module.expanded', true),
        })
      }

      moduleElt = React.createElement(moduleContainer, moduleProps)
      return (
        <I18nProvider messages={moduleMessages}>
          <ModuleStyleProvider module={module}>
            <WithResourceDisplayControl
              resourceDependencies={moduleDependencies}
            >
              {moduleElt}
            </WithResourceDisplayControl>
          </ModuleStyleProvider>
        </I18nProvider>
      )
    }
    return null
  }
}

export default LazyModuleComponent
