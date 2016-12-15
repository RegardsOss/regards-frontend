/**
 * LICENSE_PLACEHOLDER
 */
import { ThemeHelper } from '@regardsoss/theme'
import LazyModuleComponent from './components/LazyModuleComponent'

/**
 * Static methods to manage layout containers and module configurations.
 */
class ModuleFactory {

  /**
   * Display a module pModuleId for the application appName. appName must be an entry in the layout configuration file.
   * @param pModuleId module to display
   * @param appName application layout name
   */
  static renderModule = (pModuleId, pModuleConf, appName) => (
    <LazyModuleComponent key={pModuleId} moduleId={pModuleId} appName={appName} moduleConf={pModuleConf} />
  )

  /**
   * Display a container for the application.
   * @param pContainer container to display
   * @param appName application name. Must be a entry in the layout configuration file
   * @returns {XML}
   */
  static renderContainer = (pContainer, appName) => {
    const containerClasses = ThemeHelper.getContainerClassNames(pContainer)
    const containerStyles = ThemeHelper.getContainerStyles(pContainer)

    let children = []
    if (pContainer.containers) {
      children = pContainer.containers.map(c => ModuleFactory.renderContainer(c, appName))
    }

    let modules = []
    if (pContainer.modules) {
      modules = pContainer.modules.map(m => ModuleFactory.renderModule(m.id, m.conf, appName))
    }

    return (
      <div id={pContainer.id} className={containerClasses} style={containerStyles} key={pContainer.id}>
        {modules}
        {children}
      </div>
    )
  }
}

export default ModuleFactory
