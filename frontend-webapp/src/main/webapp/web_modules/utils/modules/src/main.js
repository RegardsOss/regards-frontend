/**
 * LICENSE_PLACEHOLDER
 */
import LazyModuleComponent from './components/LazyModuleComponent'
import ModuleThemeProvider from './components/ModuleThemeProvider'
import ModuleListProvider from './components/ModuleListProvider'
import ModuleListContainer from './containers/ModuleListContainer'
import ModuleShape from './model/ModuleShape'
import modulesManager from './ModulesManager'

/**
 * Main module file to expose public interface
 * @author Sébastien Binda
 */
export {
  LazyModuleComponent,
  ModuleListProvider,
  ModuleThemeProvider,
  ModuleShape,
  ModuleListContainer,
  modulesManager,
}
